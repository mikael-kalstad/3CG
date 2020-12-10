import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import styled from 'styled-components';
import AddAnnotationPopup from '../AddAnnotationPopup';
const Wrapper = styled.div``;

const PlusButton = styled.div`
  &:hover {
    cursor: pointer;
  }
  display: grid;
  align-content: center;
  place-items: center;
  background-color: #3f51b5;
  color: #eeeeee;
  justify-content: center;

  border-radius: 10px;
  text-align: center;
  transition: ease 0.4s;
`;

const ButtonText = styled.div`
  ${PlusButton}:hover & {
    opacity: 1;
    height: 33px;
  }
  opacity: 0;
  height: 0px;
  font-size: 20px;
  transition: ease 0.25s;
`;

const AddAnnotation = () => {
  const [displayPopup, setDisplayPopup] = useState(false);

  const togglePopup = () => setDisplayPopup((currentState) => !currentState);

  return (
    <Wrapper>
      <PlusButton
        alt='add annotation'
        onClick={togglePopup}
        aria-label='Add annotation'
      >
        <AddIcon
          style={{
            transition: 'ease 0.4s',
            fontSize: '3vw',
            alignSelf: 'center',
          }}
        />
        <ButtonText>Add Annotation</ButtonText>
      </PlusButton>

      {displayPopup && <AddAnnotationPopup onClose={togglePopup} />}
    </Wrapper>
  );
};

export default AddAnnotation;
