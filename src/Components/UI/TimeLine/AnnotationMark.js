import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
const Wrapper = styled.div``;

const Mark = styled.div`
  display: grid;
  background-color: #00a8ff;
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
  border: solid 3px #00a6fc;
  opacity: 0.8;
`;
const AnnotationMark = (props) => {
  const [anchor, setAnchor] = useState(null);
  const handlePointerOver = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };
  const handlePointerOut = (event) => {
    setAnchor(null);
  };
  const open = Boolean(anchor);
  const id = open ? 'popper' : undefined;
  return (
    <Wrapper>
      <Mark
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        left={props.ann.start / props.ratio}
        width={(props.ann.end - props.ann.start) / props.ratio}
      >
        {props.ann.code}
      </Mark>

      <Popper open={open} anchorEl={anchor} placement={'top'} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper>{props.ann.text}</Paper>
          </Fade>
        )}
      </Popper>
    </Wrapper>
  );
};

export default AnnotationMark;
