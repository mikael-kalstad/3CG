import React from 'react';
import AddAnnotationContainer from './AddAnnotationContainer';
import InspectedText from './ChannelInspection/InspectedText';
import SideDrawer from './SideDrawer/SideDrawer';
import TimeLine from './TimeLine/TimeLine';
import ToolBar from './ToolBar';
import ZoomBar from './Zooming/ZoomBar';
import GlobalSnackbar from './Snackbars/GlobalSnackbar';

const Layout = (props) => {
  return (
    <>
      <SideDrawer />
      <TimeLine />
      <ZoomBar />

      <InspectedText />
      <ToolBar />

      {/* Container for adding annotation logic with popups and dialog */}
      <AddAnnotationContainer />

      {/* Only one snackbar should be rendered, GlobalSnackbar takes care of this logic */}
      <GlobalSnackbar />
    </>
  );
};

export default Layout;
