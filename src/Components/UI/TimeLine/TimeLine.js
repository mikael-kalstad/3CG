import React, { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import styled from "styled-components";
import { dataService } from "../../../Services/DataService";
import {
  useAnnotationStore,
  useTimelineOptionsStore,
  useTimeStore,
} from "../../../Store";
import AnnotationMark from "./AnnotationMark";
import TimeLineBar from "./TimeLineBar";
import TimeLineGraph from "./TimeLineGraph";
import TimePopper from "./TimePopper";

const dataLength = dataService.getDuration();

const Container = styled.div`
  width: 60%;
  max-width: 1000px;
  height: ${(props) => (props.showTotalTime ? "60px" : "30px")};
  border-radius: "0 0 5px 5px";
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

const TimeLine = (props) => {
  const containerRef = useRef();
  const rndRef = useRef();
  const [containerWidth, setContainerWidth] = useState(500);
  // const [rndWidth, setRndWidth] = useState(0);
  const [middlePopperOpen, setMiddlePopperOpen] = useState(false);
  const [startPopperOpen, setStartPopperOpen] = useState(false);
  const [endPopperOpen, setEndPopperOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);

  console.log("%c [Timeline] is rendering", "background: #111; color: #ebd31c");

  const setStartTime = useTimeStore((state) => state.setStartTime);
  const setEndTime = useTimeStore((state) => state.setEndTime);

  // THIS SHOULD NOT BE HERE. RERENDER ON EVRY STARTTIME CHANGE, FIX LATER!
  const [startTime, endTime] = useTimeStore((state) => [
    state.startTime,
    state.endTime,
  ]);
  console.log("Start time", startTime, "End Time", endTime);

  const useTimeLineOptionsStore = useTimelineOptionsStore();
  const activeAnnotations = useAnnotationStore(
    (state) => state.activeAnnotations
  );

  // Fetch initial time state
  const startTimeRef = useRef(useTimeStore.getState().startTime);
  const endTimeRef = useRef(useTimeStore.getState().endTime);

  // Fetch annotations
  const annotations = useAnnotationStore((state) => state.annotations);

  // Ratio used to make dimensions correct according to data size
  let ratio = dataLength / containerWidth;

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
    return () => useTimeStore.destroy();
  }, []);

  useEffect(() => {
    const updateRnd = (e) => {
      // if (containerRef) {
      let width =
        (endTimeRef.current - startTimeRef.current) *
        (containerRef.current.offsetWidth / dataLength);

      rndRef.current.updatePosition({ x: startTimeRef.current / ratio, y: 0 });
      rndRef.current.updateSize({
        width: width,
        height: "100%",
      });
    };

    // Handle reisizing of the window
    const handleResize = () => {
      // Update containerwidth
      setContainerWidth(containerRef.current.offsetWidth);

      // Set width of rnd drag component based on containerwidth
      // setRndWidth(
      //   (endTimeRef.current - startTimeRef.current) *
      //     (containerRef.current.offsetWidth / dataLength)
      // );
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
  }, [ratio]);

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
    background: "rgba(247, 152, 29, 0.3)",
    borderRadius: "5px",
    border: "solid rgba(247, 152, 29, 1)",
    borderWidth: "0 1px 0 1px",
    zIndex: 900,
  };

  return (
    <Container
      ref={containerRef}
      showTotalTime={useTimeLineOptionsStore.showTotalTime}
    >
      <TimeLineBar />

      {/* Only render timegraph in timeline if option is enabled */}
      {useTimeLineOptionsStore.showTotalTime && (
        <>
          <TimeLineGraph ratio={ratio} containerWidth={containerWidth} />
        </>
      )}

      {/* Only render annotations in timeline if option is enabled */}
      {useTimeLineOptionsStore.showAnnotations && (
        <AnnotationWrapper>
          {annotations.map(
            (ann, i) =>
              // Only render annotationmark if the annotation is active
              activeAnnotations[i] && (
                <AnnotationMark
                  ann={ann}
                  ratio={ratio}
                  key={i}
                  index={i}
                  // onClick={updateRnd}
                />
              )
          )}
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
        minWidth={50}
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
