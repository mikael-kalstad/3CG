import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useFrame } from 'react-three-fiber';
import { formatDataToPoints } from '../Scripts/DataConverter';
import { dataService } from '../Services/DataService';
import { noteService } from '../Services/NoteService';
import Wave from './Wave';

import Note from './Note';

const MAX_POINTS_TO_RENDER = 1000;

const getPoints = (points, time) => {
  let arr = [];

  points.forEach((channel) => {
    arr.push(channel.slice(time, MAX_POINTS_TO_RENDER + time));
  });

  return arr;
};

const Ecg = (props) => {
  const [renderPoints, setRenderPoints] = useState([]);

  let points = formatDataToPoints(dataService.getJSON());
  let channelNames = dataService.getChannelNamesArray();

  const mesh = useRef();

  useFrame(() => {
    if (props.play) mesh.current.position.x -= 0.1;
  });

  useEffect(() => {
    let time = 0;
    const interval = setInterval(() => {
      time++;
      setRenderPoints(getPoints(points, time));
      // console.log(getPoints(points, time));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Suspense fallback={null}>
      <mesh ref={mesh}>
        {renderPoints.map((channel, i) => (
          <>
            <Note pos={channel[0].map((val, i) => (i != 2 ? val - 2 : val))}>
              {channelNames[i]}
            </Note>
            <Wave data={channel} key={channel} />
          </>
        ))}
      </mesh>
    </Suspense>
  );
};

export default Ecg;
