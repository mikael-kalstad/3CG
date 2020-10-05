import React, { useState, useEffect, useRef, Suspense } from 'react';
import { annotationService } from '../Services/AnnotationService';
import Text from './Text';
import * as THREE from 'three';
const HEIGHT_OVER_XZ = 10;

const Annotations = (props) => {
  const planeMesh = useRef();
  const annotations = annotationService.getAnnotations();
  let width = (annotations[0].end - annotations[0].start) * 0.4;
  useEffect(() => {
    let width = (annotations[0].end - annotations[0].start) * 0.4;
    planeMesh.current.rotateX(-Math.PI / 2);
    planeMesh.current.scale.set(80, 120, 0.1);
    planeMesh.current.position.set(0, -HEIGHT_OVER_XZ, 60);
    // console.log(planeMesh);
    // let worldPos = new THREE.Vector3();
    // planeMesh.current.getWorldPosition(worldPos);
    // console.log(worldPos);
  }, []);
  return (
    <group
      position={[
        60,
        // (annotations[0].start +
        //   (annotations[0].end - annotations[0].start) / 2) *
        //   0.004,
        HEIGHT_OVER_XZ,
        -60,
      ]}
    >
      <Text
        background={true}
        backgroundOpacity={0.3}
        backgroundColor={'0xff0000'}
        backgroundSize={[80, 2 * HEIGHT_OVER_XZ]}
        textSize={3.4}
        rotation={[0, 0, 0]}
        depth={0.1}
      >
        AI: Pasienten har ikke betalt skatt
      </Text>
      <mesh ref={planeMesh}>
        <planeBufferGeometry attach="geometry" />
        <meshPhongMaterial opacity={0.1} attach="material" transparent={true} />
      </mesh>
    </group>
  );
};

export default Annotations;
