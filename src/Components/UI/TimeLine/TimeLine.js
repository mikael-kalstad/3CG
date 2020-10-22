import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import AnnotationMark from "./AnnotationMark";
import TimeGraph from "./TimeGraph";
import TimeLineGraph from "./TimeLineGraph";
import TimePopper from "./TimePopper";
import { useTimeStore } from "../../../Store";
import { dataService } from "../../../Services/DataService";
import { useAnnotationStore, useTimelineOptionsStore } from "../../../Store";

const dataLength = dataService.getDuration();

const Container = styled.div`
  width: 60%;
  max-width: 1000px;
  height: ${(props) => (props.showTotalTime ? "60px" : "30px")};
  border-radius: "5px";
  position: relative;
  bottom: 80px;
  left: 0;
  right: 0;
  margin: auto;
  background: #333;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const AnnotationWrapper = styled.div`
  display: block;
  width: 100%;
`;

const TimeLine = () => {
  const containerRef = useRef();
  const rndRef = useRef();
  const [containerWidth, setContainerWidth] = useState(500);
  const [rndWidth, setRndWidth] = useState(0);
  const [middlePopperOpen, setMiddlePopperOpen] = useState(false);
  const [startPopperOpen, setStartPopperOpen] = useState(false);
  const [endPopperOpen, setEndPopperOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);

  console.log("%c [Timeline] is rendering", "background: #111; color: #ebd31c");

  const setStartTime = useTimeStore((state) => state.setStartTime);
  const setEndTime = useTimeStore((state) => state.setEndTime);

  // THIS SHOULD NOT BE HERE. RERENDER ON EVRY STARTTIME CHANGE, FIX LATER!
  const startTime = useTimeStore((state) => state.startTime);

  const useTimeLineOptionsStore = useTimelineOptionsStore();
  const activeAnnotations = useAnnotationStore(
    (state) => state.activeAnnotations
  );

  // Fetch initial time state
  const startTimeRef = useRef(useTimeStore.getState().startTime);
  const endTimeRef = useRef(useTimeStore.getState().endTime);

  // Fetch annotations
  const annotations = useAnnotationStore((state) => state.annotations);

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

    setAnchor(rndRef.current.resizableElement.current);

    // Remove all listeners on unmount
    // return () => useTimeStore.destroy();
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
      updateRnd();
    };

    // Run handleresize to set initial width of rnd and containerWidth states
    if (containerRef.current) handleResize();

    // Update states on resize
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const updateRnd = (e) => {
    // if (containerRef) {
    console.log("updating rnd...");
    let width =
      (endTimeRef.current - startTimeRef.current) *
      (containerRef.current.offsetWidth / dataLength);
    console.log("width", width);

    rndRef.current.updatePosition({ x: startTimeRef.current / ratio, y: 0 });
    rndRef.current.updateSize({
      width: width,
      height: "100%",
    });
    // }
  };

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
    console.log("new Endtime:", endTimeRef.current);
  };

  const resizeStart = (e, dir, ref, delta, position) => {
    if (dir === "left") {
      toggleStartPopper();
    } else if (dir === "right") {
      toggleEndPopper();
    }
  };

  const resizeStop = (e, dir, ref, delta, position) => {
    if (dir === "left") {
      toggleStartPopper();
    } else if (dir === "right") {
      toggleEndPopper();
    }
  };

  const handleDrag = (e, data) => {
    // Calculate new start time based on x position and window width
    let newStartTime = ratio * data.x;

    // Update global start time state
    setStartTime(newStartTime);

    // Update global end time state based on scroller width and new start time
    setEndTime(newStartTime + ratio * data.node.scrollWidth);
  };

  const toggleMiddlePopper = () => {
    setMiddlePopperOpen(!middlePopperOpen);
  };
  const toggleStartPopper = () => {
    setStartPopperOpen(!startPopperOpen);
  };
  const toggleEndPopper = () => {
    setEndPopperOpen(!endPopperOpen);
  };

  const style = {
    height: "100%",
    background: "RGBA(197, 192, 26, 0.3)",
    borderRadius: "5px",
    border: "solid RGBA(197, 192, 26, 1)",
    borderWidth: "0 1px 0 1px",
    zIndex: 900,
  };

  return (
    <Container
      ref={containerRef}
      showTotalTime={useTimeLineOptionsStore.showTotalTime}
    >
      {/* Only render timegraph in timeline if option is enabled */}
      {useTimeLineOptionsStore.showTotalTime && (
        <>
          {/* <TimeGraph ratio={ratio} intervals={Math.min(containerWidth / 60)} /> */}
          <TimeLineGraph ratio={ratio} containerWidth={containerWidth} />
        </>
      )}

      {/* Only render annotations in timeline if option is enabled */}
      {useTimeLineOptionsStore.showAnnotations && (
        <AnnotationWrapper>
          {annotations.map((ann, i) => {
            // Only render annotationmark if the annotation is active
            if (activeAnnotations[i])
              return (
                <AnnotationMark ann={ann} ratio={ratio} key={i} index={i} />
              );
          })}
        </AnnotationWrapper>
      )}

      <Rnd
        ref={rndRef}
        bounds="parent"
        style={style}
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
        dragAxis={"x"}
        onResize={handleResize}
        onResizeStart={resizeStart}
        onResizeStop={resizeStop}
        onDrag={handleDrag}
        onDragStart={toggleMiddlePopper}
        onDragStop={toggleMiddlePopper}
        position={{ x: startTimeRef.current / ratio, y: 0 }}
      />

      {useTimeLineOptionsStore.showTimeOnDrag && (
        <>
          <TimePopper
            anchor={anchor}
            open={middlePopperOpen}
            placement={"bottom"}
            text={
              ((startTimeRef.current + endTimeRef.current) / 2).toFixed(2) + "s"
            }
          />

          <TimePopper
            anchor={anchor}
            open={startPopperOpen}
            placement={"bottom-start"}
            text={startTimeRef.current.toFixed(2) + "s"}
          />

          <TimePopper
            anchor={anchor}
            open={endPopperOpen}
            placement={"bottom-end"}
            text={endTimeRef.current.toFixed(2) + "s"}
          />
        </>
      )}
    </Container>
  );
};

export default TimeLine;
