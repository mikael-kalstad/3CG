import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

const CrossBtn = (props) => {
  const ButtonStyle = {
    backgroundColor: '#dddddd',
    width: '40px',
    height: '40px',
  };

  const IconStyle = {
    width: '27px',
    height: '27px',
  };

  return (
    <IconButton style={ButtonStyle} onClick={props.onClick}>
      <CloseIcon style={IconStyle} />
    </IconButton>
  );
};

export default CrossBtn;
