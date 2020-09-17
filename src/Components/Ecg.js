import React from 'react';
import { Canvas } from 'react-three-fiber';
import CameraControls from './CameraControls';
import Label from './Label';
import Wave from './Wave';
import { dataService } from '../Services/DataService';

const formatDataToPoints = (data) => {
  let points = [];

  let samples = data['samples'];
  let samplesKeys = Object.keys(samples);

  for (let channel in samplesKeys) {
    let arr = samples[samplesKeys[channel]];
    let channelPoints = [];
    let nPoints = 3000;
    let scale = 0.4;
    nPoints = nPoints > arr.length ? arr.length : nPoints;
    for (let i in arr) {
      if (i > nPoints) break;

      channelPoints.push([
        i * scale - (scale * nPoints) / 2,
        arr[i],
        channel * 10,
      ]);
    }

    points.push(channelPoints);
  }
  console.log(points);
  return points;
};

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
