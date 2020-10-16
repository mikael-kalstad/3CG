import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
const Mark = styled.div`
  display: grid;
  background-color: #74b9ff;
  width: ${(props) => props.width + 'px'};
  position: absolute;
  left: ${(props) => props.left + 'px'};
  text-align: center;
  font-weight: bold;
  align-items: center;
  height: 24px;
  user-select: none;
  border-radius: 5px;
  font-size: 0.7vw;
  border: solid 3px #71b6fc;
  opacity: 0.8;
`;
const AnnotationMark = (props) => {
  return (
    <Mark
      left={props.ann.start / props.ratio}
      width={(props.ann.end - props.ann.start) / props.ratio}
    >
      {props.ann.code}
    </Mark>
  );
};

export default AnnotationMark;
