import IconButton from '@material-ui/core/IconButton';
import StreetviewIcon from '@material-ui/icons/Streetview';
import React from 'react';
import { useModeStore } from '../../../Store';

const OrtoBtn = () => {
  const ortoMode = useModeStore((state) => state.ortoMode);
  const toggleOrtoMode = useModeStore((state) => state.toggleOrtoMode);

  console.log('%c [GridBtn is rendering', 'background: #111; color: #ebd31c');

  const ButtonStyle = {
    backgroundColor: ortoMode ? '#aaa' : '#fff',
    width: '50px',
    height: '50px',
  };

  return (
    <IconButton
      aria-label="Play"
      style={ButtonStyle}
      onClick={() => toggleOrtoMode()}
    >
      <StreetviewIcon />
    </IconButton>
  );
};

export default OrtoBtn;
