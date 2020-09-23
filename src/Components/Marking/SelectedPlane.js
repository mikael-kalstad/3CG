import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useUpdate, useFrame } from 'react-three-fiber';

const SelectedPlane = (props) => {
  const mesh = useRef();

  useEffect(() => {
    mesh.current.scale.set(0, 0.01, 115);
    mesh.current.material.color.setHex(0xffffff);
  }, []);

  useEffect(() => {
    mesh.current.scale.x = props.selected[1] - props.selected[0];
    mesh.current.position.x =
      props.selected[0] + (props.selected[1] - props.selected[0]) / 2;
  }, [props.selected]);
  return (
    <mesh ref={mesh}>
      <boxBufferGeometry attach="geometry" />
      <meshPhongMaterial opacity={0.3} attach="material" transparent={true} />
    </mesh>
  );
};

export default SelectedPlane;
