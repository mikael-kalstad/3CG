import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

const ButtonStyle = {
  backgroundColor: "#fff",
  width: "50px",
  height: "50px",
  bottom: "20px",
  left: "20px",
  position: "absolute",
};

const PlayAndPauseBtn = (props) => {
  return (
    <IconButton
      aria-label="Play"
      style={ButtonStyle}
      onClick={() => props.setPlay(!props.play)}
    >
      {props.play ? <PauseIcon /> : <PlayArrowIcon />}
    </IconButton>
  );
};

export default PlayAndPauseBtn;
