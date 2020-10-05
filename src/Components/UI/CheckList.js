import React from "react";
import { useChannelStore } from "../../Store";
import { dataService } from "../../Services/DataService";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import styled from "styled-components";

const channelNames = dataService.getChannelNamesArray();

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

const CheckList = () => {
  const [
    activeChannels,
    toggleChannel,
    toggleAllChannels,
  ] = useChannelStore((state) => [
    state.activeChannels,
    state.toggleChannel,
    state.toggleAllChannels,
  ]);
  const classes = useStyles();

  console.log(
    "%c [Checlist] is rendering (sideDrawer child)",
    "background: #111; color: #ebd31c"
  );

  console.log("activechannels in chechlist", activeChannels);

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Channels</FormLabel>
        <FormGroup>
          {activeChannels.map((state, i) => (
            <FormControlLabel
              key={channelNames[i]}
              control={
                <Checkbox
                  checked={state}
                  onChange={() => toggleChannel(i)}
                  name={channelNames[i]}
                />
              }
              label={channelNames[i]}
            />
          ))}
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>

        {/* Buttons with select all or none functionality */}
        <ChipWrapper>
          <StyledChip
            label="Select all"
            color="primary"
            onClick={() => toggleAllChannels(true)}
          />
          <StyledChip
            label="Select none"
            onClick={() => toggleAllChannels(false)}
          />
        </ChipWrapper>
      </FormControl>
    </div>
  );
};

export default CheckList;
