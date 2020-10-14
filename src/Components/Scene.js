import React, { useRef, useEffect } from "react";
import { Canvas, useThree } from "react-three-fiber";
import CameraControls from "./CameraControls";
import Ecg from "./Ecg";
import { useModeStore } from "../Store";
import Grid from "./Grid";

const Scene = () => {
  console.log("%c [Ecg] is rendering", "background: #111; color: #ebd31c");

  return (
    <Canvas
      camera={{ position: [100, 80, 150], fov: 55 }}
      style={{ background: "#324444" }}
    >
      <CameraControls />
      <ambientLight />
      <pointLight position={[-10, 10, -10]} castShadow />
      <Ecg />
      <axesHelper position={[0, 40, 0]} scale={[40, 40, 40]} />
      {/* <Grid /> */}
    </Canvas>
  );
};

export default Scene;
