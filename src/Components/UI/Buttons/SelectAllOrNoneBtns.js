import Chip from "@material-ui/core/Chip";
import FormHelperText from "@material-ui/core/FormHelperText";
import React from "react";
import styled from "styled-components";

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
    <FormHelperText>Toogle all {props.type} on/off</FormHelperText>
    <ChipWrapper>
      <StyledChip
        label="Select all"
        color="primary"
        onClick={() => props.toggleAll(true)}
      />
      <StyledChip label="Select none" onClick={() => props.toggleAll(false)} />
    </ChipWrapper>
  </>
);

export default SelectAllOrNoneBtns;
