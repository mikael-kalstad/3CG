import React, { useMemo, useCallback, useState } from 'react';
import * as THREE from 'three';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/three';
import { getColorData } from '../Scripts/Color';

const Wave = (props) => {
  const [hover, setHover] = useState(0);
  const [clicked, setClicked] = useState(0);

  const points = useMemo(
    () => props.data.map((p) => new THREE.Vector3(p[0], p[1], p[2])),
    [props.data]
  );

  const { spring } = useSpring({
    spring: hover || clicked,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  const scale = spring.to([0, 1], [1, 5]);

  const onUpdate = useCallback(
    (self) => {
      self.setFromPoints(points);
      let colors = getColorData(props.data);
      self.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    },
    [points, props.data]
  );

  return (
    <a.group
      position-y={scale}
      onClick={() => setClicked(Number(!clicked))}
      onPointerOver={() => !clicked && setHover(Number(1))}
      onPointerOut={() => !clicked && setHover(Number(0))}
    >
      <a.mesh>
        <line position={[0, -2.5, 0]} scale={[1, 100, 1]}>
          <bufferGeometry attach="geometry" onUpdate={onUpdate} />
          <lineBasicMaterial
            name="line"
            attach="material"
            linewidth={1000}
            linecap={'round'}
            linejoin={'round'}
            vertexColors={'VertexColors'}
          />
        </line>
      </a.mesh>
    </a.group>
  );
};

export default Wave;
