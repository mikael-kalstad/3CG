import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SpaceBar from '@material-ui/icons/SpaceBar';

const MarkBtn = (props) => {
  const ButtonStyle = {
    backgroundColor: props.markMode ? '#aaa' : '#fff',
    width: '50px',
    height: '50px',
    top: '20px',
    right: '80px',
    position: 'absolute',
  };

  return (
    <IconButton
      aria-label="Play"
      style={ButtonStyle}
      onClick={() => props.onClick()}
    >
      <SpaceBar />
    </IconButton>
  );
};

export default MarkBtn;
