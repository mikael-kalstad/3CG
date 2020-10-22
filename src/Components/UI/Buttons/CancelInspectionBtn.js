import React, { useEffect, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useInspectStore, useChannelStore } from '../../../Store';

const CancelInspectionBtn = () => {
  const setInspected = useInspectStore((state) => state.setInspected);

  const setChannel = useChannelStore((state) => state.setChannel);
  const activeChannelsRef = useRef(useChannelStore.getState().activeChannels);

  useEffect(() => {
    useChannelStore.subscribe(
      (activeChannels) => (activeChannelsRef.current = activeChannels),
      (state) => state.activeChannels
    );
  }, []);

  const cancelInspection = () => {
    setInspected(-1);
    for (let i = 0; i < activeChannelsRef.current.length; i++) {
      setChannel(i, true);
    }
  };
  const ButtonStyle = {
    backgroundColor: '#dddddd',
    width: '50px',
    height: '50px',
  };

  return (
    <IconButton style={ButtonStyle} onClick={cancelInspection}>
      <CloseIcon />
    </IconButton>
  );
};

export default CancelInspectionBtn;
