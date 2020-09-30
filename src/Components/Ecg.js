import React, { useState, useEffect, useRef, Suspense } from 'react';
import { annotationService } from '../Services/AnnotationService';
import Wave from './Wave';
import Text from './Text';
import MarkWaves from './Marking/MarkWaves';
import Annotations from './Annotations';

// -- !! This constant will be moved outside when timline-component is ready !! --
const MAX_POINTS_TO_RENDER = 200;

const Ecg = (props) => {
  return (
    <Suspense fallback={null}>
      <mesh>
        {/* Render every channel as a 3D wave */}
        {props.renderPoints.map(
          (channel, i) =>
            props.channelState[i] && (
              <React.Fragment key={i}>
                <Text
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
                  {props.channelNames[i]}
                </Text>
                <Wave
                  data={channel}
                  start={props.timeProps.startTime}
                  end={props.timeProps.endTime}
                  play={props.play}
                  markMode={props.markMode}
                />
              </React.Fragment>
            )
        )}
      </mesh>

      <MarkWaves
        renderPoints={props.renderPoints}
        maxPointsToRender={MAX_POINTS_TO_RENDER}
        markMode={props.markMode}
        timeProps={props.timeProps}
      />
      <Annotations timeProps={props.timeProps}></Annotations>
    </Suspense>
  );
};

export default Ecg;
