import React from 'react';
import PlayAndPauseButton from './UI/Buttons/PlayAndPauseBtn';
import SideDrawer from './UI/SideDrawer';
import TimeLine from './UI/TimeLine/TimeLine';
import MarkBtn from './UI/Buttons/MarkBtn';
import ZoomBar from './UI/ZoomBar';
import GridBtn from './UI/Buttons/GridBtn';
import OrtoBtn from './UI/Buttons/OrtoBtn';

const Layout = (props) => {
  console.log('%c [Layout] is rendering', 'background: #111; color: #ebd31c');
  return (
    <>
      <MarkBtn />
      <PlayAndPauseButton />
      <SideDrawer />
      <TimeLine />
      <ZoomBar />
      <GridBtn />
      <OrtoBtn />
    </>
  );
};

export default Layout;
