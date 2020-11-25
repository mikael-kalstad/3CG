import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { dataService } from '../../../Services/DataService';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  background: #444;
  border-radius: 5px 5px 0 0;
  border-bottom: 2px solid white;
`;

const Text = styled.span`
  position: absolute;
  bottom: 15px;
  font-size: 10px;
  font-weight: 600;
  color: white;
  right: ${(props) =>
    (props.duration - props.position) * (100 / props.duration) - 1 + '%'};
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
`;

const LineWrapper = styled.div`
  position: absolute;
  width: calc(100% - 1px);
  bottom: 0;
  white-space: nowrap;
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.duration + props.numOfLinesBetween},
    auto
  );
  grid-template-rows: 1fr;
  align-items: end;
  justify-content: space-between;
`;

const VerticalLine = styled.div`
  display: absolute;
  width: 2px;
  height: ${(props) => (props.withText ? '15px' : '10px')};
  background-color: white;
  border-radius: 5px 5px 0 0;
  vertical-align: bottom;
  bottom: 0;
`;

const VerticalLineWithText = styled.div`
  display: inline-block;
`;

const TimeLineGraph = (props) => {
  const duration = dataService.getDuration();
  const [numOfLinesBetween, setNumOfLinesBetween] = useState(0);

  const handleResize = () => {
    let windowWidth = window.innerWidth;

    if (windowWidth > 1200) setNumOfLinesBetween(4);
    else if (windowWidth > 1000) setNumOfLinesBetween(3);
    else if (windowWidth > 800) setNumOfLinesBetween(2);
    else if (windowWidth > 500) setNumOfLinesBetween(1);
  };

  useEffect(() => {
    // Add eventlistener to on resize to handle smaller and larger width design changes
    window.addEventListener('resize', handleResize);

    // Set intial width
    handleResize();

    // Cleanup on dismount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log(
    '%c [TimeLineGraph] is rendering',
    'background: #111; color: #ebd31c'
  );

  const linspace = (start, end, steps) => {
    let arr = [];
    for (let i = start; i < end; i += (end - start) / (steps - 1)) {
      arr.push(i);
    }
    arr.push(end);
    return arr;
  };
  let steps = duration - 1;
  let numsToDisplay = linspace(1, duration - 1, steps).map((e) => e.toFixed(1));

  let linesBetween = [];

  for (let i = 0; i < numOfLinesBetween; i++)
    linesBetween.push(<VerticalLine key={i} />);

  return (
    <Container>
      <Wrapper>
        <LineWrapper
          numOfLinesBetween={
            numOfLinesBetween * numsToDisplay.length + numOfLinesBetween + 1
          }
          duration={duration}
        >
          <VerticalLineWithText>
            <VerticalLine withText={true} />
          </VerticalLineWithText>
          {numsToDisplay.map((e, i) => (
            <React.Fragment key={i}>
              {linesBetween}
              <VerticalLineWithText>
                <Text position={i + 1} duration={duration}>
                  {e}
                </Text>
                <VerticalLine withText={true} />
              </VerticalLineWithText>
            </React.Fragment>
          ))}
          {linesBetween}
          <VerticalLineWithText>
            <VerticalLine withText={true} />
          </VerticalLineWithText>
        </LineWrapper>
      </Wrapper>
    </Container>
  );
};

export default TimeLineGraph;
