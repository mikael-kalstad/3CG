import React, { Suspense } from 'react';
import styled from 'styled-components';
import RenderView from './Components/CanvasComponents/RenderView';
import Layout from './Components/UI/Layout';
import { useUploadStore } from './Store';

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const App = () => {
  // DO NOT REMOVE LINE UNDER, ENSURES RERENDER ON UPLOAD OF ECG FILE
  const userUploadedECGFile = useUploadStore(
    (state) => state.userUploadedECGFile
  );
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Wrapper>
        <RenderView />
        <Layout />
      </Wrapper>
    </Suspense>
  );
};

export default App;
