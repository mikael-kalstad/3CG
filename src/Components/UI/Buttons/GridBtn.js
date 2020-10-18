import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import GridOnIcon from '@material-ui/icons/GridOn';
import { useModeStore } from '../../../Store';

const GridBtn = () => {
    const ortoMode = useModeStore((state) => state.ortoMode);
    const toggleOrtoMode = useModeStore((state) => state.toggleOrtoMode);

    console.log('%c [GridBtn is rendering', 'background: #111; color: #ebd31c');

    const ButtonStyle = {
        backgroundColor: ortoMode ? '#aaa' : '#fff',
        width: '50px',
        height: '50px',
        top: '20px',
        right: '140px',
        position: 'absolute',
    };

    return (
        <IconButton
            aria-label="Play"
            style={ButtonStyle}
            onClick={() => {
                toggleOrtoMode();
                console.log(ortoMode);
            }}
        >
            <GridOnIcon />
        </IconButton>
    );
};

export default GridBtn;

