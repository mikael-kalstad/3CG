import * as THREE from 'three';
import React, { useMemo, useRef, useEffect } from 'react';
import { useLoader, useThree, useFrame } from 'react-three-fiber';

const Text = (props) => {
  const font = useLoader(THREE.FontLoader, '/helvetiker_regular.typeface.json');
  const config = useMemo(() => ({ font, size: props.textSize, height: 0 }), [
    font,
  ]);
  const { gl, scene, camera } = useThree();
  const textMesh = useRef();
  const planeMesh = useRef();
  const group = useRef();

  useEffect(() => {
    textMesh.current.geometry.computeBoundingBox();
    let boundingBox = textMesh.current.geometry.boundingBox.max;
    textMesh.current.geometry.translate(
      -boundingBox.x / 2,
      -boundingBox.y / 2,
      -boundingBox.z / 2
    );

    textMesh.current.geometry.computeBoundingBox();

    if (props.background) {
      planeMesh.current.material.opacity = props.backgroundOpacity;
      planeMesh.current.material.color.setHex(props.backgroundColor);
      let bound = [
        textMesh.current.geometry.boundingBox.max.x,
        textMesh.current.geometry.boundingBox.max.y,
        0,
      ];
      let scale = props.backgroundScaleByText + 1;
      planeMesh.current.scale.set(
        Math.max(bound[0] * scale, 1.5 * props.textSize),
        bound[1] * scale,
        0.1
      );
      planeMesh.current.translateZ(-0.1);
    }
  }, []);

  useFrame(() => {
    if (props.rotateToCamera) {
      group.current.setRotationFromEuler(camera.rotation);
    }
  });
  return (
    <group ref={group} position={props.position}>
      <mesh ref={textMesh}>
        <textBufferGeometry attach="geometry" args={[props.children, config]} />
        <meshPhongMaterial attach="material" />
      </mesh>
      {props.background && (
        <mesh ref={planeMesh}>
          <planeBufferGeometry attach="geometry" />
          <meshPhongMaterial attach="material" transparent={true} />
        </mesh>
      )}
    </group>
  );
};

export default Text;
