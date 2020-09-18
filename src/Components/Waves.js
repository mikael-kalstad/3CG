import React, { useState, useEffect } from "react";
import Line from "./Wave";
import { useFrame } from "react-three-fiber";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";

const Waves = (props) => {
  const [xPos, setXPos] = useState(0);

  useFrame((state) => setXPos(xPos + 1.0));

  return (
    <a.group position={[0, 0, 0]}>
      {props.data.map((channel) => (
        <Line data={channel} key={channel} />
      ))}
    </a.group>
  );
};

export default Waves;
