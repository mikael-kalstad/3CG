import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useUpdate, useFrame } from 'react-three-fiber';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/three';
import { /*getColorData*/ getColorDataHeat } from '../Scripts/Color';
import {
  useChannelStore,
  useInspectStore,
  useModeStore,
  useScaleStore,
  useTimeStore,
} from '../Store';
import { dataService } from '../Services/DataService';
import Text from './Text';

const dataLength = dataService.getSampleLength();
const sampleRate = dataService.getSampleRate();

const Wave = (props) => {
  const [clicked, setClicked] = useState(0);
  const meshRef = useRef();

  // Get mode states from global store
  const [playMode, togglePlayMode] = useModeStore((state) => [
    state.playMode,
    state.togglePlayMode,
  ]);

  const markMode = useModeStore((state) => state.markMode);

  const [inspectMode] = useModeStore((state) => [state.inspectMode]);

  const activeChannels = useChannelStore((state) => state.activeChannels);
  const setChannel = useChannelStore((state) => state.setChannel);

  const [
    scale,
    vChannelScaleFactor,
    vChannelScaling,
  ] = useScaleStore((state) => [
    state.scale,
    state.vChannelScaleFactor,
    state.vChannelScaling,
  ]);

  const [inspected, setInspected] = useInspectStore((state) => [
    state.inspected,
    state.setInspected,
  ]);

  // Speed when playMode is activated
  const speed = useTimeStore((state) => state.speed);

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
      setStartTime(startTimeRef.current + speed * (60 * delta));
      setEndTime(endTimeRef.current + speed * (60 * delta));
    }

    ref.current.setDrawRange(
      startTimeRef.current * sampleRate,
      (endTimeRef.current - startTimeRef.current) * sampleRate
    );

    updateColors(ref.current, startTimeRef.current, endTimeRef.current);

    meshRef.current.position.set(-startTimeRef.current * sampleRate, 0, 0);
  });

  const isInspected = () => {
    return props.i === inspected;
  };

  const inspectChannel = (channelIndex) => {
    setInspected(channelIndex);
    for (let i = 0; i < activeChannels.length; i++) {
      if (i !== channelIndex) {
        setChannel(i, false);
      }
    }
  };

  // React-spring animation config
  const { spring } = useSpring({
    spring: inspectMode && !isInspected(),
    config: { mass: 0.5, tension: 400, friction: 50, precision: 0.001 },
  });

  // Scale on hover with mouse
  const springScale = spring.to([0, 1], [0, -100]);

  const ref = useUpdate(
    (self) => {
      // Set specific range which is to be shown
      self.setDrawRange(
        startTimeRef.current * sampleRate,
        endTimeRef.current * sampleRate
      );

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
    let colors = getColorDataHeat(
      props.data.slice(start * sampleRate, end * sampleRate),
      start * sampleRate
    );
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  };

  return (
    <group>
      <Text
        onClick={(e) => {
          e.stopPropagation();
          inspectChannel(props.index);
        }}
        position={props.data[0].map((val, i) => (i === 0 ? val - 6 : val))}
        rotateToCamera={true}
        background={true}
        backgroundOpacity={0.4}
        backgroundColor={0x000000}
        backgroundScaleByText={1.5}
        textSize={3.05}
        hoverEffect={true}
        hoverBackgroundColor={0x888888}
      >
        {props.channelName}
      </Text>
      <a.group
        position-y={springScale}
        onClick={() => {
          !markMode && setClicked(Number(!clicked));
        }}
        scale={[scale, 1, 1]}
      >
        <a.mesh ref={meshRef}>
          <line
            // position={[-startTimeRef.current * 0.4, 0, 0]}
            scale={[
              1,
              props.channelName[0] === 'V' && vChannelScaling
                ? 100 - vChannelScaleFactor
                : 100,
              1,
            ]}
          >
            <bufferGeometry attach="geometry" ref={ref} />
            <lineBasicMaterial
              name="line"
              attach="material"
              linewidth={1000}
              linecap={'round'}
              linejoin={'round'}
              vertexColors={'VertexColors'}
            />
          </line>
        </a.mesh>
      </a.group>
    </group>
  );
};

export default Wave;
