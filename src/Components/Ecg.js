import React, { useState, useEffect, useRef, Suspense } from "react";
import { noteService } from "../Services/NoteService";
import Wave from "./Wave";
import Note from "./Note";

// -- !! This constant will be moved outside when timline-component is ready !! --
const MAX_POINTS_TO_RENDER = 200;

const Ecg = (props) => {
  const [time, setTime] = useState(0);
  const mesh = useRef();

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
      <mesh ref={mesh}>
        {/* Render every channel as a 3D wave */}
        {props.renderPoints.map(
          (channel, i) =>
            props.channelState[i] && (
              <React.Fragment key={i}>
                <Note
                  pos={channel[0].map((val, i) => (i != 2 ? val - 2 : val))}
                >
                  {props.channelNames[i]}
                </Note>
                <Wave
                  data={channel}
                  start={time}
                  end={MAX_POINTS_TO_RENDER}
                  play={props.play}
                />
              </React.Fragment>
            )
        )}
      </mesh>
    </Suspense>
  );
};

export default Ecg;
