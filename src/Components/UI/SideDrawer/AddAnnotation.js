import Button from '@material-ui/core/Button';
// import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import styled from 'styled-components';
import AddAnnotationPopup from '../AddAnnotationPopup';
import { useAnnotationStore, useMarkStore, useModeStore } from '../../../Store';

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

const MenuWrapper = styled.div`
  margin: 10px 0px 10px 0px;
  display: grid;
  align-content: center;
  grid-gap: 5px;
`;

const AddAnnotation = () => {
  // const [showInputs, setShowInputs] = useState(false);
  const [buttonTextShow, setButtonTextShow] = useState(false);
  // const [codeInput, setCodeInput] = useState('');
  // const [textInput, setTextInput] = useState('');
  // const [showConfirmation, setShowConfirmation] = useState(false);
  const [displayPopup, setDisplayPopup] = useState(false);

  // const [
  //   startSelected,
  //   setStartSelected,
  //   endSelected,
  //   setEndSelected,
  // ] = useMarkStore((state) => [
  //   state.startSelected,
  //   state.setStartSelected,
  //   state.endSelected,
  //   state.setEndSelected,
  // ]);

  // const [markMode, toggleMarkMode] = useModeStore((state) => [
  //   state.markMode,
  //   state.toggleMarkMode,
  // ]);

  // const addAnnotation = useAnnotationStore((state) => state.addAnnotation);

  // const toggleShowInputs = () => {
  //   setShowInputs(!showInputs);
  //   setTimeout(() => {
  //     setButtonTextShow(!buttonTextShow);
  //   }, 200);
  // };

  // const validSelection = () => {
  //   return Math.abs(startSelected - endSelected) > 0.001;
  // };

  // const handleSubmit = () => {
  //   addAnnotation({
  //     start: startSelected,
  //     end: endSelected,
  //     code: codeInput,
  //     text: textInput,
  //   });
  //   setCodeInput('');
  //   setTextInput('');
  //   setStartSelected(0);
  //   setEndSelected(0);
  //   if (markMode) {
  //     toggleMarkMode();
  //   }
  //   setShowConfirmation(true);
  //   setTimeout(() => {
  //     setShowConfirmation(false);
  //   }, 3000);
  //   setShowInputs(false);
  // };

  // console.log('start', startSelected, 'end', endSelected);
  const togglePopup = () => setDisplayPopup((currentState) => !currentState);

  return (
    <Wrapper>
      <PlusButton
        alt='add annotation'
        onClick={/*toggleShowInputs*/ togglePopup}
      >
        <AddIcon
          style={{
            transition: 'ease 0.4s',
            fontSize: '3vw',
            alignSelf: 'center',
          }}
        />
        <ButtonText>{buttonTextShow ? 'Close' : 'Add Annotation'}</ButtonText>
      </PlusButton>

      {displayPopup && <AddAnnotationPopup onClose={togglePopup} />}
      {/* {showInputs && (
        <MenuWrapper>
          {!validSelection() && (
            <Typography>You have not selected any part of the graph</Typography>
          )}
          {validSelection() && (
            <>
              <Typography>You have selected: </Typography>
              <Typography>
                {startSelected.toFixed(2) +
                  's to ' +
                  endSelected.toFixed(2) +
                  's'}
              </Typography>
            </>
          )}
          <TextField
            required
            label='Code'
            onChange={(e) => setCodeInput(e.target.value)}
            disabled={!validSelection()}
            value={codeInput}
          />
          <TextField
            required
            label='Text'
            onChange={(e) => setTextInput(e.target.value)}
            disabled={!validSelection()}
            value={textInput}
          />

          <Button
            variant='contained'
            color='primary'
            disableElevation
            onClick={handleSubmit}
            disabled={
              !validSelection() ||
              !(textInput.length > 0 && codeInput.length > 0)
            }
          >
            Add
          </Button>
          {showConfirmation && (
            <Typography>Annotation successfully added</Typography>
          )}
        </MenuWrapper>
      )} */}
    </Wrapper>
  );
};

export default AddAnnotation;
