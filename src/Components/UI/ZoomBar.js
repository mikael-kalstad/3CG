import React, { useState, useRef, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import { useZoomStore } from '../../Store';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const ZoomBar = (props) => {
  const zoom = useZoomStore((state) => state.zoom);
  const setZoom = useZoomStore((state) => state.setZoom);

  const mapVal = (n, start1, stop1, start2, stop2) => {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  };

  const SliderStyle = {
    height: '100px',
    top: '120px',
    right: '30px',
    position: 'absolute',
    color: 'white',
  };

  const CustomSlider = withStyles({
    root: {
      width: 50,
      height: 50,
      top: 20,
      right: 150,
      position: 'absolute',
      color: 'white',
    },
  })(Slider);

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
      value={-zoom + 40}
      onChange={(e, val) => setZoom(-val + 40)}
      color={'white'}
    />
  );
};

export default ZoomBar;
