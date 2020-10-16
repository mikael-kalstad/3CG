import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import AnnotationMark from './AnnotationMark';
import { useTimeStore } from '../../../Store';
import { dataService } from '../../../Services/DataService';
import { useAnnotationStore } from '../../../Store';

const dataLength = dataService.getDuration();

const Container = styled.div`
  width: 60%;
  max-width: 1000px;
  height: 30px;
  border-radius: 5px;
  position: relative;
  bottom: 60px;
  left: 0;
  right: 0;
  margin: auto;
  background: #fff;
`;

const ResizeIcon = styled.div`
  cursor: e-resize;
  width: 5px;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.35);
  left: ${(props) => props.position === 'left' && '0'};
  right: ${(props) => props.position === 'right' && '0'};
  border-radius: ${(props) =>
    props.position === 'left' ? '5px 0 0 5px' : '0 5px 5px 0'};
`;

const TimeLine = () => {
  const [windowWitdth, setWindowWitdth] = useState(window.innerWidth);

  const [startTime, setStartTime] = useTimeStore((state) => [
    state.startTime,
    state.setStartTime,
  ]);

  const [endTime, setEndTime] = useTimeStore((state) => [
    state.endTime,
    state.setEndTime,
  ]);

  // Fetch initial time state
  const startTimeRef = useRef(useTimeStore.getState().startTime);
  const endTimeRef = useRef(useTimeStore.getState().endTime);

  // Fetch annotations
  const annotations = useAnnotationStore((state) => state.annotations);

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

  useEffect(() => {
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [windowWitdth]);

  // Ratio used to make dimensions correct according to data size
  const updateSize = (e) => setWindowWitdth(e.currentTarget.innerWidth);

  let ratio = dataLength / (windowWitdth * 0.6);

  const handleResize = (e, dir, ref, delta, position) => {
    // Calculate new start time based on x position and window width
    let newStartTime = ratio * position.x;

    // Update global start time state
    setStartTime(newStartTime);

    // Update global end time state based on scroller width and new start time
    setEndTime(
      newStartTime + ratio * Number.parseInt(ref.style.width.split('px')[0])
    );
  };

  const handleDrag = (e, data) => {
    // Calculate new start time based on x position and window width
    let newStartTime = ratio * data.x;

    // Update global start time state
    setStartTime(newStartTime);

    // Update global end time state based on scroller width and new start time
    setEndTime(newStartTime + ratio * data.node.scrollWidth);
  };

  const style = {
    width: startTimeRef.current * ratio + endTimeRef.current * ratio + 'px',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '5px',
  };

  console.log('window width', windowWitdth);

  return (
    <Container>
      {annotations.map((ann) => (
        <AnnotationMark ann={ann} ratio={ratio} />
      ))}

      <Rnd
        bounds="parent"
        style={style}
        default={{
          width:
            startTime * ((windowWitdth * 0.6) / dataLength) +
            endTime * ((windowWitdth * 0.6) / dataLength) +
            'px',
          height: '100%',
        }}
        enableResizing={{
          left: true,
          right: true,
          top: false,
          bottom: false,
          bottomLeft: false,
          bottomRight: false,
          topLeft: false,
          topRight: false,
        }}
        onResize={handleResize}
        onDrag={handleDrag}
        position={{ x: startTimeRef.current / ratio, y: 0 }}
      />
    </Container>
  );
};

export default TimeLine;
