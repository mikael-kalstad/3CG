import { matrix, multiply } from 'mathjs';
import React, { useEffect, useRef } from 'react';
import { useUpdate, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { dataService } from '../Services/DataService';
import { useTimeStore } from '../Store';
import { getTransitionColorData } from '../Scripts/Color';
import { useRenderTypeStore } from '../Store';

const sampleRate = dataService.getSampleRate();

const Vcg = () => {
  console.log('%c [Vcg2] is rendering', 'background: #111; color: #ebd31c');
  const meshRef = useRef();

  // Fetch initial time state
  const startTimeRef = useRef(useTimeStore.getState().startTime);
  const endTimeRef = useRef(useTimeStore.getState().endTime);

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

  const dowersTransform = () => {
    // Transform methods for 12-lead ecg to vcg
    let transformMethods = [
      // Dowers inverse matrix
      matrix([
        [-0.172, -0.074, 0.122, 0.231, 0.239, 0.194, 0.156, -0.01],
        [0.057, -0.019, -0.106, -0.022, 0.041, 0.048, -0.227, 0.887],
        [-0.229, -0.31, -0.246, -0.063, 0.055, 0.108, 0.022, 0.102],
      ]),
      // PLSV inverse matrix
      matrix([
        [-0.266, 0.027, 0.065, 0.131, 0.203, 0.22, 0.37, -0.154],
        [0.088, -0.088, 0.003, 0.042, 0.047, 0.067, -0.131, 0.717],
        [-0.319, -0.198, -0.167, -0.099, -0.009, 0.06, 0.184, -0.114],
      ]),
      // QLSV inverse matrix
      matrix([
        [-0.147, -0.058, 0.037, 0.139, 0.232, 0.226, 0.199, -0.018],
        [0.023, -0.085, -0.003, 0.033, 0.06, 0.104, -0.146, 0.503],
        [-0.184, -0.163, -0.19, -0.119, -0.023, 0.043, 0.085, -0.13],
      ]),
    ];

    // Set inverse matrix based upon transform method selected in settings
    let invD = transformMethods[useRenderTypeStore.getState().vcgMethod];

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

    let transformed = multiply(invD, matrixA);

    let output = [];

    for (let i = 0; i < transformed._data[0].length; i++) {
      output.push([
        transformed._data[0][i],
        transformed._data[1][i],
        transformed._data[2][i],
      ]);
    }
    return output;
  };

  let previousStartTime = startTimeRef.current;
  let previousEndTime = endTimeRef.current;

  let vcgPoints = dowersTransform(values);

  useFrame(() => {
    if (
      previousStartTime !== startTimeRef.current &&
      previousEndTime !== endTimeRef.current
    ) {
      previousStartTime = startTimeRef.current;
      previousEndTime = endTimeRef.current;

      ref.current.setDrawRange(
        startTimeRef.current * sampleRate,
        endTimeRef.current * sampleRate
      );

      updateColors(
        ref.current,
        startTimeRef.current,
        endTimeRef.current,
        vcgPoints
      );
    }
  });

  const ref = useUpdate((self) => {
    // Set specific range which is to be shown
    self.setDrawRange(
      startTimeRef.current * sampleRate,
      endTimeRef.current * sampleRate
    );

    // Set initial points
    self.setFromPoints(
      vcgPoints.map((p, i) => {
        return new THREE.Vector3(p[0], p[1], p[2]);
      })
    );

    // Set initial colors
    updateColors(self, startTimeRef.current, endTimeRef.current, vcgPoints);

    self.verticesNeedUpdate = true;
  }, []);

  const updateColors = (geometry, start, end, points) => {
    // Set gradient color theme to all points that is rendered in setDrawRange method
    let colors = getTransitionColorData(
      points.slice(start * sampleRate, end * sampleRate),
      start * sampleRate
    );
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  };

  return (
    <mesh ref={meshRef}>
      <line position={[98, 0, 0]} scale={[50, 50, 50]}>
        <bufferGeometry attach='geometry' ref={ref} />
        <lineBasicMaterial
          name='line'
          attach='material'
          linewidth={1000}
          linecap={'round'}
          linejoin={'round'}
          vertexColors={'VertexColors'}
        />
      </line>
    </mesh>
  );
};

export default Vcg;
