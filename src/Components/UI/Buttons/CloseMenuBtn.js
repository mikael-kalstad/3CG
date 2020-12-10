import React from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Button from '@material-ui/core/Button';

const CloseMenuBtn = (props) => {
  const ButtonStyle = {
    width: '15px',
    borderRadius: '0px',
  };
  return (
    <Button style={ButtonStyle} onClick={props.onClick} aria-label='Close menu'>
      <CloseRoundedIcon style={{ fontSize: '30px', opacity: 0.7 }} />
    </Button>
  );
};

export default CloseMenuBtn;
