import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { useCameraStore } from '../Store';
import CameraControls from './CameraControls';
import OrtoCam from './OrtoCam';
import Text from './Text';
import { useColorOptionsStore } from '../Store';

const Scene = (props) => {
  console.log('%c [Scene] is rendering', 'background: #111; color: #ebd31c');

  const fov = useCameraStore((state) => state.fov);
  const backgroundColor = useColorOptionsStore((state) => state.background);

  return (
    <Canvas camera={{ fov: fov }} style={{ background: backgroundColor }}>
      <CameraControls />
      <ambientLight />

      {props.children}

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

      <OrtoCam />
    </Canvas>
  );
};

export default Scene;
