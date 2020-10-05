import React, { useRef, useEffect } from 'react';
import { useThree, useFrame, extend } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from '../utils/OrbitControls';

extend({ OrbitControls });
const MAX_DISTANCE = 700;
const MIN_DISTANCE = 10;
const CameraControls = (props) => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  // let vec = new THREE.Vector3();
  // let initialDistance = 0;
  // let lastZoom = props.zoom;
  // let zoomFactor = 0;
  // useEffect(() => {
  //   console.log(orbitRef);
  //   computeVec();
  //   initialDistance = vec.length();
  // }, []);

  // useEffect(() => {
  //   computeVec();
  //   console.log(initialDistance);
  //   vec.multiplyScalar((vec.length() * initialDistance) / props.zoom);
  //   orbitRef.current.object.position.add(vec);
  // }, [props.zoom]);
  useFrame(() => {
    //orbitRef.current.dIn(1.01);

    //vec.multiplyScalar(0.01);
    //orbitRef.current.object.position.add(vec);
    orbitRef.current.update();
  });

  // const computeVec = () => {
  //   vec.set(
  //     orbitRef.current.target.x - orbitRef.current.object.position.x,
  //     orbitRef.current.target.y - orbitRef.current.object.position.y,
  //     orbitRef.current.target.z - orbitRef.current.object.position.z
  //   );
  // };

  return (
    <orbitControls
      zoomSpeed={1}
      panSpeed={1.6}
      target={new THREE.Vector3(40, 0, 0)}
      rotateSpeed={1}
      args={[camera, gl.domElement]}
      ref={orbitRef}
      minDistance={MIN_DISTANCE}
      maxDistance={MAX_DISTANCE}
    />
  );
};

export default CameraControls;
