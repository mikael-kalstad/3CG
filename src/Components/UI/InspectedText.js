import React, { useRef, useEffect, useState } from 'react';
import { useInspectStore, useChannelStore } from '../../Store';
import { dataService } from '../../Services/DataService';
import styled, { keyframes } from 'styled-components';

import CrossBtn from './Buttons/CrossBtn';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%)
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0%)
  }
  to {
    transform: translateX(-100%)
  }
`;

const Wrapper = styled.div`
  animation: ${(props) => (props.animateOut ? slideOut : slideIn)} 0.4s ease;
  position: absolute;
  height: 45px;
  top: 20px;
  padding: 5px 10px 5px 20px;
  background-color: white;
  border-radius: 0px 10px 10px 0px;
  display: grid;
  align-items: center;
  grid-gap: 15px;
`;

const Text = styled.p`
  font-size: 20px;
  grid-row: 1;
  margin: 0;
  padding: 0;
  align-items: center;
`;

const IconWrapper = styled.div`
  grid-row: 1;
`;

const InspectedText = (props) => {
  const [canceled, setCanceled] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const inspected = useInspectStore((state) => state.inspected);
  const setInspected = useInspectStore((state) => state.setInspected);

  const setChannel = useChannelStore((state) => state.setChannel);
  const activeChannelsRef = useRef(useChannelStore.getState().activeChannels);

  useEffect(() => {
    useChannelStore.subscribe(
      (activeChannels) => (activeChannelsRef.current = activeChannels),
      (state) => state.activeChannels
    );
  }, []);

  useEffect(() => {
    if (inspected != -1) {
      setShouldRender(true);
    }
  }, [inspected]);

  const cancelInspection = () => {
    setCanceled(true); // Trigger slideOut animation
    for (let i = 0; i < activeChannelsRef.current.length; i++) {
      setChannel(i, true);
    }
    setTimeout(() => {
      /* After slideOut animation is done (400ms), reset states */
      setInspected(-1);
      setShouldRender(false);
      setCanceled(false);
    }, 400);
  };

  let inspectedChannel = dataService.getChannelNamesArray()[inspected];
  return (
    <>
      {shouldRender && (
        <Wrapper animateOut={canceled}>
          <Text>Inspecting: {inspectedChannel}</Text>
          <IconWrapper>
            <CrossBtn onClick={cancelInspection} />
          </IconWrapper>
        </Wrapper>
      )}
    </>
  );
};

export default InspectedText;
