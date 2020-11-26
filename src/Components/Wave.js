import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useUpdate, useFrame } from 'react-three-fiber';
import {
  useChannelStore,
  useInspectStore,
  useModeStore,
  useScaleStore,
  useTimeStore,
  useColorOptionsStore,
  useMousePositionStore,
} from '../Store';
import {
  getDiagnosisColorData,
  getHeatColorData,
  getTransitionColorData,
} from '../Scripts/Color';
import { dataService } from '../Services/DataService';
import Text from './Text';

const dataLength = dataService.getSampleLength();
const sampleRate = dataService.getSampleRate();

const Wave = (props) => {
  console.log('%c [Wave] is rendering', 'background: #111; color: #ebd31c');

  const [currentlyHovering, setCurrentlyHovering] = useInspectStore((state) => [
    state.currentlyHovering,
    state.setCurrentlyHovering,
  ]);

  const meshRef = useRef();
  const hoverBallRef = useRef();
  const hoverPlaneRef = useRef();
  const hoverLineRef = useRef();

  // Get mode states from global store
  const [playMode, togglePlayMode] = useModeStore((state) => [
    state.playMode,
    state.togglePlayMode,
  ]);

  const [
    activeChannels,
    setActiveChannels,
    setActiveChannelsPlaceholder,
  ] = useChannelStore((state) => [
    state.activeChannels,
    state.setActiveChannels,
    state.setActiveChannelsPlaceholder,
  ]);

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
  const [speed, setSpeed, defaultSpeed] = useTimeStore((state) => [
    state.speed,
    state.setSpeed,
    state.defaultSpeed,
  ]);

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

    // Avoid playback running into negative time!
    if (playMode && speed < 0 && startTimeRef.current <= 0) {
      togglePlayMode();
      setStartTime(0);
      setSpeed(defaultSpeed);
    }

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

  useEffect(() => {
    if (isInspected()) {
      hoverPlaneRef.current.scale.x =
        (endTimeRef.current - startTimeRef.current) * sampleRate * scale;
      hoverPlaneRef.current.scale.y = 200;

      hoverPlaneRef.current.position.x =
        (endTimeRef.current - startTimeRef.current) * sampleRate * scale * 0.5;
    }
  }, [inspected, endTimeRef.current]);

  const isInspected = () => {
    return props.index === inspected;
  };

  const inspectChannel = (channelIndex) => {
    setActiveChannelsPlaceholder(activeChannels);
    setInspected(channelIndex);
    let newActiveChannels = [];
    for (let i = 0; i < activeChannels.length; i++) {
      newActiveChannels.push(i === channelIndex ? true : false);
    }
    setActiveChannels(newActiveChannels);
  };

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
    let colors = [];
    const activeWaveColorType = useColorOptionsStore.getState()
      .activeWaveColorType;

    if (activeWaveColorType === 0) {
      // Set gradient color theme to all points that is rendered in setDrawRange method
      colors = getTransitionColorData(
        props.data.slice(start * sampleRate, end * sampleRate),
        start * sampleRate
      );
    } else if (activeWaveColorType === 1) {
      // Set color based on diagnosis
      colors = getDiagnosisColorData(props.data);
    } else if (activeWaveColorType === 2) {
      // Set color based on wave y-value
      colors = getHeatColorData(props.data);
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  };

  /* Calculates which point of the wave the user is hovering */
  /* Takes into account that the timeline can be 'out of sync' of the scale */
  const handleHover = (e) => {
    // Overstep by timeline
    let overstep = (startTimeRef.current * sampleRate) % 1;
    if (Math.abs(overstep - scale) < 0.0000000000001) {
      overstep = 0;
    }
    let setback = overstep * scale;
    let posx =
      Math.floor(e.point.x / scale + scale + overstep) * scale - setback;
    let val =
      dataService.getSamplesByChannel(props.channelName)[
        Number.parseInt(startTimeRef.current * sampleRate + posx / scale)
      ] * 100;
    let hoverBallY = val;
    if (vChannelScaling && props.channelName[0] === 'V') {
      hoverBallY *= vChannelScaleFactor;
    }
    hoverBallRef.current.position.set(posx, hoverBallY, 0);
    hoverLineRef.current.position.set(posx, 0, 0);
    useMousePositionStore.getState().setxPos(posx);
    useMousePositionStore.getState().setyPos(val);
  };
  return (
    <group position={props.position}>
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
      <group scale={[scale, 1, 1]}>
        <mesh ref={meshRef}>
          <line
            scale={[
              1,
              props.channelName[0] === 'V' && vChannelScaling
                ? 100 * vChannelScaleFactor
                : 100,
              1,
            ]}
          >
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
      </group>
      {inspected === props.index && (
        <>
          <mesh ref={hoverBallRef} scale={[0.5, 0.5, 0.5]}>
            <sphereBufferGeometry
              attach='geometry'
              radius={1}
              widthSegments={5}
              heightSegments={5}
            />
            <meshPhongMaterial attach='material' visible={currentlyHovering} />
          </mesh>
          <mesh
            ref={hoverPlaneRef}
            onPointerMove={inspected != -1 ? handleHover : null}
            onPointerOver={() => setCurrentlyHovering(true)}
            onPointerOut={() => setCurrentlyHovering(false)}
          >
            <planeBufferGeometry attach='geometry' />
            <meshPhongMaterial
              attach='material'
              color={0xff0000}
              opacity={0.1}
              visible={false}
            />
          </mesh>
          <mesh ref={hoverLineRef} scale={[0.1, 200, 0.1]}>
            <boxBufferGeometry attach='geometry' />
            <meshPhongMaterial
              attach='material'
              color={0xffffff}
              opacity={0.6}
              transparent={true}
              visible={currentlyHovering}
            />
          </mesh>
        </>
      )}
    </group>
  );
};

export default Wave;
