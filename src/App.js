import React, { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';
import Scene from './Components/Scene';
import Layout from './Components/Layout';
import { formatDataToPoints } from './Scripts/DataConverter';
import { dataService } from './Services/DataService';

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const POINTS_DEFAULT_LENGTH = 500;

// Get points which will be rendered in 3D
let renderPoints = formatDataToPoints(dataService.getJSON());
console.log(renderPoints[0].length, 'length');

// Get names of ecg-channels
let channelNames = dataService.getChannelNamesArray();

const App = () => {
  const [play, setPlay] = useState(false);
  const [channelState, setChannelState] = useState(
    channelNames.map(() => true)
  );
  const [markMode, setMarkMode] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(
    renderPoints[0].length > POINTS_DEFAULT_LENGTH
      ? POINTS_DEFAULT_LENGTH
      : renderPoints[0].length
  );

  const [currTime, setCurrTime] = useState(0);

  useEffect(() => {
    // Update time state every set interval, used to synchronize "play" functin of ecg-waves
    const intervalId = setInterval(() => {
      // Only update time if play state is active
      if (play) {
        setCurrTime((time) => {
          return time + 1;
        });
      }
    }, 500);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [play]);

  let timeProps = {
    startTime: startTime,
    setStartTime: setStartTime,
    endTime: endTime,
    setEndTime: setEndTime,
    currTime: currTime,
    setCurrTime: setCurrTime,
  };

  // Change state of a specific channel based on index
  const toggleChannel = (index) => {
    setChannelState(
      channelState.map((state, i) => (i === index ? !state : state))
    );
  };

  // Change state of all channels
  const toggleAllChannels = (state) => {
    setChannelState(channelNames.map(() => state));
  };

  const toggleMarkMode = () => {
    setMarkMode(!markMode);
  };

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Wrapper>
        <Scene
          play={play}
          renderPoints={renderPoints}
          channelNames={channelNames}
          channelState={channelState}
          markMode={markMode}
          timeProps={timeProps}
        />
        <Layout
          play={play}
          setPlay={setPlay}
          channelNames={channelNames}
          channelState={channelState}
          toggleChannel={toggleChannel}
          toggleAllChannels={toggleAllChannels}
          markMode={markMode}
          toggleMarkMode={toggleMarkMode}
          timeProps={timeProps}
          dataLength={renderPoints[0].length}
        />
      </Wrapper>
    </Suspense>
  );
};

export default App;
