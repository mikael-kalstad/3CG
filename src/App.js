import React, { useState, Suspense } from 'react';
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

// Get points which will be rendered in 3D
let renderPoints = formatDataToPoints(dataService.getJSON());

// Get names of ecg-channels
let channelNames = dataService.getChannelNamesArray();

const App = () => {
  const [play, setPlay] = useState(false);
  const [channelState, setChannelState] = useState(
    channelNames.map(() => true)
  );

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

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Wrapper>
        <Scene
          play={play}
          renderPoints={renderPoints}
          channelNames={channelNames}
          channelState={channelState}
        />
        <Layout
          play={play}
          setPlay={setPlay}
          channelNames={channelNames}
          channelState={channelState}
          toggleChannel={toggleChannel}
          toggleAllChannels={toggleAllChannels}
        />
      </Wrapper>
    </Suspense>
  );
};

export default App;
