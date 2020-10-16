import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import CameraControls from './CameraControls';
import Ecg from './Ecg';
import { useModeStore } from '../Store';
import Grid from './Grid';
import Vcg2 from './Vcg2';

const Scene = () => {
  console.log('%c [Ecg] is rendering', 'background: #111; color: #ebd31c');
  const ortoMode = useModeStore((state) => state.ortoMode);
  return (
    <Canvas
      camera={{ fov: 55 }}
      style={{ background: '#324444' }}
      // orthographic={ortoMode}
    >
      <CameraControls />
      <ambientLight />
      <Ecg />
      <Vcg2 />
      <axesHelper position={[0, 40, 0]} scale={[40, 40, 40]} />
      {/* <Grid /> */}
    </Canvas>
  );
};

export default Scene;
