import React, { useRef, useEffect, useState } from 'react';
import { useThree, useFrame, extend, useUpdate } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from '../utils/OrbitControls';
import { useZoomStore } from '../Store';

extend({ OrbitControls });
const MAX_DISTANCE = 700;
const MIN_DISTANCE = 10;
const CameraControls = (props) => {
  const [initialDistance, setInitialDistance] = useState(0);
  const zoom = useZoomStore((state) => state.zoom);
  const setZoom = useZoomStore((state) => state.setZoom);
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  let vec = new THREE.Vector3();
  let lastZoom = 1;

  let camPos = new THREE.Vector3();
  useEffect(() => {
    computeVec();
    setInitialDistance(vec.length());
  }, []);

  useFrame(() => {
    computeVec();
    camPos.set(
      orbitRef.current.target.x,
      orbitRef.current.target.y,
      orbitRef.current.target.z
    );
    vec.normalize();
    vec.multiplyScalar(initialDistance);
    vec.negate();
    vec.multiplyScalar(1 / zoom);
    camPos.add(vec);
    if (lastZoom != zoom) {
      orbitRef.current.object.position.set(camPos.x, camPos.y, camPos.z);
      lastZoom = zoom;
    }
    // if (
    //   Math.abs(orbitRef.current.object.position.length() - camPos.length()) >
    //   0.1
    // ) {
    //   computeVec();
    //   setNewZoom(
    //     Math.pow(
    //       Math.abs(orbitRef.current.object.position.length()) / vec.length(),
    //       -1
    //     )
    //   );
    // }

    orbitRef.current.update();
  });

  const computeVec = () => {
    vec.set(
      orbitRef.current.target.x - orbitRef.current.object.position.x,
      orbitRef.current.target.y - orbitRef.current.object.position.y,
      orbitRef.current.target.z - orbitRef.current.object.position.z
    );
  };

  return (
    <orbitControls
      zoomSpeed={1}
      panSpeed={1.6}
      target={new THREE.Vector3(100, 0, 0)}
      rotateSpeed={1}
      args={[camera, gl.domElement]}
      ref={orbitRef}
      minDistance={MIN_DISTANCE}
      maxDistance={MAX_DISTANCE}
    />
  );
};

export default CameraControls;
