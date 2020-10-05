import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { useUpdate, useFrame } from "react-three-fiber";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { getColorData } from "../Scripts/Color";
import { useModeStore, useTimeStore } from "../Store";

const Wave = (props) => {
  const [hover, setHover] = useState(0);
  const [clicked, setClicked] = useState(0);

  const groupRef = useRef();
  const meshRef = useRef();

  // Get mode states from global store
  const playMode = useModeStore((state) => state.playMode);
  const markMode = useModeStore((state) => state.markMode);

  // Fetch initial time state
  const startTimeRef = useRef(useTimeStore.getState().startTime);
  const endTimeRef = useRef(useTimeStore.getState().endTime);

  //
  const setStartTime = useTimeStore((state) => state.setStartTime);

  // Connect to the store on mount, disconnect on unmount, catch state-changes in a reference
  useEffect(() => {
    useTimeStore.subscribe(
      (startTime) => (startTimeRef.current = startTime),
      (state) => state.startTime
    );

    useTimeStore.subscribe(
      (endTime) => (endTimeRef.current = endTime),
      (state) => state.endTime
    );
  }, []);

  useFrame((state, delta) => {
    if (playMode)
      /*groupRef.current.position.x -= 0.01 * (60 * delta);*/ setStartTime(
        startTimeRef.current + 0.01 * (60 * delta)
      );

    ref.current.setDrawRange(startTimeRef.current, endTimeRef.current);

    updateColors(ref.current, startTimeRef.current, endTimeRef.current);

    meshRef.current.position.set(-startTimeRef.current * 0.4, 0, 0);
  });

  // React-spring animation config
  const { spring } = useSpring({
    spring: hover || clicked,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  // Scale on hover with mouse
  const scale = spring.to([0, 1], [1, 5]);

  const ref = useUpdate(
    (self) => {
      // Set specific range which is to be shown
      self.setDrawRange(startTimeRef.current, endTimeRef.current);

      // Set initial points
      self.setFromPoints(
        props.data.map((p) => new THREE.Vector3(p[0], p[1], p[2]))
      );

      // Set initial colors
      updateColors(self, startTimeRef.current, endTimeRef.current);

      self.verticesNeedUpdate = true;
    },
    [props.data]
  );

  const updateColors = (geometry, start, end) => {
    // Set gradient color theme to all points that is rendered in setDrawRange method
    let colors = getColorData(props.data.slice(start, end + start), start);
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  };

  return (
    <a.group
      position-y={scale}
      onClick={() => setClicked(Number(!clicked))}
      onPointerOver={() => !markMode && !clicked && setHover(Number(1))}
      onPointerOut={() => !markMode && !clicked && setHover(Number(0))}
      ref={groupRef}
    >
      <a.mesh ref={meshRef}>
        <line
          // position={[-startTimeRef.current * 0.4, 0, 0]}
          scale={[1, 100, 1]}
        >
          <bufferGeometry attach="geometry" ref={ref} />
          <lineBasicMaterial
            name="line"
            attach="material"
            linewidth={1000}
            linecap={"round"}
            linejoin={"round"}
            vertexColors={"VertexColors"}
          />
        </line>
      </a.mesh>
    </a.group>
  );
};

export default Wave;
