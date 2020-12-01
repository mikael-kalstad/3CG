import React from 'react';
import styled from 'styled-components';

import MarkBtn from './Buttons/MarkBtn';

import GridBtn from './Buttons/GridBtn';
import OrtoBtn from './Buttons/OrtoBtn';

const Wrapper = styled.div`
  position: absolute;
  display: grid;
  grid-auto-flow: row;
  top: 0px;
  right: 90px;
  height: 60px;
  padding: 20px 10px 0px 10px;
  border-radius: 0px 0px 8px 8px;
  background-color: #eeeeee;
  grid-gap: 0px;
`;

const Text = styled.div`
  align-self: center;
  text-align: center;
  font-size: 15px;
  color: grey;
  margin: 0;
  padding: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  padding-top: 0px;
`;

const ToolBar = () => {
  return (
    <Wrapper>
      <Grid>
        <MarkBtn />
        <GridBtn />
        <OrtoBtn />
      </Grid>
    </Wrapper>
  );
};

export default ToolBar;
