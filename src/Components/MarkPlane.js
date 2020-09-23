import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useUpdate, useFrame } from 'react-three-fiber';

const MarkPlane = (props) => {
  const [hovered, setHovered] = useState(false);
  const mesh = useRef();

  /* Setting initial values */
  useEffect(() => {
    mesh.current.scale.set(30, 0.01, 115);
    mesh.current.material.color.setHex(0xff0000);
  }, []);

  useEffect(() => {
    console.log('hei');
    if (hovered) mesh.current.material.color.setHex(0x00ff00);
    else mesh.current.material.color.setHex(0xff0000);
  }, [hovered]);

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => setHovered(!hovered)}
      onPointerOut={() => setHovered(!hovered)}
    >
      <boxBufferGeometry attach="geometry" />
      <meshPhongMaterial opacity={0.9} attach="material" transparent={true} />
    </mesh>
  );
};

export default MarkPlane;
