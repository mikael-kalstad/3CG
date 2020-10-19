import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import AnnotationPopper from "./AnnotationPopper";
const Wrapper = styled.div``;

const Mark = styled.div`
  ${Wrapper}:hover & {
    border: solid 3px #0086dc;
    z-index: 100;
  }
  display: grid;
  background-color: #00a8ff;
  width: ${(props) => props.width + "px"};
  position: absolute;
  left: ${(props) => props.left + "px"};
  text-align: center;
  font-weight: bold;
  align-items: center;
  height: 24px;
  user-select: none;
  border-radius: 5px;
  font-size: 0.7vw;
  border: solid 3px #00a8ff;
  opacity: 0.5;
  transition: 0.2s ease;
`;

const AnnotationMark = (props) => {
  const [anchor, setAnchor] = useState(null);
  const [open, setOpen] = useState(Boolean(anchor));
  const handlePointerOver = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
    // setOpen(true);
  };
  const handlePointerOut = (event) => {
    setAnchor(null);
    // setOpen(false);
  };

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
      <AnnotationPopper ann={props.ann} anchor={anchor} />
    </Wrapper>
  );
};

export default AnnotationMark;
