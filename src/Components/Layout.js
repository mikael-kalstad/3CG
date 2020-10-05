import React from "react";
import PlayAndPauseButton from "./UI/Buttons/PlayAndPauseBtn";
import SideDrawer from "./UI/SideDrawer";
import TimeLine from "./UI/TimeLine";
import MarkBtn from "./UI/Buttons/MarkBtn";

const Layout = (props) => {
  console.log("%c [Layout] is rendering", "background: #111; color: #ebd31c");
  return (
    <>
      <MarkBtn />
      <PlayAndPauseButton />
      <SideDrawer />
      <TimeLine />
      {/* <ZoomBar setZoom={props.setZoom} zoom={props.zoom} /> */}
    </>
  );
};

export default Layout;
