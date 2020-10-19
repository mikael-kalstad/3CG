import React, { useState } from 'react';
import styled from 'styled-components';
import { dataService } from '../../../Services/DataService';
import { range } from 'mathjs';
import Popper from '@material-ui/core/Popper';

const duration = dataService.getDuration();

const Wrapper = styled.div`
  bottom: -30px;
  height: 25px;
  display: grid;
  align-items: center;
  position: relative;
  background-color: white;
  border-radius: 5px;
`;

const Line = styled.div`
  height: 0px
  width: 20px;
  border-bottom: 1px solid #232323;
  
  
`;

const Text = styled.div`
  background-color: #ffffff;
  left: ${(props) => props.left + 'px'};
  font-family: monospace;
  position: absolute;
  transform: translateX(-50%);
  padding: 0px 3px 0;
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
      <Line></Line>
      {numsToDisplay.map((e) => (
        <Text left={e / props.ratio}>{e + 's'}</Text>
      ))}
    </Wrapper>
  );
};

export default TimeGraph;
