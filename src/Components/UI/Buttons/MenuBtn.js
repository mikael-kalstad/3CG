import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

const ButtonStyle = {
  backgroundColor: '#fff',
  width: '50px',
  height: '50px',
  top: '20px',
  right: '20px',
  position: 'absolute',
};

const MenuBtn = (props) => {
  return (
    <Tooltip title='Open menu'>
      <IconButton
        aria-label='Open menu'
        style={ButtonStyle}
        onClick={() => props.onClick()}
      >
        <MenuIcon />
      </IconButton>
    </Tooltip>
  );
};

export default MenuBtn;
