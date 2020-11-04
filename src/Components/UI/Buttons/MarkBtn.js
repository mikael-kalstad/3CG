import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import NoteIcon from '@material-ui/icons/Note';
import { useModeStore } from '../../../Store';

const MarkBtn = () => {
  const markMode = useModeStore((state) => state.markMode);
  const toggleMarkMode = useModeStore((state) => state.toggleMarkMode);

  console.log('%c [MarkBtn] is rendering', 'background: #111; color: #ebd31c');

  const ButtonStyle = {
    backgroundColor: markMode ? '#aaa' : '#fff',
    width: '50px',
    height: '50px',
  };

  return (
    <IconButton
      aria-label="Play"
      style={ButtonStyle}
      onClick={() => {
        toggleMarkMode();
      }}
    >
      <NoteIcon />
    </IconButton>
  );
};

export default MarkBtn;
