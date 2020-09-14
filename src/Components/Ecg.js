import React from "react";
import { Canvas } from "react-three-fiber";
import Box from "./Box";
import CameraControls from "./CameraControls";
import Text from "./Text";
import Line from "./Line";

const Ecg = () => (
  <Canvas camera={{ position: [-10, 10, 10], fov: 35 }}>
    <CameraControls />
    <ambientLight />
    <pointLight position={[-10, 10, -10]} castShadow />

    {[-3, 0, 3].map((x) =>
      [-3, 0, 3].map((z) => <Box key={(x, 0, z)} position={[x, 0, z]} />)
    )}

    <Text>Use mouse to control camera</Text>

    <Line></Line>
  </Canvas>
);

export default Ecg;
