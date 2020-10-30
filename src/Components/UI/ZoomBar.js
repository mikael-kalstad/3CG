import React from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import { useCameraStore } from '../../Store';

const ZoomBar = (props) => {
  const [zoomValue, setZoomValue] = useCameraStore((state) => [
    state.zoomValue,
    state.setZoomValue,
  ]);

  const SliderStyle = {
    height: '100px',
    top: '120px',
    right: '30px',
    position: 'absolute',
    color: 'white',
  };

  return (
    <Slider
      orientation="vertical"
      // defaultValue={0}
      style={SliderStyle}
      // min={0.25}
      // max={10.05}
      min={-40}
      max={40}
      step={1}
      aria-labelledby="vertical-slider"
      onChange={(e, val) => setZoomValue(-val + 40)}
      value={-zoomValue + 40}
      color={'white'}
    />
  );
};

export default ZoomBar;
