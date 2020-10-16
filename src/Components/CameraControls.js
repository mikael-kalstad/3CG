import React, { useRef, useEffect, useState } from 'react';
import { useThree, useFrame, extend, useUpdate } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from '../utils/OrbitControls';
import { useZoomStore, useModeStore } from '../Store';
import { useSpring, useSprings } from 'react-spring';

extend({ OrbitControls });
const MAX_DISTANCE = 500;
const MIN_DISTANCE = 10;

const CameraControls = (props) => {
  const [initialDistance, setInitialDistance] = useState(0);
  const markMode = useModeStore((state) => state.markMode);
  const inspectMode = useModeStore((state) => state.inspectMode);
  const ortoMode = useModeStore((state) => state.ortoMode);
  const zoom = useZoomStore((state) => state.zoom);
  const setZoom = useZoomStore((state) => state.setZoom);
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  let vec = new THREE.Vector3();
  let lastZoom = 1;

  let camPos = new THREE.Vector3();
  const orto = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    1,
    1000
  );
  useEffect(() => {
    computeVec();
    setInitialDistance(vec.length());
    camera.position.set(100, 80, 150);
  }, []);

  useFrame(() => {
    computeVec();
    if (lastZoom != zoom) {
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

    //console.log(orbitRef.current.target);

    orbitRef.current.update();
  });

  const computeVec = () => {
    vec.set(
      orbitRef.current.target.x - orbitRef.current.object.position.x,
      orbitRef.current.target.y - orbitRef.current.object.position.y,
      orbitRef.current.target.z - orbitRef.current.object.position.z
    );
  };

  useSpring({
    spring: !inspectMode,
    from: { y: camera.position.y },
    to: { y: 100 },
    onFrame: ({ y }) => {
      camera.position.y = y;
      console.log(inspectMode);
    },
  });
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
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 2}
      maxAzimuthAngle={Math.PI / 2}
      enabled={!markMode}
    />
  );
};

export default CameraControls;
