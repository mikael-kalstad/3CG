import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import CameraControls from './CameraControls';
import Ecg from './Ecg';
import { useModeStore } from '../Store';
import Grid from './Grid';
import Vcg2 from './Vcg2';
import CircularVisualization from './CircularVisualization';
import OrtoCam from './OrtoCam';
import Text from './Text';

const Scene = () => {
  console.log('%c [Ecg] is rendering', 'background: #111; color: #ebd31c');
  const canvas = useRef();
  const ortoMode = useModeStore((state) => state.ortoMode);
  return (
    <Canvas camera={{ fov: 55 }} style={{ background: '#324444' }}>
      <CameraControls />
      <ambientLight />
      <Ecg />
      <Vcg2 />
      <CircularVisualization />
      <axesHelper position={[-30, 40, 0]} scale={[40, 40, 40]} />
      <Suspense fallback={null}>
        <Text position={[40 - 30, 40, 0]} rotateToCamera={true} textSize={2.4}>
          X
        </Text>
        <Text position={[-30, 80, 0]} rotateToCamera={true} textSize={2.4}>
          Y
        </Text>
        <Text position={[-30, 40, 40]} rotateToCamera={true} textSize={2.4}>
          Z
        </Text>
      </Suspense>
      <Grid />
      <OrtoCam />
    </Canvas>
  );
};

export default Scene;
