import React from "react";
import styled from "styled-components";
import PlayAndPauseButton from "./Buttons/PlayAndPauseBtn";

const Wrapper = styled.div`
  position: absolute;
  z-index: 1000;
  top: 0;
`;

const Layout = (props) => (
  <>
    <PlayAndPauseButton play={props.play} setPlay={props.setPlay} />
  </>
);

export default Layout;
