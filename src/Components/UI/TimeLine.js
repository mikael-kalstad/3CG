import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import { useTimeStore } from "../../Store";
import { dataService } from "../../Services/DataService";

const dataLength = dataService.getDuration();

const Container = styled.div`
  width: 60%;
  max-width: 1000px;
  height: 20px;
  border-radius: 5px;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: auto;
  background: #fff;
`;

const TimeLine = () => {
  const containerRef = useRef();
  const [containerWidth, setContainerWidth] = useState(500);
  const [rndWidth, setRndWidth] = useState(0);

  console.log("%c [Timeline] is rendering", "background: #111; color: #ebd31c");

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

  useEffect(() => {
    // Connect to the store on mount, disconnect on unmount, catch state-changes in a reference
    useTimeStore.subscribe(
      (startTime) => (startTimeRef.current = startTime),
      (state) => state.startTime
    );

    useTimeStore.subscribe(
      (endTime) => (endTimeRef.current = endTime),
      (state) => state.endTime
    );

    // Remove all listeners on unmount
    return () => useTimeStore.destroy();
  }, []);

  useEffect(() => {
    // Handle reisizing of the window
    const handleResize = () => {
      // Update containerwidth
      setContainerWidth(containerRef.current.offsetWidth);

      // Set width of rnd drag component based on containerwidth
      setRndWidth(
        (endTimeRef.current - startTimeRef.current) *
          (containerRef.current.offsetWidth / dataLength)
      );
    };

    // Run handleresize to set initial width of rnd and containerWidth states
    if (containerRef.current) {
      handleResize();
    }

    // Update states on resize
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  // Ratio used to make dimensions correct according to data size
  let ratio = dataLength / containerWidth;

  const handleResize = (e, dir, ref, delta, position) => {
    // Calculate new start time based on x position and window width
    let newStartTime = ratio * position.x;

    // Update global start time state
    setStartTime(newStartTime);

    // Update global end time state based on scroller width and new start time
    setEndTime(
      newStartTime + ratio * Number.parseInt(ref.style.width.split("px")[0])
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
    width: startTimeRef.current * ratio + endTimeRef.current * ratio + "px",
    height: "100%",
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "5px",
  };

  return (
    <Container ref={containerRef}>
      <Rnd
        bounds="parent"
        style={style}
        default={{
          width: (endTime - startTime) * (containerWidth / dataLength),
          height: "100%",
        }}
        size={{
          width: rndWidth,
          height: "100%",
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
