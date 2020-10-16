import React, { useRef, useEffect, useState } from "react";
import { useThree, useFrame, extend, useUpdate } from "react-three-fiber";
import * as THREE from "three";
import { OrbitControls } from "../utils/OrbitControls";
import { useZoomStore, useModeStore } from "../Store";
import { useSpring, useSprings } from "react-spring-three";

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
    // console.log("inspect mode", inspectMode);

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
  console.log(orbitRef);
  useSpring({
    from: inspectMode && { y: camera.position.y },
    to: inspectMode ? { y: 100 } : { y: 0 },
    onFrame: ({ y }) => {
      orbitRef.current.target.y = y;
      console.log(inspectMode);
      console.log(orbitRef.current.target.y);
    },
    // Turn off camera controls while animation is running
    onStart: () => {
      if (orbitRef.current) orbitRef.current.enabled = false;
    },
    // Turn on camera controls after animation is finished
    onRest: () => {
      if (orbitRef.current) orbitRef.current.enabled = true;
    },
    config: { mass: 10, tension: 1500, friction: 300, precision: 0.00001 },
  });

  // useSpring({
  //   spring: !inspectMode,
  //   to: { y: camera.position.y },
  //   from: { y: 0 },
  //   onFrame: ({ y }) => {
  //     orbitRef.current.target.y = y;
  //     console.log(inspectMode);
  //     console.log(orbitRef.current.target.y);
  //   },
  //   config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  // });

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
