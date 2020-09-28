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
  const [xPos, setXPos] = useState(0);
  const ContainerRef = useRef();

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

  const handleResize = (e, dir) => {
    console.log("resize", e, dir);
  };

  const handleDrag = (e, data) => {
    // console.log("drag", e, data);
    // setXPos(xPos + e.movementX);
    console.log(window.innerWidth);

    let newStartTime =
      (props.dataLength / (window.innerWidth * 0.6)) * (data.x + 1);
    console.log("new start time", newStartTime);
    props.timeProps.setStartTime(newStartTime);
  };

  // console.log("xpos", xPos);

  const style = {
    width: "200px",
    height: "100%",
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "5px",
  };

  return (
    <Container ref={ContainerRef}>
      <Rnd
        bounds="parent"
        style={style}
        default={{ width: "200px", height: "100%", x: 0, y: 0 }}
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
      >
        {/* <ResizeIcon
          position="left"
         
        />
        <ResizeIcon
          position="right"
          
        /> */}
      </Rnd>
    </Container>
  );
};

export default TimeLine;
