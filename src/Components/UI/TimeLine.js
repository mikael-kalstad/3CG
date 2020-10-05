import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import { useTimeStore } from "../../Store";

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

const TimeLine = () => {
  const [startTime, setStartTime] = useTimeStore((state) => [
    state.startTime,
    state.setStartTime,
  ]);

  const [endTime, setEndTime] = useTimeStore((state) => [
    state.endTime,
    state.setEndTime,
  ]);

  const ContainerRef = useRef();

  const handleResize = (e, dir, ref, delta, position) => {
    // console.log("resize", e, dir);
    // Calculate new start time based on x position and window width
    let newStartTime = position.x;
    // console.log("new start time", newStartTime);

    // Update global start time state
    setStartTime(newStartTime);
    // Update global end time state based on scroller width and new start time
    let newEndTime =
      newStartTime + Number.parseInt(ref.style.width.split("px")[0]);
    // console.log("new end time", newEndTime);
    setEndTime(newEndTime);

    // console.log("ref", ref);
    // console.log("delta", delta);
    // console.log("position", position);
  };

  const handleDrag = (e, data) => {
    // console.log("data", data, e);
    // Calculate new start time based on x position and window width
    let newStartTime = (1000 / (window.innerWidth * 0.6)) * (data.x + 1);

    // Update global start time state
    setStartTime(newStartTime);

    // Update global end time state based on scroller width and new start time
    setEndTime(newStartTime + data.node.scrollWidth);
  };

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
        default={{ width: "200px", height: "100%", x: startTime, y: 0 }}
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
      />
    </Container>
  );
};

export default TimeLine;
