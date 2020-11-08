import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
    <IconButton
      aria-label='Play'
      style={ButtonStyle}
      onClick={() => props.onClick()}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default MenuBtn;
