import IconButton from "@material-ui/core/IconButton";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import React, { useState } from "react";
import {
  useModeStore,
  useTimelineOptionsStore,
  useTimeStore,
} from "../../../Store";
import SnackbarPopup from "../SnackbarPopup";

const ButtonStyle = {
  color: "#E8E8E8",
  padding: 0,
};

const ICON_SIZE = 18;
const SPEED_INCREMENT = 0.000005;

const MiniFastForwardBtn = (props) => {
  const [snackbar, setSnackbar] = useState(false);
  const markMode = useModeStore((state) => state.markMode);
  const [speed, setSpeed, defaultSpeed] = useTimeStore((state) => [
    state.speed,
    state.setSpeed,
    state.defaultSpeed,
  ]);
  const showSnackbar = useTimelineOptionsStore((state) => state.showSnackbar);

  console.log(
    "%c [MiniFastForwardBtn] is rendering",
    "background: #111; color: #ebd31c"
  );

  const handleClick = () => {
    // Show snackbar message
    setSnackbar(true);

    if (props.forward)
      setSpeed(
        speed + SPEED_INCREMENT * (speed + SPEED_INCREMENT === 0 ? 2 : 1)
      );
    else
      setSpeed(
        speed - SPEED_INCREMENT * (speed - SPEED_INCREMENT === 0 ? 2 : 1)
      );
  };

  // Format speed into format
  const formatSpeed = (speed) => {
    return "Playback rate: " + (speed / defaultSpeed).toFixed(2) + "x";
  };

  let transform = "";
  if (!props.forward) transform = "rotate(180deg)";

  const ICON_STYLE = {
    fontSize: props.iconSize || ICON_SIZE - 2,
    transform: transform,
  };

  return (
    <>
      {showSnackbar && (
        <div style={{ position: "absolute" }}>
          <SnackbarPopup
            message={formatSpeed(speed)}
            open={snackbar}
            setOpen={setSnackbar}
          />
        </div>
      )}
      <IconButton
        aria-label="Play"
        style={ButtonStyle}
        onClick={handleClick}
        disabled={markMode}
      >
        <DoubleArrowIcon style={ICON_STYLE} />
      </IconButton>
    </>
  );
};

export default MiniFastForwardBtn;
