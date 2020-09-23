import * as THREE from 'three';
import React, { useMemo, useRef, useEffect } from 'react';
import { useLoader, useUpdate, useThree, useFrame } from 'react-three-fiber';

const Note = (props) => {
  const font = useLoader(THREE.FontLoader, '/helvetiker_regular.typeface.json');
  const config = useMemo(() => ({ font, size: 2, height: 0 }), [font]);
  const { gl, scene, camera } = useThree();
  const mesh = useRef();

  useEffect(() => {
    mesh.current.geometry.computeBoundingBox();
    mesh.current.position.x -= 3;
  }, [mesh]);

  useFrame(() => {
    if (props.rotateToCamera)
      mesh.current.setRotationFromEuler(camera.rotation);
  });

  return (
    <group position={props.position}>
      <mesh ref={mesh}>
        <textGeometry attach="geometry" args={[props.children, config]} />
        <meshPhongMaterial attach="material" />
      </mesh>
    </group>
  );
};

export default Note;
