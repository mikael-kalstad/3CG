import React from 'react';
import { dataService } from '../../Services/DataService';
import {
  useModeStore,
  useScaleStore,
  useTimeStore,
  useMarkStore,
} from '../../Store';
import MarkPlane from './MarkPlane';
import SelectedPlane from './SelectedPlane';

const sampleRate = dataService.getSampleRate();

const MarkWaves = (props) => {
  const [
    startSelected,
    setStartSelected,
    endSelected,
    setEndSelected,
  ] = useMarkStore((state) => [
    state.startSelected,
    state.setStartSelected,
    state.endSelected,
    state.setEndSelected,
  ]);
  const markMode = useModeStore((state) => state.markMode);
  const startTime = useTimeStore((state) => state.startTime);
  const endTime = useTimeStore((state) => state.endTime);
  const scale = useScaleStore((state) => state.scale);

  const updateXStart = (xStartPos) => {
    let xStartTime = startTime + xStartPos / (sampleRate * scale); // Converting to time
    setStartSelected(xStartTime);
    setEndSelected(xStartTime);
  };

  const updateXEnd = (xEndPos) => {
    let xEndTime = startTime + xEndPos / (sampleRate * scale); // Converting to time
    setEndSelected(xEndTime);
  };
  let markPlaneWidth = (endTime - startTime) * sampleRate * scale;
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
        <SelectedPlane selected={[startSelected, endSelected]} />
      </>
    </>
  );
};

export default MarkWaves;
