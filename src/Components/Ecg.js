import React, { Suspense, useEffect } from 'react';
import { dataService } from '../Services/DataService';
import { annotationService } from '../Services/AnnotationService';
import {
  useChannelStore,
  useAnnotationStore,
  useInspectStore,
  useModeStore,
} from '../Store';
import Wave from './Wave';
import Vcg from './Vcg';
import Text from './Text';
import AnnotationRenderer from './Annotations/AnnotationRenderer';
import MarkWaves from './Marking/MarkWaves';
import { useThree } from 'react-three-fiber';
import Vcg2 from './Vcg2';

// Get points which will be rendererd
let renderPoints = dataService.formatDataToPoints();
let channelNames = dataService.getChannelNamesArray();

const Ecg = () => {
  const activeChannels = useChannelStore((state) => state.activeChannels);
  console.log('%c [Ecg] is rendering', 'background: #111; color: #ebd31c');
  console.log('%c [Wave(s)] is rendering', 'background: #111; color: #ebd31c');

  const { gl, camera } = useThree();
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
    </Suspense>
  );
};

export default Ecg;
