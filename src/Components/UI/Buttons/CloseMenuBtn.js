import React from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Button from '@material-ui/core/Button';

const CloseMenuBtn = (props) => {
  const ButtonStyle = {
    width: '20px',
    borderRadius: '0px',
  };
  return (
    <Button style={ButtonStyle} onClick={props.onClick}>
      <CloseRoundedIcon style={{ fontSize: '40px', opacity: 0.7 }} />
    </Button>
  );
};

export default CloseMenuBtn;
