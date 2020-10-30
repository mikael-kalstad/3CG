import React from "react";
import styled from "styled-components";
import MiniPlayBtn from "../Buttons/MiniPlayBtn";
import MiniSKipBtn from "../Buttons/MiniSkipBtn";
import MiniFastForwardBtn from "../Buttons/MiniFastForward";

const Container = styled.div`
  position: absolute;
  bottom: 100%;
  width: 100%;
  height: 20px;
  border-radius: 5px 5px 0 0;
  background: #333;
  border-bottom: ${(props) =>
    !props.showTotalTime && "1px solid rgba(255,255,255,0.4)"};
`;

const ControlsWrapper = styled.div`
  width: 100px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-gap: 10px;
  justify-items: center;
  align-items: center;
  margin-left: 20px;
`;

const ICON_SIZE = 20;

const TimeLineBar = (props) => {
  return (
    <Container showTotalTime={props.showTotalTime}>
      <ControlsWrapper>
        <MiniSKipBtn iconSize={ICON_SIZE} />
        <MiniFastForwardBtn iconSize={ICON_SIZE} />
        <MiniPlayBtn iconSize={ICON_SIZE} />
        <MiniFastForwardBtn iconSize={ICON_SIZE} forward={true} />
        <MiniSKipBtn iconSize={ICON_SIZE} forward={true} />
      </ControlsWrapper>
    </Container>
  );
};

export default TimeLineBar;
