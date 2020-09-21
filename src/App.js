import React, { useState } from "react";
import styled from "styled-components";
import Scene from "./Components/Scene";
import Layout from "./Components/Layout";

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const App = () => {
  const [play, setPlay] = useState(false);

  return (
    <Wrapper>
      <Scene play={play} />
      <Layout play={play} setPlay={setPlay} />
    </Wrapper>
  );
};

export default App;
