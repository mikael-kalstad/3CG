import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SpaceBar from '@material-ui/icons/SpaceBar';
import { useModeStore } from '../../../Store';

const MarkBtn = () => {
  const markMode = useModeStore((state) => state.markMode);
  const toggleMarkMode = useModeStore((state) => state.toggleMarkMode);
  const toggleInspectMode = useModeStore((state) => state.toggleInspectMode);
  const inspectMode = useModeStore((state) => state.inspectMode);

  console.log('%c [MarkBtn] is rendering', 'background: #111; color: #ebd31c');

  const ButtonStyle = {
    backgroundColor: markMode ? '#aaa' : '#fff',
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
      onClick={() => {
        toggleMarkMode();
        toggleInspectMode();
        console.log(inspectMode);
      }}
    >
      <SpaceBar />
    </IconButton>
  );
};

export default MarkBtn;
