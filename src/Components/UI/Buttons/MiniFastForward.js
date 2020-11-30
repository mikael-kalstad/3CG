import IconButton from '@material-ui/core/IconButton';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import React from 'react';
import {
  useModeStore,
  useTimelineOptionsStore,
  useTimeStore,
  useSnackbarStore,
} from '../../../Store';
import SnackbarPopup from '../Snackbars/SnackbarPopup';

const ButtonStyle = {
  color: '#E8E8E8',
  padding: 0,
};

// Constants
const ICON_SIZE = 18;
const SPEED_INCREMENT = 0.000005;

const MiniFastForwardBtn = (props) => {
  const markMode = useModeStore((state) => state.markMode);
  const setSnackbar = useSnackbarStore((state) => state.setSnackbar);
  const [speed, setSpeed, defaultSpeed] = useTimeStore((state) => [
    state.speed,
    state.setSpeed,
    state.defaultSpeed,
  ]);
  const showSnackbar = useTimelineOptionsStore((state) => state.showSnackbar);

  // Format speed into format
  const formatSpeed = (speed) => {
    return 'Playback rate: ' + (speed / defaultSpeed).toFixed(2) + 'x';
  };

  const handleClick = () => {
    // Reset global snackbar since there may be an active snackbar
    setSnackbar(null);

    let snackbar = (
      <SnackbarPopup message={formatSpeed(speed)} timeout={2500} type='info' />
    );

    // Show snackbar message
    if (showSnackbar) setSnackbar(snackbar);

    if (props.forward)
      setSpeed(
        speed + SPEED_INCREMENT * (speed + SPEED_INCREMENT === 0 ? 2 : 1)
      );
    else
      setSpeed(
        speed - SPEED_INCREMENT * (speed - SPEED_INCREMENT === 0 ? 2 : 1)
      );
  };

  let transform = '';
  if (!props.forward) transform = 'rotate(180deg)';

  const ICON_STYLE = {
    fontSize: props.iconSize || ICON_SIZE - 2,
    transform: transform,
  };

  return (
    <>
      <IconButton
        aria-label='Play'
        style={ButtonStyle}
        onClick={handleClick}
        disabled={markMode}
      >
        <DoubleArrowIcon style={ICON_STYLE} />
      </IconButton>
    </>
  );
};

export default MiniFastForwardBtn;
