import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useUpdate, useFrame } from 'react-three-fiber';

const TRANSPARANCY = 0.3;
const YSCALE = 0.2;

const SelectedPlane = (props) => {
  const mesh = useRef();
  let edges;

  useEffect(() => {
    mesh.current.scale.set(0, YSCALE, 115);
    mesh.current.position.y = YSCALE / 2;
    mesh.current.material.color.setHex(0xffffff);
  }, []);

  useEffect(() => {
    if (Math.abs(props.selected[1] - props.selected[0]) > 0.001) {
      mesh.current.scale.x = props.selected[1] - props.selected[0];
      mesh.current.position.x =
        props.selected[0] + (props.selected[1] - props.selected[0]) / 2;
    }
  }, [props.selected]);

  const shouldRender = (selected) => {
    return Math.abs(selected[1] - selected[0]) > 0.001;
  };
  return (
    <group>
      <mesh ref={mesh}>
        <boxBufferGeometry attach="geometry" />
        <meshPhongMaterial
          opacity={shouldRender(props.selected) ? TRANSPARANCY : 0}
          attach="material"
          transparent={true}
        />
      </mesh>
      <mesh>
        <lineSegments edges={edges} attach="geometry" />
        <lineBasicMaterial attach="material" color={0xff0000} />
      </mesh>
    </group>
  );
};

export default SelectedPlane;
