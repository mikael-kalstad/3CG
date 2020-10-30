import React from 'react';
import Slider from '@material-ui/core/Slider';

import { useCameraStore } from '../../Store';

const ZoomBar = (props) => {
  const [zoomValue, setZoomValue] = useCameraStore((state) => [
    state.zoomValue,
    state.setZoomValue,
  ]);

  const SliderStyle = {
    height: '200px',
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
      min={-80}
      max={0}
      step={0.2}
      aria-labelledby="vertical-slider"
      onChange={(e, val) => setZoomValue(Math.abs(val))}
      value={-zoomValue}
      color={'white'}
    />
  );
};

export default ZoomBar;
