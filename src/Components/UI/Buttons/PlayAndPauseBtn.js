import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React from 'react';
import { useModeStore } from '../../../Store';

const ButtonStyle = {
  backgroundColor: '#fff',
  width: '50px',
  height: '50px',
  bottom: '20px',
  left: '20px',
  position: 'absolute',
};

const PlayAndPauseBtn = () => {
  const playMode = useModeStore((state) => state.playMode);
  const togglePlayMode = useModeStore((state) => state.togglePlayMode);
  const markMode = useModeStore((state) => state.markMode);

  return (
    <IconButton
      aria-label='Play'
      style={ButtonStyle}
      onClick={() => togglePlayMode()}
      disabled={markMode}
    >
      {playMode ? <PauseIcon /> : <PlayArrowIcon />}
    </IconButton>
  );
};

export default PlayAndPauseBtn;
