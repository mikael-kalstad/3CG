import IconButton from "@material-ui/core/IconButton";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import React from "react";
import { useModeStore, useTimeStore } from "../../../Store";

const ButtonStyle = {
  color: "#E8E8E8",
  padding: 0,
};

const ICON_SIZE = 18;
const SPEED_INCREMENT = 0.03;

const MiniFastForwardBtn = (props) => {
  const markMode = useModeStore((state) => state.markMode);
  const [speed, setSpeed] = useTimeStore((state) => [
    state.speed,
    state.setSpeed,
  ]);

  console.log(
    "%c [MiniFastForwardBtn] is rendering",
    "background: #111; color: #ebd31c"
  );

  const handleClick = () => {
    if (props.forward) setSpeed(speed + SPEED_INCREMENT);
    else if (speed - SPEED_INCREMENT > 0) setSpeed(speed - SPEED_INCREMENT);
  };

  let transform = "";
  if (!props.forward) transform = "rotate(180deg)";

  const ICON_STYLE = {
    fontSize: props.iconSize || ICON_SIZE - 2,
    transform: transform,
  };

  return (
    <IconButton
      aria-label="Play"
      style={ButtonStyle}
      onClick={handleClick}
      disabled={markMode | !props.forward && speed - SPEED_INCREMENT > 0}
    >
      <DoubleArrowIcon style={ICON_STYLE} />
    </IconButton>
  );
};

export default MiniFastForwardBtn;
