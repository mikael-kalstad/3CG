import React from 'react';
import PlayAndPauseButton from './UI/Buttons/PlayAndPauseBtn';
import SideDrawer from './UI/SideDrawer/SideDrawer';
import TimeLine from './UI/TimeLine/TimeLine';
import MarkBtn from './UI/Buttons/MarkBtn';
import ZoomBar from './UI/Zooming/ZoomBar';
import GridBtn from './UI/Buttons/GridBtn';
import OrtoBtn from './UI/Buttons/OrtoBtn';
import InspectedText from './UI/InspectedText';
import StockView from './StockView';
import ToolBar from './UI/ToolBar';

const Layout = (props) => {
  console.log('%c [Layout] is rendering', 'background: #111; color: #ebd31c');
  return (
    <>
      
      <SideDrawer />
      <TimeLine />
      <ZoomBar />
      
      <InspectedText />
      <StockView />
      <ToolBar />
    </>
  );
};

export default Layout;
