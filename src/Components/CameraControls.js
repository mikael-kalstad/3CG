import React, { useRef, useEffect } from 'react';
import { useThree, useFrame, extend } from 'react-three-fiber';
import { Vector3 } from 'three';
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
      target={new Vector3(40, 0, 0)}
      rotateSpeed={1}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

export default CameraControls;
