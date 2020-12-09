import React, { useEffect, useRef, useState, useCallback } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { useCameraStore, useModeStore } from '../../../Store';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });
const MAX_DISTANCE = 1000;
const MIN_DISTANCE = 50;

const CameraControls = () => {
  const [initialDistance, setInitialDistance] = useState(0);
  const markMode = useModeStore((state) => state.markMode);
  const ortoMode = useModeStore((state) => state.ortoMode);
  const fov = useCameraStore((state) => state.fov);
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
  let maxPan = new THREE.Vector3(100000, 1000, 1000);

  const computeVec = useCallback(() => {
    vec.set(
      orbitRef.current.target.x - orbitRef.current.object.position.x,
      orbitRef.current.target.y - orbitRef.current.object.position.y,
      orbitRef.current.target.z - orbitRef.current.object.position.z
    );
  }, [vec]);

  // Initial values and computation of vector between camera and target
  const onMount = () => {
    computeVec();
    setInitialDistance(vec.length());
    camera.position.set(100, 80, 150);
  };

  useEffect(onMount, []);

  useFrame(() => {
    computeVec();

    // Set fov
    if (orbitRef.current) {
      orbitRef.current.object.fov = fov;
      orbitRef.current.object.updateProjectionMatrix();
    }

    if (lastZoomValue !== zoomValue) {
      if (!ortoMode) {
        camPos.set(
          orbitRef.current.target.x,
          orbitRef.current.target.y,
          orbitRef.current.target.z
        );
        // Calculate position of camera based on new zoom
        vec.normalize();
        vec.negate();
        vec.multiplyScalar(persZoomToDistance(zoomValue));
        camPos.add(vec);
        // Update position of camera
        orbitRef.current.object.position.set(camPos.x, camPos.y, camPos.z);
      }
      if (ortoMode) {
        // Calculate zoom for orthocamera
        orbitRef.current.object.zoom = orthoZoomToDistance(zoomValue);
        orbitRef.current.object.updateProjectionMatrix();
      }
      lastZoomValue = zoomValue;
    }
    // If zoom by scrollbar is big enough, update state
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
      }
    }
    // Restrict camera movement
    orbitRef.current.target.clamp(minPan, maxPan);
    orbitRef.current.update();
  });

  // Convert zoom value to distance between camera and target
  const persZoomToDistance = (zoom) => {
    return (
      MIN_DISTANCE *
      Math.exp((Math.log(MAX_DISTANCE / MIN_DISTANCE) / 80) * zoom)
    );
  };

  // Convert distance between camera and target to zoom value
  const persDistanceToZoom = (initial, current) => {
    return (
      (80 * Math.log((2 / initial) * current)) /
      Math.log(MAX_DISTANCE / MIN_DISTANCE)
    );
  };

  // Convert to zoom value used in orthographic camera
  const orthoZoomToDistance = (zoom) => {
    return 30 * Math.exp((Math.log(100 / 10) / 80) * -zoom);
  };

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
      enableRotate={!markMode}
    />
  );
};

export default CameraControls;
