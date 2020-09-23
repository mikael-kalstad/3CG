import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import MenuBtn from './Buttons/MenuBtn';
import CheckList from './CheckList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  drawerPaper: {
    width: '250px',
  },
}));

const SideDrawer = (props) => {
  const [show, setShow] = useState(false);
  const classes = useStyles();

  // Toggle between showing and hiding menu
  const toggleMenu = () => setShow(!show);

  return (
    <>
      <MenuBtn onClick={toggleMenu} />
      <Drawer
        anchor={'right'}
        open={show}
        onClose={() => toggleMenu()}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {/* <Divider /> */}
        <CheckList
          channelNames={props.channelNames}
          toggleChannel={props.toggleChannel}
          toggleAllChannels={props.toggleAllChannels}
          channelState={props.channelState}
        />
      </Drawer>
    </>
  );
};

export default SideDrawer;
