import IconButton from "@material-ui/core/IconButton";
import StreetviewIcon from "@material-ui/icons/Streetview";
import React from "react";
import { useModeStore } from "../../../Store";

const OrtoBtn = () => {
  const ortoMode = useModeStore((state) => state.ortoMode);
  const toggleOrtoMode = useModeStore((state) => state.toggleOrtoMode);

  console.log("%c [GridBtn is rendering", "background: #111; color: #ebd31c");

  const ButtonStyle = {
    backgroundColor: ortoMode ? "#aaa" : "#fff",
    width: "50px",
    height: "50px",
    top: "80px",
    right: "140px",
    position: "absolute",
  };

  return (
    <IconButton
      aria-label="Play"
      style={ButtonStyle}
      onClick={() => {
        toggleOrtoMode();
        console.log(ortoMode);
      }}
    >
      <StreetviewIcon />
    </IconButton>
  );
};

export default OrtoBtn;
