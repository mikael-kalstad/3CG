import React from 'react';
import StockView from './StockView';
import GridBtn from './UI/Buttons/GridBtn';
import MarkBtn from './UI/Buttons/MarkBtn';
import OrtoBtn from './UI/Buttons/OrtoBtn';
import InspectedText from './UI/InspectedText';
import SideDrawer from './UI/SideDrawer/SideDrawer';
import TimeLine from './UI/TimeLine/TimeLine';
import ZoomBar from './UI/Zooming/ZoomBar';
import AddAnnotationContainer from './UI/AddAnnotationContainer';
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
      <AddAnnotationContainer />
      <ToolBar />
    </>
  );
};

export default Layout;
