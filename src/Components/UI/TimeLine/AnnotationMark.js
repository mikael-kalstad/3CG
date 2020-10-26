import React, { useState } from 'react';
import styled from 'styled-components';
import { useTimeStore, useAnnotationStore } from '../../../Store';
import AnnotationPopper from './AnnotationPopper';

// Empty wrapper used to control hover functionality in Mark styled div
const Wrapper = styled.div``;

const Mark = styled.div`
  ${Wrapper}:hover & {
    z-index: 100;
    opacity: 0.9;
    filter: brightness(85%);
    cursor: pointer;
  }
  display: grid;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width + 'px'};
  position: absolute;
  left: ${(props) => props.left + 'px'};
  text-align: center;
  font-weight: bold;
  align-items: center;
  height: 28px;
  user-select: none;
  border-radius: 5px;
  font-size: 0.7vw;
  opacity: 0.5;
  transition: 0.2s ease;
  color: white;
`;

const AnnotationMark = (props) => {
  const [anchor, setAnchor] = useState(null);
  const [
    startTime,
    setStartTime,
    endTime,
    setEndTime,
  ] = useTimeStore((state) => [
    state.startTime,
    state.setStartTime,
    state.endTime,
    state.setEndTime,
  ]);
  const [annotations, showFullAnnotation] = useAnnotationStore((state) => [
    state.annotations,
    state.showFullAnnotation,
  ]);

  const handlePointerOver = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handlePointerOut = (event) => {
    setAnchor(null);
  };

  // Change start and end time to show annotation visually
  const goToAnnotation = (index) => {
    const a = annotations[index];

    // Save current graph length
    const diff = endTime - startTime;

    // Change startTime to annotation start
    setStartTime(a.start);

    // Only change endTime if necessary
    if (showFullAnnotation && a.start + diff < a.end) setEndTime(a.end);
    else setEndTime(a.start + diff);

    props.onClick();
  };
  return (
    <Wrapper onClick={() => goToAnnotation(props.index)}>
      <Mark
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        left={props.ann.start / props.ratio}
        width={(props.ann.end - props.ann.start) / props.ratio}
        color={props.ann.ai ? '#2ecc71' : '#00a8ff'}
      >
        {props.ann.code}
      </Mark>
      <AnnotationPopper ann={props.ann} anchor={anchor} />
    </Wrapper>
  );
};

export default AnnotationMark;
