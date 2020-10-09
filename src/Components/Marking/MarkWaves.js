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
    xStart = startTime + xStart / sampleRate;
    setSelected([xStart, xStart]);
  };

  const updateXEnd = (xEnd) => {
    xEnd = startTime + xEnd / sampleRate;
    setSelected([selected[0], xEnd]);
  };

  let markPlaneWidth = (endTime - startTime) * sampleRate;
  let middlePoint = markPlaneWidth / 2;
  return (
    <>
      <>
        {markMode && (
          <MarkPlane
            width={markPlaneWidth}
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
