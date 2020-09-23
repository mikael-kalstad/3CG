import React, { Suspense } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { Vector3 } from 'three';
import CameraControls from './CameraControls';
import Ecg from './Ecg';

const Scene = (props) => {
  const { gl, scene, camera } = useThree();
  return (
    <Canvas
      camera={{ position: [-40, 10, 10], fov: 55 }}
      style={{ background: '#324444' }}
    >
      <CameraControls />
      <ambientLight />
      <pointLight position={[-10, 10, -10]} castShadow />
      <Ecg play={props.play} />
      <gridHelper></gridHelper>
      <axesHelper scale={[10, 10, 10]}></axesHelper>
    </Canvas>
  );
};

export default Scene;
