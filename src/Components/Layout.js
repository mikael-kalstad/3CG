import React from 'react';
import styled from 'styled-components';
import PlayAndPauseButton from './UI/Buttons/PlayAndPauseBtn';
import MarkBtn from './UI/Buttons/MarkBtn';
import SideDrawer from './UI/SideDrawer';

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
  </>
);

export default Layout;
