import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useCameraStore } from '../../../Store';

const useStyles = makeStyles({
  root: {},
  thumb: {
    width: '25px',
    backgroundColor: '#efefef',
    borderRadius: '2px',
    left: '7px',
  },
  mark: {
    width: '10px',
    height: 1,
    borderRadius: 1,
    left: '9px',
  },
  rail: { opacity: 0.7 },
});

const marks = [
  {
    value: -80,
  },
  {
    value: -60,
  },
  {
    value: -40,
  },
  {
    value: -20,
  },
  {
    value: 0,
  },
];

const ZoomBar = () => {
  const [zoomValue, setZoomValue] = useCameraStore((state) => [
    state.zoomValue,
    state.setZoomValue,
  ]);

  const SliderStyle = {
    height: '250px',
    top: '120px',
    right: '30px',
    position: 'absolute',
    color: 'white',
  };

  const classes = useStyles();

  console.log('%c [ZoomBar] is rendering', 'background: #111; color: #ebd31c');
  return (
    <Slider
      style={SliderStyle}
      orientation='vertical'
      classes={classes}
      min={-80}
      max={0}
      step={0.2}
      aria-labelledby='vertical-slider'
      onChange={(e, val) => setZoomValue(Math.abs(val))}
      value={-zoomValue}
      marks={marks}
      track={false}
    />
  );
};

export default ZoomBar;
