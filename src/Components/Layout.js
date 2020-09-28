import React from "react";
import styled from "styled-components";
import PlayAndPauseButton from "./UI/Buttons/PlayAndPauseBtn";
import SideDrawer from "./UI/SideDrawer";
import TimeLine from "./UI/TimeLine";
import MarkBtn from "./UI/Buttons/MarkBtn";

const Layout = (props) => (
  <>
    <MarkBtn onClick={props.toggleMarkMode} markMode={props.markMode} />
    <PlayAndPauseButton play={props.play} setPlay={props.setPlay} />
    <SideDrawer
      channelNames={props.channelNames}
      toggleChannel={props.toggleChannel}
      toggleAllChannels={props.toggleAllChannels}
      channelState={props.channelState}
    />
    <TimeLine timeProps={props.timeProps} dataLength={props.dataLength} />
  </>
);

export default Layout;
