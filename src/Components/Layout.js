import React from "react";
import styled from "styled-components";
import PlayAndPauseButton from "./UI/Buttons/PlayAndPauseBtn";
import SideDrawer from "./UI/SideDrawer";
import TimeLine from "./UI/TimeLine";

const Layout = (props) => (
  <>
    <PlayAndPauseButton play={props.play} setPlay={props.setPlay} />
    <SideDrawer
      channelNames={props.channelNames}
      toggleChannel={props.toggleChannel}
      toggleAllChannels={props.toggleAllChannels}
      channelState={props.channelState}
    />
    <TimeLine />
  </>
);

export default Layout;
