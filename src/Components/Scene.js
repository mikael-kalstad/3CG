import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';
import CameraControls from './CameraControls';
import Ecg from './Ecg';

const Scene = (props) => {
  return (
    <Canvas
      camera={{ position: [40, 80, -40], fov: 55 }}
      style={{ background: '#324444' }}
    >
      {!props.markMode && <CameraControls />}
      <ambientLight />
      <pointLight position={[-10, 10, -10]} castShadow />
      <Ecg
        play={props.play}
        renderPoints={props.renderPoints}
        channelNames={props.channelNames}
        channelState={props.channelState}
        markMode={props.markMode}
      />
      <axesHelper position={[0, 40, 0]} scale={[40, 40, 40]}></axesHelper>
    </Canvas>
  );
};

export default Scene;
