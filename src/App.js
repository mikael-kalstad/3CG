import React, { useState, Suspense } from 'react';
import styled from 'styled-components';
import Scene from './Components/Scene';
import Layout from './Components/Layout';

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const App = () => {
  const [play, setPlay] = useState(false);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Wrapper>
        <Scene play={play} />
        <Layout play={play} setPlay={setPlay} />
      </Wrapper>
    </Suspense>
  );
};

export default App;
