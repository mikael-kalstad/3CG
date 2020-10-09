import React, { useState, useRef, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import { useZoomStore } from '../../Store';

const ZoomBar = (props) => {
  const zoom = useZoomStore((state) => state.zoom);
  const setZoom = useZoomStore((state) => state.setZoom);
  const SliderStyle = {
    width: '50px',
    height: '50px',
    top: '20px',
    right: '130px',
    position: 'absolute',
    color: 'white',
  };

  return (
    <Slider
      orientation="vertical"
      defaultValue={1}
      style={SliderStyle}
      min={0.5}
      max={17}
      step={0.05}
      aria-labelledby="vertical-slider"
      onChange={(e, val) => setZoom(val)}
      value={zoom}
      color={'white'}
    />
  );
};

export default ZoomBar;
