import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { useCameraStore } from '../../Store';
import CameraControls from './Camera/CameraControls';
import OrtoCam from './Camera/OrtoCam';
import Text from './Text';
import { useColorOptionsStore } from '../../Store';

const Scene = (props) => {
  const backgroundColor = useColorOptionsStore((state) => state.background);

  return (
    <Canvas style={{ background: backgroundColor }}>
      <CameraControls />
      <ambientLight />

      {props.children}

      <OrtoCam />
    </Canvas>
  );
};

export default Scene;
