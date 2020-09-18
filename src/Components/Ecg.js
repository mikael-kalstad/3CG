import React from "react";
import { Canvas } from "react-three-fiber";
import CameraControls from "./CameraControls";
import Waves from "./Waves";
import json from "./data.json";
import { formatDataToPoints } from "../Scripts/DataConverter";

const Ecg = () => {
  let points = formatDataToPoints(json);

  return (
    <Canvas
      camera={{ position: [-50, 70, 500], fov: 75 }}
      style={{ background: "#324444" }}
    >
      <CameraControls />
      <ambientLight />
      <pointLight position={[-10, 10, -10]} castShadow />

      <Waves data={points} />
    </Canvas>
  );
};

export default Ecg;
