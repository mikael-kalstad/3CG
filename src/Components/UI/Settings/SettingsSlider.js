import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const SettingsSlider = (props) => {
  const classes = useStyles();

  return (
    <FormControl component='fieldset' className={classes.formControl}>
      <Typography id='discrete-slider-small-steps' gutterBottom>
        {props.title}
      </Typography>
      <Slider
        getAriaValueText={props.valueType}
        aria-labelledby='discrete-slider-small-steps'
        step={props.stepSize}
        marks
        min={props.minValue}
        max={props.maxValue}
        valueLabelDisplay='auto'
        disabled={props.disabled}
        onChange={props.onChange}
        scale={props.scale}
        value={props.value}
        aria-label='Change value'
      />
      <FormHelperText>{props.description}</FormHelperText>
    </FormControl>
  );
};

export default SettingsSlider;
