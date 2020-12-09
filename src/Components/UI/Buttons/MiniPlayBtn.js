import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React from 'react';
import { useModeStore } from '../../../Store';
import Tooltip from '@material-ui/core/Tooltip';

const ButtonStyle = {
  fontSize: 12,
  color: '#92BD6C',
  padding: 0,
};

const ICON_SIZE = 18;

const MiniPlayBtn = (props) => {
  const playMode = useModeStore((state) => state.playMode);
  const togglePlayMode = useModeStore((state) => state.togglePlayMode);
  const markMode = useModeStore((state) => state.markMode);

  return (
    <Tooltip title={playMode ? 'Pause' : 'Play'} placement='top'>
      <IconButton
        aria-label='Play'
        style={ButtonStyle}
        onClick={() => togglePlayMode()}
        disabled={markMode}
      >
        {playMode ? (
          <PauseIcon style={{ fontSize: props.iconSize || ICON_SIZE }} />
        ) : (
          <PlayArrowIcon style={{ fontSize: props.iconSize || ICON_SIZE }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default MiniPlayBtn;
