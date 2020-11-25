import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { useCameraStore } from '../Store';
import CameraControls from './CameraControls';
import OrtoCam from './OrtoCam';
import Text from './Text';
import { useColorOptionsStore } from '../Store';

const Scene = (props) => {
  console.log('%c [Scene] is rendering', 'background: #111; color: #ebd31c');

  const backgroundColor = useColorOptionsStore((state) => state.background);
  console.log(<Canvas></Canvas>);

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
