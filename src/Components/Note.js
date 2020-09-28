import * as THREE from 'three';
import React, { useMemo, useRef, useEffect } from 'react';
import { useLoader, useUpdate, useThree, useFrame } from 'react-three-fiber';
import { PlaneGeometry } from 'three';

const Note = (props) => {
  const font = useLoader(THREE.FontLoader, '/helvetiker_regular.typeface.json');
  const config = useMemo(() => ({ font, size: 2, height: 0 }), [font]);
  const { gl, scene, camera } = useThree();
  const textMesh = useRef();
  // const planeMesh = useRef();

  useEffect(() => {
    textMesh.current.geometry.computeBoundingBox();
  }, [textMesh]);

  // useEffect(() => {
  //   let bound = [
  //     textMesh.current.geometry.boundingBox.max.x,
  //     textMesh.current.geometry.boundingBox.max.y,
  //     textMesh.current.geometry.boundingBox.max.z,
  //   ];
  //   planeMesh.current.scale.set(bound[0], bound[1], bound[2]);
  //   planeMesh.current.position.set(bound[0] / 2, bound[1] / 2, bound[2] / 2);

  //   //plane
  // }, [planeMesh]);

  useFrame(() => {
    if (props.rotateToCamera) {
      textMesh.current.setRotationFromEuler(camera.rotation);
      // planeMesh.current.setRotationFromEuler(camera.rotation);
    }
  });

  return (
    <group position={props.position}>
      {/* <mesh ref={planeMesh}>
        <planeGeometry attach="geometry" />
        <meshPhongMaterial attach="material" transparent={true} opacity={0.5} />
      </mesh> */}
      <mesh ref={textMesh}>
        <textGeometry attach="geometry" args={[props.children, config]} />
        <meshPhongMaterial attach="material" />
      </mesh>
    </group>
  );
};

export default Note;
