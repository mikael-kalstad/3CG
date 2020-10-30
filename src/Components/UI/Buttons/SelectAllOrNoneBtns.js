import React from "react";
import styled from "styled-components";
import Chip from "@material-ui/core/Chip";
import FormHelperText from "@material-ui/core/FormHelperText";

const StyledChip = styled(Chip)`
  justify-content: "center";
  flex-wrap: "wrap";
  width: 95px;
`;

const ChipWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: auto auto;
  justify-items: start;
  align-items: center;
  grid-gap: 10px;
`;

const SelectAllOrNoneBtns = (props) => (
  <>
    <FormHelperText>Toggle all {props.type} on/off</FormHelperText>
    <ChipWrapper>
      <StyledChip
        label="Select all"
        color="primary"
        onClick={() => props.toggleAll(true)}
        disabled={props.disabled}
      />
      <StyledChip
        label="Select none"
        onClick={() => props.toggleAll(false)}
        disabled={props.disabled}
      />
    </ChipWrapper>
  </>
);

export default SelectAllOrNoneBtns;
