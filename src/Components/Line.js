import React, { useMemo, useCallback, useState } from "react";
import * as THREE from "three";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";

const Line = (props) => {
  const [hover, setHover] = useState(0);
  const [clicked, setClicked] = useState(0);
  const points = useMemo(
    () => props.data.map((p) => new THREE.Vector3(p[0], p[1], p[2])),
    [props.data]
  );

  const onUpdate = useCallback((self) => self.setFromPoints(points), [points]);

  const { spring } = useSpring({
    spring: hover || clicked,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  const scale = spring.to([0, 1], [1, 5]);

  return (
    <a.group
      position-y={scale}
      onClick={() => setClicked(Number(!clicked))}
      onPointerOver={() => !clicked && setHover(Number(1))}
      onPointerOut={() => !clicked && setHover(Number(0))}
    >
      <a.mesh>
        <line position={[0, -2.5, -10]} scale={[1, 100, 1]}>
          <bufferGeometry attach="geometry" onUpdate={onUpdate} />
          <lineBasicMaterial
            name="line"
            attach="material"
            color={"#9c88ff"}
            linewidth={100}
            linecap={"round"}
            linejoin={"round"}
          />
        </line>
      </a.mesh>
    </a.group>
  );
};

export default Line;
