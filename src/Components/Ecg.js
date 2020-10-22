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
  const setChannel = useChannelStore((state) => state.setChannel);
  console.log('%c [Ecg] is rendering', 'background: #111; color: #ebd31c');
  console.log('%c [Wave(s)] is rendering', 'background: #111; color: #ebd31c');

  const [inspected, setInspected] = useInspectStore((state) => [
    state.inspected,
    state.setInspected,
  ]);
  const toggleOrtoMode = useModeStore((state) => state.toggleOrtoMode);

  const { gl, camera } = useThree();
  gl.localClippingEnabled = true;

  const inspectChannel = (channelIndex) => {
    setInspected(channelIndex);
    for (let i = 0; i < activeChannels.length; i++) {
      if (i != channelIndex) {
        setChannel(i, false);
      }
    }
    toggleOrtoMode();
  };
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
                  <Text
                    onClick={() => inspectChannel(i)}
                    position={channel[0].map((val, i) =>
                      i == 0 ? val - 6 : val
                    )}
                    rotateToCamera={true}
                    background={true}
                    backgroundOpacity={0.4}
                    backgroundColor={0x000000}
                    backgroundScaleByText={1.5}
                    textSize={2.4}
                  >
                    {channelNames[i]}
                  </Text>
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
