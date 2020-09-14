import React, { useMemo, useCallback, useState } from "react";
import { useResource } from "react-three-fiber";
import * as THREE from "three";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import Text from "./Text";

const Line = (props) => {
  const [hover, setHover] = useState(true);
  const [ref] = useResource();
  const points = useMemo(
    () => [
      new THREE.Vector3(-10, 0, 0),
      new THREE.Vector3(0, 10, 0),
      new THREE.Vector3(10, 0, 0),
    ],
    []
  );
  const onUpdate = useCallback((self) => self.setFromPoints(points), [points]);

  const { spring } = useSpring({
    spring: hover,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
    // from: { opacity: 0 },
    // to: {
    //   opacity: hover ? 1 : 0,
    // },
  });

  return (
    <>
      <a.mesh
        onPointerOver={() => {
          setHover(true);
          // set({ y: 0 });
        }}
        onPointerOut={() => {
          setHover(false);
          // set({ y: 10 });
        }}
        opacity={spring.to([0], [1])}
      >
        <line position={[0, -2.5, -10]} ref={ref}>
          <bufferGeometry attach="geometry" onUpdate={onUpdate} />
          <lineBasicMaterial
            attach="material"
            color={"#9c88ff"}
            linewidth={100}
            linecap={"round"}
            linejoin={"round"}
          />
        </line>
      </a.mesh>
      <Text>Hovered: {hover ? "true" : "false"}</Text>
    </>
  );
};

export default Line;
