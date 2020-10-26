import React from "react";
import GridBtn from "./UI/Buttons/GridBtn";
import MarkBtn from "./UI/Buttons/MarkBtn";
import OrtoBtn from "./UI/Buttons/OrtoBtn";
import SideDrawer from "./UI/SideDrawer/SideDrawer";
import TimeLine from "./UI/TimeLine/TimeLine";
import ZoomBar from "./UI/ZoomBar";

const Layout = (props) => {
  console.log("%c [Layout] is rendering", "background: #111; color: #ebd31c");
  return (
    <>
      <MarkBtn />
      {/* <PlayAndPauseButton /> */}
      <SideDrawer />
      <TimeLine />
      <ZoomBar />
      <GridBtn />
      <OrtoBtn />
    </>
  );
};

export default Layout;
