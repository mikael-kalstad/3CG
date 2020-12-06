import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import styled from 'styled-components';
import { useColorOptionsStore } from '../../../Store';
import Dropdown from '../Dropdown';
import SettingsCheck from '../Settings/SettingsCheck';
import ColorPicker from '../ColorPicker';
import ClearIcon from '@material-ui/icons/Clear';

const MarginWrapper = styled.div`
  margin: 24px;
  margin-top: 10px;
`;

const ColorPickerWrapper = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 15px;
  align-items: end;
`;

const ColorSelectionWrapper = styled.div`
  opacity: ${(props) => props.disabled && 0.7};
`;

const MAX_NUM_OF_COLORS = 10;

const DROPDOWN_OVERLAP_VALUES = ['Top annotations', 'Bottom annotations'];

const ColorOptions = () => {
  const [
    waveColorTypes,
    activeWaveColorType,
    setActiveWaveColorType,
    mixOverlap,
    toggleMixOverlap,
    overlapPriority,
    toggleOverlapPriority,
  ] = useColorOptionsStore((state) => [
    state.waveColorTypes,
    state.activeWaveColorType,
    state.setActiveWaveColorType,
    state.mixOverlap,
    state.toggleMixOverlap,
    state.overlapPriority,
    state.toggleOverlapPriority,
  ]);

  const [
    colors,
    addColor,
    removeColor,
    changeColor,
    background,
    setBackground,
  ] = useColorOptionsStore((state) => [
    state.colors,
    state.addColor,
    state.removeColor,
    state.changeColor,
    state.background,
    state.setBackground,
  ]);

  const useStyles = makeStyles((theme) => ({
    button: {
      background: '#93bc6e',
      color: 'white',
      '&:hover': {
        background: '#7aab4f',
        color: 'white',
        filter: 'brightness(0.9)',
      },
    },
    deleteIcon: {
      color: '#555',
      cursor: activeWaveColorType === 0 ? 'pointer' : 'default',
      '&:hover': {
        color: '#333',
      },
    },
  }));

  const classes = useStyles();

  // Handle dropdown change
  const handleTypeChange = (e) => {
    setActiveWaveColorType(waveColorTypes.indexOf(e.target.value));
  };

  return (
    <>
      <MarginWrapper>
        <Typography
          id='split-orientation-title'
          gutterBottom
          style={{ marginTop: '10px' }}
        >
          Background Color
        </Typography>

        <FormHelperText style={{ marginBottom: '10px' }}>
          Change the color of the scene background in the 3D-rendering
        </FormHelperText>
        <ColorPicker initialColor={background} onChange={setBackground} />

        <Typography
          id='split-orientation-title'
          gutterBottom
          style={{ marginTop: '30px' }}
        >
          Color type
        </Typography>
        <FormHelperText>
          Change the color type which will be used in the selected render view.
          Note some color types may not work in some render views.
        </FormHelperText>

        <Dropdown
          items={waveColorTypes}
          value={waveColorTypes[activeWaveColorType]}
          handleChange={handleTypeChange}
        />

        <Typography
          id='split-orientation-title'
          gutterBottom
          style={{ marginTop: '40px' }}
        >
          Single color selector
        </Typography>

        <FormHelperText>
          Change the single color, or add more colors. Several colors will
          transition smoothly from one another.
        </FormHelperText>

        {/* This section should be disabled if the current color type is not single color */}
        <ColorSelectionWrapper disabled={activeWaveColorType !== 0}>
          {colors.map((c, i) => (
            <ColorPickerWrapper key={c + i}>
              <ColorPicker
                index={i}
                initialColor={c}
                onChange={changeColor}
                disabled={activeWaveColorType !== 0}
              />
              {colors.length > 1 && (
                <ClearIcon
                  className={classes.deleteIcon}
                  onClick={() => activeWaveColorType === 0 && removeColor(i)}
                />
              )}
            </ColorPickerWrapper>
          ))}

          <Button
            variant='contained'
            className={classes.button}
            startIcon={<AddIcon />}
            size='small'
            onClick={() => addColor('#00D8FF')}
            disabled={
              colors.length >= MAX_NUM_OF_COLORS || activeWaveColorType !== 0
            }
          >
            Add color
          </Button>

          {colors.length >= MAX_NUM_OF_COLORS && (
            <FormHelperText style={{ color: 'rgba(247, 152, 29, 1)' }}>
              Maximum {MAX_NUM_OF_COLORS} colors is allowed
            </FormHelperText>
          )}
        </ColorSelectionWrapper>
      </MarginWrapper>

      <SettingsCheck
        state={mixOverlap}
        onClick={toggleMixOverlap}
        name='mixoverlap-option'
        label='Mix overlapping colors'
        disabled={activeWaveColorType !== 1}
        description='Mix together the colors of the ecg-waves if diagnoses overlap. Can only be toggled when the color is based on diagnoses'
      />

      <MarginWrapper>
        <Typography
          id='split-orientation-title'
          gutterBottom
          style={{ marginTop: '30px' }}
        >
          Overlap priority
        </Typography>

        <FormHelperText style={{ marginBottom: '10px' }}>
          Change the priority of color overlap when color type is set to
          diagnosis groupings. Note this will have no effect when mix overlap
          option is enabled.
        </FormHelperText>

        <Dropdown
          items={DROPDOWN_OVERLAP_VALUES}
          value={DROPDOWN_OVERLAP_VALUES[overlapPriority]}
          handleChange={toggleOverlapPriority}
          disabled={activeWaveColorType !== 1 || mixOverlap}
        />
      </MarginWrapper>
    </>
  );
};

export default ColorOptions;
