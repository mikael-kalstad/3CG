import React from 'react';
import styled from 'styled-components';

import MarkBtn from './Buttons/MarkBtn';

import GridBtn from './Buttons/GridBtn';
import OrtoBtn from './Buttons/OrtoBtn';

const Wrapper = styled.div`
  height: 60px;
  top: 0px;
  right: 90px;
  position: absolute;
  background-color: #eeeeee;

  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;

  padding: 20px 10px 0px 10px;
  border-radius: 0px 0px 8px 8px;
`;

const ToolBar = () => {
  return (
    <Wrapper>
      <MarkBtn />
      <GridBtn />
      <OrtoBtn />
    </Wrapper>
  );
};

export default ToolBar;
