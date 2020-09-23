import React, { useRef } from 'react';
import { useThree, useFrame, extend } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

const CameraControls = (props) => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      zoomSpeed={1}
      panSpeed={1.6}
      rotateSpeed={1}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

export default CameraControls;
