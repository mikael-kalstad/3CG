import React, { useEffect, useRef, useState, useCallback } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { useCameraStore, useModeStore } from '../Store';
import { OrbitControls } from '../utils/OrbitControls';

extend({ OrbitControls });
const MAX_DISTANCE = 1000;
const MIN_DISTANCE = 50;

const CameraControls = () => {
  const [initialDistance, setInitialDistance] = useState(0);
  const markMode = useModeStore((state) => state.markMode);
  const ortoMode = useModeStore((state) => state.ortoMode);
  const [zoomValue, setZoomValue] = useCameraStore((state) => [
    state.zoomValue,
    state.setZoomValue,
  ]);
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  const [camTarget] = useState(new THREE.Vector3(100, 0, 0));

  // Variables for zooming
  let vec = new THREE.Vector3();
  let lastZoomValue = 1;
  let camPos = new THREE.Vector3();

  // Variables for limiting camera rotation and movement
  let minPan = new THREE.Vector3(-1000, -1000, -55);
  let maxPan = new THREE.Vector3(10000, 1000, 1000);

  const computeVec = useCallback(() => {
    vec.set(
      orbitRef.current.target.x - orbitRef.current.object.position.x,
      orbitRef.current.target.y - orbitRef.current.object.position.y,
      orbitRef.current.target.z - orbitRef.current.object.position.z
    );
  }, [vec]);

  const onMount = () => {
    computeVec();
    setInitialDistance(vec.length());
    camera.position.set(100, 80, 150);
  };

  useEffect(onMount, []);

  // useEffect(() => {
  //   console.log(initialDistance);
  // }, []);

  /* Incase bug appears again */
  // useEffect(() => {
  //   /* Updating camera target before rerender */
  //   setCamTarget(orbitRef.current.target.clone());
  // }, [markMode]);

  useFrame(() => {
    computeVec();
    if (lastZoomValue !== zoomValue) {
      if (!ortoMode) {
        camPos.set(
          orbitRef.current.target.x,
          orbitRef.current.target.y,
          orbitRef.current.target.z
        );
        vec.normalize();
        vec.negate();
        vec.multiplyScalar(persZoomToDistance(zoomValue));
        camPos.add(vec);

        orbitRef.current.object.position.set(camPos.x, camPos.y, camPos.z);
      }
      if (ortoMode) {
        orbitRef.current.object.zoom = orthoZoomToDistance(zoomValue);
        orbitRef.current.object.updateProjectionMatrix();
      }
      lastZoomValue = zoomValue;
    }
    if (
      Math.abs(
        orbitRef.current.target
          .clone()
          .sub(orbitRef.current.object.position.clone())
          .length() - orbitRef.current.target.clone().sub(camPos).length()
      ) > 30
    ) {
      if (!ortoMode) {
        camPos.set(
          orbitRef.current.object.position.x,
          orbitRef.current.object.position.y,
          orbitRef.current.object.position.z
        );
        computeVec();
        lastZoomValue = persDistanceToZoom(initialDistance, vec.length());
        setZoomValue(lastZoomValue);
      } else if (ortoMode) {
        // console.log(orbitRef);
        // lastZoomValue = orthoDistanceToZoom(initialDistance, vec.length());
        // console.log(lastZoomValue);
        // setZoomValue(lastZoomValue);
      }
    }
    orbitRef.current.target.clamp(minPan, maxPan);
    orbitRef.current.update();
  });

  const persZoomToDistance = (zoom) => {
    return (
      MIN_DISTANCE *
      Math.exp((Math.log(MAX_DISTANCE / MIN_DISTANCE) / 80) * zoom)
    );
  };

  const persDistanceToZoom = (initial, current) => {
    return (
      (80 * Math.log((2 / initial) * current)) /
      Math.log(MAX_DISTANCE / MIN_DISTANCE)
    );
  };

  const orthoZoomToDistance = (zoom) => {
    return 30 * Math.exp((Math.log(100 / 10) / 80) * -zoom);
  };

  // const orthoDistanceToZoom = (initial, current) => {
  //   return (-80 * Math.log(2 * initial) * current) / Math.log(100 / 10);
  // };

  // useSpring({
  //   from: inspectMode && inspected != -1 && { y: camera.position.y },
  //   to: inspectMode && inspected != 0 ? { y: 100 } : { y: 80 },
  //   onFrame: ({ y }) => {
  //     camera.position.y = y;
  //   },
  //   // Turn off camera controls while animation is running
  //   onStart: () => {
  //     if (orbitRef.current) orbitRef.current.enabled = false;
  //   },
  //   // Turn on camera controls after animation is finished
  //   onRest: () => {
  //     if (orbitRef.current) orbitRef.current.enabled = true;
  //   },
  //   config: { mass: 10, tension: 1500, friction: 300, precision: 0.00001 },
  // });

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
      zoomValueSpeed={1}
      panSpeed={1.6}
      target={camTarget}
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
      enableDamping={true}
      dampingFactor={0.2}
    />
  );
};

export default CameraControls;
