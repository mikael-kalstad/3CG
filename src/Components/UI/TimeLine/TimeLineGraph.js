import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useTimeStore } from "../../../Store";
import { dataService } from "../../../Services/DataService";

const duration = dataService.getDuration();

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  background: #333;
  border-radius: 5px 5px 0 0;
  border-bottom: 2px solid white;
`;

const Text = styled.span`
  position: absolute;
  bottom: 15px;
  font-size: 10px;
  font-weight: 600;
  color: white;
  right: ${(props) => (duration - props.position) * (100 / duration) - 1 + "%"};
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
`;

const LineWrapper = styled.div`
  position: absolute;
  width: calc(100% - 1px);
  bottom: 0;
  white-space: nowrap;
  display: grid;
  grid-template-columns: repeat(
    ${(props) => duration + props.numOfLinesBetween},
    auto
  );
  grid-template-rows: 1fr;
  align-items: end;
  justify-content: space-between;
`;

const VerticalLine = styled.div`
  display: absolute;
  width: 2px;
  height: ${(props) => (props.withText ? "15px" : "10px")};
  background-color: white;
  border-radius: 5px 5px 0 0;
  vertical-align: bottom;
  bottom: 0;
`;

const VerticalLineWithText = styled.div`
  display: inline-block;
`;

const TimeLineGraph = (props) => {
  const [numOfLinesBetween, setNumOfLinesBetween] = useState(0);

  const handleResize = () => {
    let windowWidth = window.innerWidth;

    if (windowWidth > 1200) setNumOfLinesBetween(4);
    else if (windowWidth > 1000) setNumOfLinesBetween(3);
    else if (windowWidth > 800) setNumOfLinesBetween(2);
    else if (windowWidth > 500) setNumOfLinesBetween(1);
  };

  useEffect(() => {
    // Add eventlistener to on resize to handle smaller and larger width design changes
    window.addEventListener("resize", handleResize);

    // Set intial width
    handleResize();

    // Cleanup on dismount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch initial time state
  const startTimeRef = useRef(useTimeStore.getState().startTime);
  const endTimeRef = useRef(useTimeStore.getState().endTime);

  // Set methods used when "animating" with play feature
  const setStartTime = useTimeStore((state) => state.setStartTime);
  const setEndTime = useTimeStore((state) => state.setEndTime);

  // Connect to the store on mount, disconnect on unmount, catch state-changes in a reference
  useEffect(() => {
    useTimeStore.subscribe(
      (startTime) => (startTimeRef.current = startTime),
      (state) => state.startTime
    );

    useTimeStore.subscribe(
      (endTime) => (endTimeRef.current = endTime),
      (state) => state.endTime
    );
  }, []);

  const CurentTimeLine = styled.div`
    position: absolute;
    left: ${startTimeRef.current / props.ratio + "px"};
    height: 200%;
    bottom: -100%;
    width: 2px;
    background: RGBA(197, 192, 26, 0.8);
  `;

  console.log(
    "%c [TimeLineGraph] is rendering",
    "background: #111; color: #ebd31c"
  );

  const linspace = (start, end, steps) => {
    let arr = [];
    for (let i = start; i < end; i += (end - start) / (steps - 1)) {
      arr.push(i);
    }
    arr.push(end);
    return arr;
  };

  let numsToDisplay = linspace(1, duration - 1, duration - 1).map((e) =>
    e.toFixed(1)
  );

  let linesBetween = [];

  for (let i = 0; i < numOfLinesBetween; i++)
    linesBetween.push(<VerticalLine />);

  return (
    <Container>
      <Wrapper>
        <LineWrapper
          numOfLinesBetween={
            numOfLinesBetween * numsToDisplay.length + numOfLinesBetween + 1
          }
        >
          <VerticalLineWithText>
            <VerticalLine withText={true} />
          </VerticalLineWithText>
          {numsToDisplay.map((e, i) => (
            <>
              {linesBetween}
              <VerticalLineWithText>
                <Text position={i + 1}>{e}</Text>
                <VerticalLine withText={true} />
              </VerticalLineWithText>
            </>
          ))}
          {linesBetween}
          <VerticalLineWithText>
            <VerticalLine withText={true} />
          </VerticalLineWithText>
        </LineWrapper>
      </Wrapper>

      {/* <CurentTimeLine /> */}
    </Container>
  );
};

export default TimeLineGraph;
