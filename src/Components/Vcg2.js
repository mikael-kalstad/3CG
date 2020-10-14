import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useUpdate, useFrame } from 'react-three-fiber';
import { a } from '@react-spring/three';
import { useModeStore, useTimeStore } from '../Store';
import { dataService } from '../Services/DataService';
import { getColorData } from '../Scripts/Color';
import { matrix, multiply, transpose } from 'mathjs';

const dataLength = dataService.getSampleLength();
const sampleRate = dataService.getSampleRate();
const SPEED = 0.01 / sampleRate;

const Vcg2 = (props) => {
  console.log('%c [Vcg2] is rendering', 'background: #111; color: #ebd31c');
  const meshRef = useRef();

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
  let values = dataService.getSamples();
  console.log(values);
  // Connect to the store on mount, disconnect on unmount, catch state-changes in a reference

  const dowersTransform = (data) => {
    let invD = matrix([
      [-0.172, -0.074, 0.122, 0.231, 0.239, 0.194, 0.156, -0.01],
      [0.057, -0.019, -0.106, -0.022, 0.041, 0.048, -0.227, 0.887],
      [-0.229, -0.31, -0.246, -0.063, 0.055, 0.108, 0.022, 0.102],
    ]);

    // [V1 V2 V3 V4 V5 V6 I II]
    let matrixA = matrix([
      values['V1'],
      values['V2'],
      values['V3'],
      values['V4'],
      values['V5'],
      values['V6'],
      values['I'],
      values['II'],
    ]);
    console.log(matrixA);
    let transformed = multiply(invD, matrixA);
    console.log(transformed._data);

    let output = [];
    for (let i = 0; i < transformed._data[0].length; i++) {
      output.push([
        transformed._data[0][i],
        transformed._data[1][i],
        transformed._data[2][i],
      ]);
    }
    console.log(output);
    return output;
  };

  const ref = useUpdate((self) => {
    // Set specific range which is to be shown
    // self.setDrawRange(
    //   startTimeRef.current * sampleRate,
    //   endTimeRef.current * sampleRate
    // );
    let vcgPoints = dowersTransform(values);

    // Set initial points
    self.setFromPoints(
      vcgPoints.map((p, i) => {
        console.log(p[0]);
        return new THREE.Vector3(p[0], p[1], p[2]);
      })
    );
    console.log(self);

    // Set initial colors
    // updateColors(self, startTimeRef.current, endTimeRef.current);

    self.verticesNeedUpdate = true;
  }, []);

  // const updateColors = (geometry, start, end) => {
  //   // Set gradient color theme to all points that is rendered in setDrawRange method
  //   let colors = getColorData(
  //     dataService
  //       .formatDataToPoints()
  //       .slice(start * sampleRate * 10, end * sampleRate * 10),
  //     start * sampleRate * 10
  //   );
  //   geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  // };

  return (
    <a.mesh ref={meshRef}>
      <line position={[100, 20, -150]} scale={[50, 50, 50]}>
        <bufferGeometry attach="geometry" ref={ref} />
        <meshBasicMaterial
          name="line"
          attach="material"
          linewidth={1000}
          linecap={'round'}
          linejoin={'round'}
          vertexColors={'VertexColors'}
          color={'0xff0000'}
        />
      </line>
    </a.mesh>
  );
};

export default Vcg2;