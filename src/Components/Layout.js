import React from 'react';
import StockView from './StockView';
import AddAnnotationContainer from './UI/AddAnnotationContainer';
import InspectedText from './UI/InspectedText';
import SideDrawer from './UI/SideDrawer/SideDrawer';
import TimeLine from './UI/TimeLine/TimeLine';
import ToolBar from './UI/ToolBar';
import ZoomBar from './UI/Zooming/ZoomBar';

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
