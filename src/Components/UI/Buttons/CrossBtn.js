import React, { useEffect, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const CrossBtn = (props) => {
  const ButtonStyle = {
    backgroundColor: '#dddddd',
    width: '40px',
    height: '40px',
  };

  const IconStyle = {
    width: '30px',
    height: '30px',
  };

  return (
    <IconButton style={ButtonStyle} onClick={props.onClick}>
      <CloseIcon style={IconStyle} />
    </IconButton>
  );
};

export default CrossBtn;
