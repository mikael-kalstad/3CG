import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import styled from "styled-components";

const StyledChip = styled(Chip)`
  justify-content: "center";
  flex-wrap: "wrap";
  width: 100%;
`;

const ChipWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  grid-gap: 10px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  chip: {
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const CheckList = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Channels</FormLabel>
        <FormGroup>
          {props.channelState.map((state, i) => (
            <FormControlLabel
              key={props.channelNames[i]}
              control={
                <Checkbox
                  checked={state}
                  onChange={() => props.toggleChannel(i)}
                  name={props.channelNames[i]}
                />
              }
              label={props.channelNames[i]}
            />
          ))}
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>

        {/* Buttons with select all or none functionality */}
        <ChipWrapper>
          <StyledChip
            label="Select all"
            color="primary"
            onClick={() => props.toggleAllChannels(true)}
          />
          <StyledChip
            label="Select none"
            onClick={() => props.toggleAllChannels(false)}
          />
        </ChipWrapper>
      </FormControl>
    </div>
  );
};

export default CheckList;
