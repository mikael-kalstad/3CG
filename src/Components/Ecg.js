import React, { useState, useEffect, useRef, Suspense } from 'react';
import { noteService } from '../Services/NoteService';
import Wave from './Wave';
import Note from './Note';
import MarkWaves from './Marking/MarkWaves';

// -- !! This constant will be moved outside when timline-component is ready !! --
const MAX_POINTS_TO_RENDER = 200;

const Ecg = (props) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    // Update time state every set interval, used to synchronize "play" functin of ecg-waves
    const intervalId = setInterval(() => {
      // Only update time if play state is active
      if (props.play) {
        setTime((time) => {
          return time + 1;
        });
      }
    }, 500);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [props.play]);
  return (
    <Suspense fallback={null}>
      <mesh>
        {/* Render every channel as a 3D wave */}
        {props.renderPoints.map(
          (channel, i) =>
            props.channelState[i] && (
              <React.Fragment key={i}>
                <Note
                  position={channel[0].map((val, i) =>
                    i != 2 ? val - 2 : val
                  )}
                  rotateToCamera={true}
                >
                  {props.channelNames[i]}
                </Note>
                <Wave
                  data={channel}
                  start={time}
                  end={MAX_POINTS_TO_RENDER}
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
      />
    </Suspense>
  );
};

export default Ecg;
