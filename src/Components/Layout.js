import React from 'react';
import PlayAndPauseButton from './UI/Buttons/PlayAndPauseBtn';
import SideDrawer from './UI/SideDrawer';
import TimeLine from './UI/TimeLine';
import MarkBtn from './UI/Buttons/MarkBtn';
import ZoomBar from './UI/ZoomBar';

const Layout = (props) => {
  console.log('%c [Layout] is rendering', 'background: #111; color: #ebd31c');
  return (
    <>
      <MarkBtn />
      <PlayAndPauseButton />
      <SideDrawer />
      <TimeLine />
      {/* <ZoomBar /> */}
    </>
  );
};

export default Layout;
