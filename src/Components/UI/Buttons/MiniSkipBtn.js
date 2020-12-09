import React, { useEffect, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import { useModeStore, useTimeStore } from '../../../Store';
import { dataService } from '../../../Services/DataService';
import Tooltip from '@material-ui/core/Tooltip';

const DURATION = dataService.getDuration();

const ButtonStyle = {
  fontSize: 'small',
  color: '#E8E8E8',
  padding: 0,
};

const ICON_SIZE = 18;

const MiniSkipBtn = (props) => {
  // Fetch initial time state
  const startTimeRef = useRef(useTimeStore.getState().startTime);
  const endTimeRef = useRef(useTimeStore.getState().endTime);

  // Set methods used when skipping
  const setStartTime = useTimeStore((state) => state.setStartTime);
  const setEndTime = useTimeStore((state) => state.setEndTime);

  // Connect to the store on mount, disconnect on unmount, catch state-changes in a reference
  useEffect(() => {
    useTimeStore.subscribe(
      (startTime) => (startTimeRef.current = startTime),
      (state) => state.startTime
    );

    useTimeStore.subscribe(
      (endTime) => (endTimeRef.current = endTime),
      (state) => state.endTime
    );
  }, []);

  const markMode = useModeStore((state) => state.markMode);

  let SKIP = 1.0;

  const handleClick = () => {
    // Should not be able to skip to negative start time!
    if (!props.forward && startTimeRef.current < SKIP) return;

    // Should not be able to skip past data length
    if (props.forward && endTimeRef.current + SKIP > DURATION) return;

    if (!props.forward) SKIP = -1.0;

    setStartTime(startTimeRef.current + SKIP);
    setEndTime(endTimeRef.current + SKIP);
  };

  const ICON_STYLE = { fontSize: props.iconSize || ICON_SIZE };

  const getText = () => {
    if (props.forward) {
      if (endTimeRef.current + SKIP + 0.05 > DURATION) {
        return '';
      } else {
        return 'Skip forward';
      }
    } else {
      if (startTimeRef.current + 0.05 < SKIP) {
        return '';
      } else {
        return 'Skip backward';
      }
    }
  };

  return (
    <Tooltip title={getText()} placement='top'>
      <IconButton
        aria-label='skip'
        style={ButtonStyle}
        onClick={() => handleClick()}
        disabled={
          markMode || props.forward
            ? endTimeRef.current + SKIP + 0.05 > DURATION
            : startTimeRef.current + 0.05 < SKIP
        }
      >
        {props.forward ? (
          <SkipNextIcon style={ICON_STYLE} />
        ) : (
          <SkipPreviousIcon style={ICON_STYLE} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default MiniSkipBtn;
