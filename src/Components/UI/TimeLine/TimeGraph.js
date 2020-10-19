import React, { useState } from 'react';
import styled from 'styled-components';
import { dataService } from '../../../Services/DataService';
import { range } from 'mathjs';
import Popper from '@material-ui/core/Popper';

const duration = dataService.getDuration();

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
`;
const Box = styled.div`
  bottom: -30px;
  position: relative;
  height: 25px;
  background-color: white;
  border-radius: 5px 5px 5px 5px;
  width: 105%;
  margin-left: -2.5%;
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 1;
  grid-column-end: 1;
`;
const Graph = styled.div`
  grid-area: 1/1/1/1;
  bottom: -30px;
  height: 25px;
  display: grid;
  align-items: center;
  position: relative;
`;

const Line = styled.div`
  height: 0px
  width: 20px;
  border-bottom: 1px solid #232323;
  
  
`;

const Text = styled.p`
  background-color: #ffffff;
  left: ${(props) => props.left + 'px'};
  font-family: monospace;
  position: absolute;
  transform: translateX(-50%);
  padding: 0px 3px 0;
  font-size: ${(props) => (13 * 12) / Math.max(props.intervals, 11) + 'px'};
`;

const TimeGraph = (props) => {
  const linspace = (start, end, steps) => {
    let arr = [];
    for (let i = start; i < end; i += (end - start) / (steps - 1)) {
      arr.push(i);
    }
    arr.push(end);
    return arr;
  };
  let numsToDisplay = linspace(0, duration, props.intervals).map((e) =>
    e.toFixed(2)
  );
  return (
    <Wrapper>
      <Box></Box>
      <Graph>
        <Line></Line>
        {numsToDisplay.map((e) => (
          <Text left={e / props.ratio} intervals={props.intervals}>
            {e + 's'}
          </Text>
        ))}
      </Graph>
    </Wrapper>
  );
};

export default TimeGraph;
