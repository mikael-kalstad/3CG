import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";

const Container = styled.div`
  width: 60%;
  max-width: 1000px;
  height: 80px;
  border-radius: 5px;
  position: absolute;
  bottom: 20px;
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
  left: ${(props) => props.position === "left" && "0"};
  right: ${(props) => props.position === "right" && "0"};
  border-radius: ${(props) =>
    props.position === "left" ? "5px 0 0 5px" : "0 5px 5px 0"};
`;

const TimeLine = (props) => {
  const [width, setWidth] = useState("65%");
  const ContainerRef = useRef();

  const handleResizeDown = (e) => {
    e.target.addEventListener("ondrag", move);
  };

  const handleResizeUp = (e) => {
    e.target.removeEventListener("ondrag", move);
  };

  const move = (e, data) => {
    console.log(e, data);
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; //x position within the element.

    let containerWidth = ContainerRef.current.clientWidth;
    // console.log("container width", containerWidth);
    let newWidth = containerWidth * 0.65 + x;
    // console.log(newWidth);
    setWidth(containerWidth * 0.65 + data.lastX + "px");
  };

  const style = {
    width: "200px",
    height: "100%",
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "5px",
  };

  return (
    <Container ref={ContainerRef}>
      {/* <Rnd bounds="parent"> */}
      <Rnd
        bounds="parent"
        style={style}
        default={{ width: "200px", height: "100%", x: 0, y: 0 }}
      >
        <ResizeIcon
          position="left"
          //   onMouseDown={(e) => handleResizeDown(e)}
          //   onMouseUp={(e) => handleResizeUp(e)}
        />
        <ResizeIcon
          position="right"
          //   onMouseDown={(e) => handleResizeDown(e)}
          //   onMouseUp={(e) => handleResizeUp(e)}
        />
      </Rnd>
      {/* </Rnd> */}
    </Container>
  );
};

export default TimeLine;
