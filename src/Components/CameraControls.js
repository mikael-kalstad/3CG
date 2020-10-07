import React, { useRef, useEffect } from 'react';
import { useThree, useFrame, extend, useUpdate } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from '../utils/OrbitControls';
import { useZoomStore } from '../Store';

extend({ OrbitControls });
const MAX_DISTANCE = 700;
const MIN_DISTANCE = 10;
const CameraControls = (props) => {
  const zoomRef = useRef(useZoomStore.getState().zoom);
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  let vec = new THREE.Vector3();
  let initialDistance = 0;
  let lastZoom = 1;
  let camPos = new THREE.Vector3();
  console.log(zoomRef.current);
  useEffect(() => {
    computeVec();
    initialDistance = vec.length();

    useZoomStore.subscribe(
      (zoom) => (zoomRef.current = zoom),
      (state) => state.zoom
    );
  }, []);

  useFrame(() => {
    computeVec();
    // Math.abs(initialDistance - vec.length()) > 0.001
    if (lastZoom != zoomRef.current) {
      vec.multiplyScalar(
        (0.1 * (initialDistance * zoomRef.current)) / vec.length()
      );
      if (zoomRef.current < lastZoom) {
        vec.multiplyScalar(-1);
      }
      camPos.add(vec);
      orbitRef.current.object.position.set(camPos.x, camPos.y, camPos.z);
      lastZoom = zoomRef.current;
    }
    camPos = orbitRef.current.object.position.clone();
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
