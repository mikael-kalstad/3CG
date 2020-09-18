import React from 'react';
import { Canvas } from 'react-three-fiber';
import CameraControls from './CameraControls';
import { formatDataToPoints } from '../Scripts/DataConverter';
import Label from './Label';
import { dataService } from '../Services/DataService';
import Wave from './Wave';

const Ecg = () => {
  let points = formatDataToPoints(dataService.getJSON());
  let channelNames = dataService.getChannelNamesArray();
  console.log(points[3][parseInt(points[3].length / 2)]);
  return (
    <>
      {points.map((channel, i) => (
        <>
          <Label position={channel[parseInt(channel.length / 2)]}>
            {channelNames[i]}
          </Label>
          <Wave data={channel} key={channel} />
        </>
      ))}
    </>
  );
};

export default Ecg;
