import React, { useState, useEffect, useRef, Suspense } from "react";
import { noteService } from "../Services/NoteService";
import Wave from "./Wave";
import Note from "./Note";
import MarkWaves from "./Marking/MarkWaves";

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
      />
    </Suspense>
  );
};

export default Ecg;
