import React, { useEffect, useRef, useState } from 'react';
import { ChromePicker } from 'react-color';
import { useColorOptionsStore } from '../../Store';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const Container = styled.div`
  position: relative;
`;

const Swatch = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 5px;
  background: ${(props) => props.background};
  opacity: ${(props) => props.disabled && 0.7};
`;

const SwatchWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 15px;
  align-items: center;
`;

const PickerWrapper = styled.div`
  position: absolute;
  z-index: 100;
  left: 0px;
  top: 30px;
`;

// Check if a string is a hex color
const isHexColor = (hex) =>
  typeof hex === 'string' && hex.length === 6 && !isNaN(Number('0x' + hex));

const ColorPicker = (props) => {
  const [showPicker, setShowPicker] = useState(false);
  const [tempColor, setTempColor] = useState(props.initialColor);
  const [input, setInput] = useState(props.initialColor);
  const togglePicker = () => setShowPicker((prevState) => !prevState);
  const pickerRef = useRef();

  // Update input state value, and check input
  const handleInputChange = (e) => {
    setInput(e.target.value);
    checkInput(e.target.value);
  };

  // When input loses focus
  const onInputUnFocus = () => {
    if (checkInput()) {
      props.index
        ? props.onChange(tempColor, props.index)
        : props.onChange(tempColor, props.index);
    }
  };

  // Check color value in input
  const checkInput = (text) => {
    let temp = text || input;

    // Remove # if it is included in value before validating hex
    if (temp.charAt(0) === '#') temp = temp.slice(1);

    // Set color if hex is validated
    if (isHexColor(temp)) {
      temp = '#' + temp;
      setTempColor(temp);
      setInput(temp.toUpperCase());

      return true;
    }

    return false;
  };

  // Close picker if click is outside component
  const handleClick = (e) => {
    // Check if click is outside of ref
    if (pickerRef.current && !pickerRef.current.contains(e.target)) {
      // Set color in store
      props.index
        ? props.onChange(tempColor, props.index)
        : props.onChange(tempColor, props.index);
      // Hide color picker
      togglePicker();
    }
  };

  // Add event listeners for click, to check if click is outside of component
  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [handleClick]);

  return (
    <Container>
      <SwatchWrapper>
        <Swatch
          background={tempColor}
          onClick={() => !props.disabled && togglePicker()}
          disabled={props.disabled}
        />
        <TextField
          value={input}
          style={{ width: '100px' }}
          onChange={handleInputChange}
          onBlur={onInputUnFocus}
          disabled={props.disabled}
        />
      </SwatchWrapper>

      {/* Only show picker if swatch is clicked */}
      {showPicker && (
        <PickerWrapper ref={pickerRef}>
          <ChromePicker
            color={tempColor}
            onChange={(color, e) => {
              setTempColor(color.hex);
              setInput(color.hex.toUpperCase());
            }}
          />
        </PickerWrapper>
      )}
    </Container>
  );
};

export default ColorPicker;
