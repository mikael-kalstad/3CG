import React, { useState, useEffect, useRef } from "react";
import { useFrame } from "react-three-fiber";
import { formatDataToPoints } from "../Scripts/DataConverter";
import { dataService } from "../Services/DataService";
import Wave from "./Wave";
import Label from "./Label";

let pointData = formatDataToPoints(dataService.getJSON());
let channelNames = dataService.getChannelNamesArray();

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

  useFrame((state, delta) => {
    if (props.play) mesh.current.position.x -= 0.01 * (60 * delta);
  });

  return (
    <mesh ref={mesh}>
      {/* Render every channel as a 3D wave */}
      {pointData.map((channel, i) => (
        <React.Fragment key={i}>
          <Label position={channel[parseInt(channel.length / 2)]}>
            {channelNames[i]}
          </Label>
          <Wave
            data={channel}
            start={time}
            end={MAX_POINTS_TO_RENDER}
            play={props.play}
          />
        </React.Fragment>
      ))}
    </mesh>
  );
};

export default Ecg;
