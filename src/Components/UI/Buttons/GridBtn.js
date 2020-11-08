import IconButton from '@material-ui/core/IconButton';
import GridOnIcon from '@material-ui/icons/GridOn';
import React from 'react';
import { useModeStore } from '../../../Store';

const GridBtn = () => {
  const gridMode = useModeStore((state) => state.gridMode);
  const toggleGridMode = useModeStore((state) => state.toggleGridMode);

  console.log('%c [GridBtn is rendering', 'background: #111; color: #ebd31c');

  const ButtonStyle = {
    backgroundColor: gridMode ? '#aaa' : '#fff',
    width: '50px',
    height: '50px',
  };

  return (
    <IconButton
      aria-label="Play"
      style={ButtonStyle}
      onClick={() => toggleGridMode()}
    >
      <GridOnIcon />
    </IconButton>
  );
};

export default GridBtn;
