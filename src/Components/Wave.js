import React, { useState, useRef } from 'react';
import * as THREE from 'three';
import { useUpdate, useFrame } from 'react-three-fiber';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/three';
import { getColorData } from '../Scripts/Color';

const Wave = (props) => {
  const [hover, setHover] = useState(0);
  const [clicked, setClicked] = useState(0);
  const [mounted, setMounted] = useState(false);
  const group = useRef();

  useFrame((state, delta) => {
    if (props.play) group.current.position.x -= 0.01 * (60 * delta);
  });

  // React-spring animation config
  const { spring } = useSpring({
    spring: hover || clicked,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  // Scale on hover with mouse
  const scale = spring.to([0, 1], [1, 5]);

  // Return an array of points with a start and end
  const updatePoints = (data, start, end) => {
    return data.slice(start, end + start);
  };

  const ref = useUpdate(
    (self) => {
      // Set specific range which is to be shown
      self.setDrawRange(props.start, props.end);

      // Only render points once
      if (!mounted) {
        self.setFromPoints(
          props.data.map((p) => new THREE.Vector3(p[0], p[1], p[2]))
        );
        setMounted(true);
      }

      // Set gradient color theme to all points that is rendered in setDrawRange method
      let points = updatePoints(props.data, props.start, props.end);
      let colors = getColorData(points, props.start);
      self.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      self.verticesNeedUpdate = true;
    },
    [props.data, props.start, props.end, props.play]
  );

  return (
    <a.group
      position-y={scale}
      onClick={() => setClicked(Number(!clicked))}
      onPointerOver={() => !props.markMode && !clicked && setHover(Number(1))}
      onPointerOut={() => !props.markMode && !clicked && setHover(Number(0))}
      ref={group}
    >
      <a.mesh>
        <line position={[0, 0, 0]} scale={[1, 100, 1]}>
          <bufferGeometry attach="geometry" ref={ref} />
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
