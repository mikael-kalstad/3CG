import React, { Suspense } from 'react';
import { useThree } from 'react-three-fiber';
import { dataService } from '../Services/DataService';
import { useChannelStore, useInspectStore } from '../Store';
import AnnotationRenderer from './Annotations/AnnotationRenderer';
import MarkWaves from './CanvasComponents/Marking/MarkWaves';
import Wave from './Wave';
import TimeGrid from './CanvasComponents/Grid/TimeGrid';
import Grid from './CanvasComponents/Grid/Grid';

// Get points which will be rendererd
let renderPoints = dataService.formatDataToPoints();
let channelNames = dataService.getChannelNamesArray();

const Ecg = () => {
  const activeChannels = useChannelStore((state) => state.activeChannels);
  const inspected = useInspectStore((state) => state.inspected);
  console.log('%c [Ecg] is rendering', 'background: #111; color: #ebd31c');
  console.log('%c [Wave(s)] is rendering', 'background: #111; color: #ebd31c');

  const { gl } = useThree();
  gl.localClippingEnabled = true;

  return (
    <Suspense fallback={null}>
      <mesh>
        {/* Render every channel as a 3D wave */}
        {renderPoints &&
          renderPoints.length > 0 &&
          renderPoints.map(
            (channel, i) =>
              activeChannels[i] && (
                <React.Fragment key={i}>
                  <Wave
                    position={[
                      0,
                      0,
                      -i * 10 + (10 * (channelNames.length - 1)) / 2,
                    ]}
                    data={channel}
                    channelName={channelNames[i]}
                    index={i}
                  />
                </React.Fragment>
              )
          )}

        {/* <Vcg data={renderPoints} /> */}
      </mesh>

      <MarkWaves
        renderPoints={renderPoints}
        maxPointsToRender={renderPoints[0].length}
      />
      <AnnotationRenderer />
      <Grid
        position={[
          104,
          5,
          inspected === -1
            ? -56
            : -inspected * 10 + (10 * (channelNames.length - 1)) / 2,
        ]}
      />
      <TimeGrid />
    </Suspense>
  );
};

export default Ecg;
