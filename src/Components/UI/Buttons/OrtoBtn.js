import IconButton from '@material-ui/core/IconButton';
import StreetviewIcon from '@material-ui/icons/Streetview';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { useModeStore } from '../../../Store';

const OrtoBtn = () => {
  const ortoMode = useModeStore((state) => state.ortoMode);
  const toggleOrtoMode = useModeStore((state) => state.toggleOrtoMode);

  console.log('%c [OrtoBtn is rendering', 'background: #111; color: #ebd31c');

  const ButtonStyle = {
    backgroundColor: ortoMode ? '#aaa' : '#fff',
    width: '50px',
    height: '50px',
    boxShadow: '3px 3px 21px 0px rgba(150,150,150,1)',
  };

  return (
    <Tooltip title='Toggle orthographic view'>
      <IconButton
        aria-label='Play'
        style={ButtonStyle}
        onClick={() => toggleOrtoMode()}
      >
        <img src='orthographic.svg' style={{ width: '25px' }} />
      </IconButton>
    </Tooltip>
  );
};

export default OrtoBtn;
