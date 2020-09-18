import React from "react";
import { Canvas } from "react-three-fiber";
import CameraControls from "./CameraControls";
import Ecg from "./Ecg";

const Scene = (props) => {
  return (
    <Canvas
      camera={{ position: [-40, 10, 10], fov: 55 }}
      style={{ background: "#324444" }}
    >
      <CameraControls />
      <ambientLight />
      <pointLight position={[-10, 10, -10]} castShadow />
      <Ecg play={props.play} />
    </Canvas>
  );
};

export default Scene;
