import React, { useEffect, useRef, useState, useCallback } from "react";
import { extend, useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import { useCameraStore, useModeStore } from "../Store";
import { OrbitControls } from "../utils/OrbitControls";

extend({ OrbitControls });
const MAX_DISTANCE = 500;
const MIN_DISTANCE = 10;

const CameraControls = () => {
  const [initialDistance, setInitialDistance] = useState(0);
  const markMode = useModeStore((state) => state.markMode);
  const ortoMode = useModeStore((state) => state.ortoMode);
  const zoomValue = useCameraStore((state) => state.zoomValue);
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  const [camTarget] = useState(new THREE.Vector3(100, 0, 0));

  // Variables for zoomValueing
  let vec = new THREE.Vector3();
  let lastzoomValue = 1;
  let camPos = new THREE.Vector3();

  // Variables for limiting camera rotation and movement
  let minPan = new THREE.Vector3(-1000, -1000, -55);
  let maxPan = new THREE.Vector3(1000, 1000, 1000);

  const computeVec = useCallback(() => {
    vec.set(
      orbitRef.current.target.x - orbitRef.current.object.position.x,
      orbitRef.current.target.y - orbitRef.current.object.position.y,
      orbitRef.current.target.z - orbitRef.current.object.position.z
    );
  }, [vec]);

  useEffect(() => {
    computeVec();
    setInitialDistance(vec.length());
    camera.position.set(100, 80, 150);
  }, [camera.position, computeVec, vec]);

  /* Incase bug appears again */
  // useEffect(() => {
  //   /* Updating camera target before rerender */
  //   setCamTarget(orbitRef.current.target.clone());
  // }, [markMode]);

  useFrame(() => {
    computeVec();
    if (lastzoomValue !== zoomValue) {
      if (!ortoMode) {
        camPos.set(
          orbitRef.current.target.x,
          orbitRef.current.target.y,
          orbitRef.current.target.z
        );
        vec.normalize();
        vec.multiplyScalar(initialDistance);
        vec.negate();
        vec.multiplyScalar(1 / zoomValue);
        camPos.add(vec);

        orbitRef.current.object.position.set(camPos.x, camPos.y, camPos.z);
      }
      if (ortoMode) {
        orbitRef.current.object.zoomValue = zoomValue;
        orbitRef.current.object.updateProjectionMatrix();
      }
      lastzoomValue = zoomValue;
    }

    orbitRef.current.target.clamp(minPan, maxPan);
    orbitRef.current.update();
  });

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
