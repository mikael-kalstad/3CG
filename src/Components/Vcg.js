import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { useUpdate, useFrame } from "react-three-fiber";
import { a } from "@react-spring/three";
import { useModeStore, useTimeStore } from "../Store";
import { dataService } from "../Services/DataService";
import { getColorData } from "../Scripts/Color";
import { matrix, multiply, transpose } from "mathjs";

const dataLength = dataService.getSampleLength();
const sampleRate = dataService.getSampleRate();
const SPEED = 0.01 / sampleRate;

const Vcg = (props) => {
  console.log("%c [Vcg] is rendering", "background: #111; color: #ebd31c");
  const meshRef = useRef();

  // Get mode states from global store
  const [playMode, togglePlayMode] = useModeStore((state) => [
    state.playMode,
    state.togglePlayMode,
  ]);

  const markMode = useModeStore((state) => state.markMode);

  // Fetch initial time state
  const startTimeRef = useRef(useTimeStore.getState().startTime);
  const endTimeRef = useRef(useTimeStore.getState().endTime);

  // Set methods used when "animating" with play feature
  const setStartTime = useTimeStore((state) => state.setStartTime);
  const setEndTime = useTimeStore((state) => state.setEndTime);

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
    let end = endTimeRef.current >= dataLength / sampleRate;

    // Stop playMode if end of data is reached
    if (playMode && end) togglePlayMode();
    // Update start and end time every frame if playMode is active
    else if (playMode) {
      setStartTime(startTimeRef.current + SPEED * (60 * delta));
      setEndTime(endTimeRef.current + SPEED * (60 * delta));
    }

    ref.current.setDrawRange(
      startTimeRef.current * sampleRate,
      (endTimeRef.current - startTimeRef.current) * sampleRate
    );

    // updateColors(ref.current, startTimeRef.current, endTimeRef.current);

    // meshRef.current.position.set(-startTimeRef.current * sampleRate, 0, 0);
  });

  const convertData = (data) => {
    let D = matrix([
      [-0.172, -0.074, 0.122, 0.231, 0.239, 0.194, 0.156, -0.01],
      [0.057, -0.019, -0.106, -0.022, 0.041, 0.048, -0.227, 0.887],
      [-0.229, -0.31, -0.246, -0.063, 0.055, 0.108, 0.022, 0.102],
    ]);

    let arr = [];

    for (let i = 0; i < data[0].length; i++) {
      // [V1 V2 V3 V4 V5 V6 I II]
      let matrixA = matrix([
        data[3][i],
        data[4][i],
        data[5][i],
        data[6][i],
        data[7][i],
        data[8][i],
        data[0][i],
        data[1][i],
      ]);

      let matrixXYZ = multiply(D, matrixA);
      arr.push(matrixXYZ._data);
    }

    return arr;
  };

  const ref = useUpdate(
    (self) => {
      // Set specific range which is to be shown
      // self.setDrawRange(
      //   startTimeRef.current * sampleRate,
      //   endTimeRef.current * sampleRate
      // );
      let vcgPoints = convertData(props.data, 0);

      // Set initial points
      self.setFromPoints(
        vcgPoints.map(
          (p, i) =>
            new THREE.Vector3(
              // props.data[8][i][0],
              // props.data[1][i][1],
              // -0.5 * props.data[4][i][2]
              p[0][0],
              p[1][0],
              p[2][0]
            )
        )
      );

      // Set initial colors
      updateColors(self, startTimeRef.current, endTimeRef.current);

      self.verticesNeedUpdate = true;
    },
    [props.data]
  );

  const updateColors = (geometry, start, end) => {
    // Set gradient color theme to all points that is rendered in setDrawRange method
    let colors = getColorData(
      props.data.slice(start * sampleRate, end * sampleRate),
      start * sampleRate
    );
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  };

  return (
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
  );
};

export default Vcg;
