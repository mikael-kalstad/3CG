import React, { useRef, useEffect, useState } from 'react';
import {
  useInspectStore,
  useChannelStore,
  useMousePositionStore,
  useTimeStore,
} from '../../../Store';
import { dataService } from '../../../Services/DataService';
import styled, { keyframes } from 'styled-components';

import CrossBtn from '../Buttons/CrossBtn';
import Tooltip from '@material-ui/core/Tooltip';

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
  background-color: white;
  border-radius: 0px 10px 10px 0px;
  padding: 5px 10px 5px 20px;
  top: 20px;
`;
const UpperWrapper = styled.div`
  height: 45px;
  display: grid;
  align-items: center;
  grid-gap: 15px;
`;

const LowerWrapper = styled.div``;
const Text = styled.p`
  font-size: 20px;
  grid-row: 1;
  margin: 0;
  padding: 0;
  align-items: center;
`;

const TimeText = styled.p`
  font-size: 15px;
  color: #75787d;
  grid-row: 1;
  margin: 0;
  padding: 0;
  align-items: center;
`;

const InfoText = styled.p`
  font-size: 12px;
  color: #75787d;
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

  const [timeValue, setTimeValue] = useState(0);
  const [voltValue, setVoltValue] = useState(0);

  const inspected = useInspectStore((state) => state.inspected);
  const setInspected = useInspectStore((state) => state.setInspected);
  const currentlyHovering = useInspectStore((state) => state.currentlyHovering);

  const setActiveChannels = useChannelStore((state) => state.setActiveChannels);
  const activeChannelsPlaceholder = useChannelStore(
    (state) => state.activeChannelsPlaceholder
  );
  const activeChannelsRef = useRef(useChannelStore.getState().activeChannels);

  const startTime = useTimeStore((state) => state.startTime);

  const [xPos, setxPos, yPos, setyPos] = useMousePositionStore((state) => [
    state.xPos,
    state.setxPos,
    state.yPos,
    state.setyPos,
  ]);

  useEffect(() => {
    useChannelStore.subscribe(
      (activeChannels) => (activeChannelsRef.current = activeChannels),
      (state) => state.activeChannels
    );
  }, []);

  useEffect(() => {
    if (inspected !== -1) {
      setShouldRender(true);
    }
  }, [inspected]);

  useEffect(() => {
    setTimeValue(xPos * 0.005 + startTime);
    setVoltValue(yPos * 0.01);
  }, [xPos, yPos]);

  const cancelInspection = () => {
    setCanceled(true); // Trigger slideOut animation
    setActiveChannels(activeChannelsPlaceholder);
    setTimeout(() => {
      /* After slideOut animation is done (400ms), reset states */
      setInspected(-1);
      setShouldRender(false);
      setCanceled(false);

      /* Reset mouse position */
      setxPos(0);
      setyPos(0);
    }, 400);
  };

  let inspectedChannel = dataService.getChannelNamesArray()[inspected];
  return (
    <>
      {shouldRender && (
        <Wrapper animateOut={canceled}>
          <UpperWrapper>
            <Text>Inspecting: {inspectedChannel}</Text>
            <Tooltip title='Quit inspection'>
              <IconWrapper>
                <CrossBtn onClick={cancelInspection} />
              </IconWrapper>
            </Tooltip>
          </UpperWrapper>
          <LowerWrapper>
            {!currentlyHovering ? (
              <InfoText>Hover the wave to see values</InfoText>
            ) : (
              <>
                <TimeText>{timeValue.toFixed(2)}s</TimeText>
                <Text>{voltValue.toFixed(3)} mV </Text>
              </>
            )}
          </LowerWrapper>
        </Wrapper>
      )}
    </>
  );
};

export default InspectedText;
