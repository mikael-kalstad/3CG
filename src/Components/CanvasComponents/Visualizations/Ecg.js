import React, { Suspense } from 'react';
import { useThree } from 'react-three-fiber';
import { dataService } from '../../../Services/DataService';
import { useChannelStore, useInspectStore } from '../../../Store';
import AnnotationRenderer from '../Annotations/AnnotationRenderer';
import MarkWaves from '../Marking/MarkWaves';
import Wave from '../Wave';
import TimeGrid from '../Grid/TimeGrid';
import Grid from '../Grid/Grid';

const Ecg = () => {
  let channelNames = dataService.getChannelNamesArray();
  // Get points which will be rendered
  let renderPoints = dataService.formatDataToPoints();
  const activeChannels = useChannelStore((state) => state.activeChannels);
  const inspected = useInspectStore((state) => state.inspected);

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
                      -i * 10 + (10 * (channelNames.length - 1)) / 2, // Create spacing between waves
                    ]}
                    data={channel}
                    channelName={channelNames[i]}
                    index={i}
                  />
                </React.Fragment>
              )
          )}
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
