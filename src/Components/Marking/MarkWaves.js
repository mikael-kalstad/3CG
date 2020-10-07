import React, { useState } from 'react';
import MarkPlane from './MarkPlane';
import SelectedPlane from './SelectedPlane';
import { useModeStore, useTimeStore, useScaleStore } from '../../Store';
import { dataService } from '../../Services/DataService';

const sampleRate = dataService.getSampleRate();

const MarkWaves = (props) => {
  const [selected, setSelected] = useState(new Array(2));
  const markMode = useModeStore((state) => state.markMode);
  const startTime = useTimeStore((state) => state.startTime);
  const endTime = useTimeStore((state) => state.endTime);
  const scale = useScaleStore((state) => state.scale);

  const updateXStart = (xStart) => {
    setSelected([xStart, xStart]);
  };

  const updateXEnd = (xEnd) => {
    setSelected([selected[0], xEnd]);
  };

  let width = (endTime - startTime) * sampleRate * scale;
  let middlePoint = width / 2;
  return (
    <>
      <>
        {markMode && (
          <MarkPlane
            width={width}
            middlePoint={middlePoint}
            updateXStart={updateXStart}
            updateXEnd={updateXEnd}
          />
        )}
        <SelectedPlane selected={selected} />
      </>
    </>
  );
};

export default MarkWaves;
