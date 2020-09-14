import React, { useMemo, useCallback, useState } from 'react';
import * as THREE from 'three';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/three';
// import { useSpring, animated } from "react-spring";
import Text from './Text';
// import { animated, useSpring } from "react-spring-three";

const Line = (props) => {
  const [hover, setHover] = useState(0);
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
  });
  const scale = spring.to([0, 1], [1, 5]);

  return (
    <group>
      <a.group position-y={scale}>
        <a.mesh
          onClick={() => setHover(Number(!hover))}
          onPointerOver={() => setHover(Number(1))}
          onPointerOut={() => setHover(Number(0))}
        >
          <line position={[0, -2.5, -10]}>
            <bufferGeometry attach="geometry" onUpdate={onUpdate} />
            <lineBasicMaterial
              name="line"
              attach="material"
              color={'#9c88ff'}
              linewidth={100}
              linecap={'round'}
              linejoin={'round'}
            />
          </line>
        </a.mesh>
      </a.group>
    </group>
  );
};

export default Line;
