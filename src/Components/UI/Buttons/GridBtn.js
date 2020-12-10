import IconButton from '@material-ui/core/IconButton';
import GridOnIcon from '@material-ui/icons/GridOn';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { useModeStore } from '../../../Store';

const GridBtn = () => {
  const gridMode = useModeStore((state) => state.gridMode);
  const toggleGridMode = useModeStore((state) => state.toggleGridMode);

  const ButtonStyle = {
    backgroundColor: gridMode ? '#aaa' : '#fff',
    width: '50px',
    height: '50px',
    boxShadow: '3px 3px 21px 0px rgba(150,150,150,1)',
  };

  return (
    <Tooltip title='Toggle grid'>
      <IconButton
        aria-label='Toggle grid'
        style={ButtonStyle}
        onClick={() => toggleGridMode()}
      >
        <GridOnIcon />
      </IconButton>
    </Tooltip>
  );
};

export default GridBtn;
