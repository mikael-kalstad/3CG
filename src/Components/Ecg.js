import React from "react";
import { Canvas } from "react-three-fiber";
import CameraControls from "./CameraControls";
import Waves from "./Waves";
import json from "./data.json";

const formatDataToPoints = (data) => {
  let points = [];
  console.log(data);
  let samples = data["samples"];
  let samplesKeys = Object.keys(samples);

  for (let channel in samplesKeys) {
    let arr = samples[samplesKeys[channel]];
    let channelPoints = [];

    for (let i in arr) {
      if (i > 100) break;

      channelPoints.push([i * 5, arr[i], channel * 2]);
    }

    points.push(channelPoints);
  }

  return points;
};

const Ecg = () => {
  let points = formatDataToPoints(json);

  return (
    <Canvas camera={{ position: [-40, 10, 10], fov: 35 }}>
      <CameraControls />
      <ambientLight />
      <pointLight position={[-10, 10, -10]} castShadow />

      <Waves data={points} />
    </Canvas>
  );
};

export default Ecg;
