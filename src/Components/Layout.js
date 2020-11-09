import React from 'react';
import StockView from './StockView';
import AddAnnotationContainer from './UI/AddAnnotationContainer';
import InspectedText from './UI/InspectedText';
import SideDrawer from './UI/SideDrawer/SideDrawer';
import TimeLine from './UI/TimeLine/TimeLine';
import ToolBar from './UI/ToolBar';
import ZoomBar from './UI/Zooming/ZoomBar';
import GlobalSnackbar from './UI/Snackbars/GlobalSnackbar';

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

      {/* Container for adding annotation logic with popups and dialog */}
      <AddAnnotationContainer />

      {/* Only one snackbar should be rendered, GlobalSnackbar takes care of this logic */}
      <GlobalSnackbar />
    </>
  );
};

export default Layout;
