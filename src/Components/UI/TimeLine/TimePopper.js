import Popper from "@material-ui/core/Popper";
import React from "react";
import styled from "styled-components";

const PopperDiv = styled.div`
  height: 21px;
  background-color: #efefef;
  padding: 0px 3px 0px;
  font-family: monospace;
  font-size: 15px;
  border-radius: 5px;
  border: solid 2px #dddddd;
  font-weight: bold;
  display: grid;
  align-items: center;
`;

// Component for showing time when changing the timeline
const TimePopper = (props) => {
  return (
    <Popper
      open={props.open}
      anchorEl={props.anchor}
      placement={props.placement}
    >
      <PopperDiv>{props.text}</PopperDiv>
    </Popper>
  );
};

export default TimePopper;
