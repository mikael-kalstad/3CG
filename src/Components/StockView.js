import React, { useRef, useEffect, useState } from 'react';
import { useInspectStore, useChannelStore, useMousePositionStore, useTimeStore } from '../Store';
import { dataService } from '../Services/DataService';
import styled, { keyframes } from 'styled-components';


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
  height: 90px;
  top: 80px;
  padding: 5px 10px 5px 20px;
  background-color: white;
  border-radius: 0px 10px 10px 0px;
  display: grid;
  align-items: center;
  grid-gap: 15px;
`;

const Text = styled.p`
  font-size: 20px;
  grid-row: 2;
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


const StockView = (props) => {
  const [canceled] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const inspected = useInspectStore((state) => state.inspected);
  const activeChannelsRef = useRef(useChannelStore.getState().activeChannels);

  const startTime = useTimeStore((state) => state.startTime);

  const xPos = useMousePositionStore((state) => state.xPos);
  const yPos = useMousePositionStore((state) => state.yPos);

  const timeValue = Number((xPos * 0.005) + startTime).toFixed(2)
  const voltValue = Number(yPos * 0.01).toFixed(3)

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

  return (
    <>
      {shouldRender && (
        <Wrapper animateOut={canceled}>
          <TimeText>{timeValue}s</TimeText>
          <Text>{voltValue} mV </Text>
        </Wrapper>
      )}
    </>
  );
};

export default StockView;
