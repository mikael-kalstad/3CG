import React from 'react';
import { useInspectStore } from '../../Store';
import { dataService } from '../../Services/DataService';
import styled, { keyframes } from 'styled-components';

import CancelInspectionButton from './Buttons/CancelInspectionBtn';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%)
  }
`;

const Wrapper = styled.div`
  animation ${slideIn} 0.5s ease; 
  position: absolute;
  height: 50px;
  top: 20px;
  padding: 5px 5px 5px 20px;
  background-color: white;
  border-radius: 0px 10px 10px 0px;
  display: grid;
  align-items: center;
  grid-gap: 20px;
`;

const Text = styled.div`
  font-size: 20px;
  grid-row: 1;
  display: grid;
  align-items: center;
`;

const IconWrapper = styled.div`
  grid-row: 1;
`;

const InfoText = (props) => {
  const inspected = useInspectStore((state) => state.inspected);

  let inspectedChannel = dataService.getChannelNamesArray()[inspected];
  return (
    <>
      {inspectedChannel && (
        <Wrapper>
          <Text>Inspecting: {inspectedChannel}</Text>
          <IconWrapper>
            <CancelInspectionButton />
          </IconWrapper>
        </Wrapper>
      )}
    </>
  );
};

export default InfoText;
