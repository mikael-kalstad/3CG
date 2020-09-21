import * as THREE from 'three';
import React, { useMemo, useRef } from 'react';
import { useLoader, useUpdate, useThree, useFrame } from 'react-three-fiber';

const Note = (props) => {
  const font = useLoader(THREE.FontLoader, '/helvetiker_regular.typeface.json');
  const config = useMemo(() => ({ font, size: 3, height: 0 }), [font]);
  const { gl, scene, camera } = useThree();
  const mesh = useRef();
  useFrame(() => mesh.current.setRotationFromEuler(camera.rotation));
  return (
    <group position={props.pos}>
      <mesh ref={mesh}>
        <textGeometry attach="geometry" args={[props.children, config]} />
        <meshPhongMaterial attach="material" />
      </mesh>
    </group>
  );
};

export default Note;
