import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useUpdate, useFrame } from 'react-three-fiber';
import MarkPlane from './MarkPlane';
import SelectedPlane from './SelectedPlane';

const MarkWaves = (props) => {
  const [selected, setSelected] = useState(new Array(2));

  const updateXStart = (xStart) => {
    setSelected([xStart, xStart]);
  };

  const updateXEnd = (xEnd) => {
    setSelected([selected[0], xEnd]);
  };

  let width =
    props.renderPoints[0][props.maxPointsToRender - 1][0] -
    props.renderPoints[0][0][0];
  let middlePoint = width / 2;
  return (
    <>
      {props.markMode && (
        <>
          <MarkPlane
            width={width}
            middlePoint={middlePoint}
            updateXStart={updateXStart}
            updateXEnd={updateXEnd}
          />
          <SelectedPlane selected={selected} />
        </>
      )}
    </>
  );
};

export default MarkWaves;
