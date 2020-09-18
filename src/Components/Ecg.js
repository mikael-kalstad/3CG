import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { formatDataToPoints } from '../Scripts/DataConverter';
import { dataService } from '../Services/DataService';
import Wave from './Wave';
import Label from './Label';

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
  console.log(points[3][parseInt(points[3].length / 2)]);

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
    <mesh ref={mesh}>
      {renderPoints.map((channel, i) => (
        <>
          <Label position={channel[parseInt(channel.length / 2)]}>
            {channelNames[i]}
          </Label>
          <Wave data={channel} key={channel} />
        </>
      ))}
    </mesh>
  );
};

export default Ecg;
