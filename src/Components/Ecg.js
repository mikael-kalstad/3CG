import React from 'react';
import { Canvas } from 'react-three-fiber';
import CameraControls from './CameraControls';
import Waves from './Waves';
import json from './data.json';

const formatDataToPoints = (data) => {
  let points = [];
  console.log(data);
  let samples = data['samples'];
  let samplesKeys = Object.keys(samples);

  for (let channel in samplesKeys) {
    let arr = samples[samplesKeys[channel]];
    let channelPoints = [];
    let nPoints = 500;
    for (let i in arr) {
      if (i > nPoints) break;

      channelPoints.push([i * 1 - nPoints / 2, arr[i], channel * 5]);
    }

    points.push(channelPoints);
  }

  return points;
};

const Ecg = () => {
  let points = formatDataToPoints(json);

  return (
    <Canvas camera={{ position: [-40, 10, -130], fov: 75 }}>
      <CameraControls />
      <ambientLight />
      <pointLight position={[-10, 10, -10]} castShadow />

      <Waves data={points} />
    </Canvas>
  );
};

export default Ecg;
