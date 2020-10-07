import React, { useState, useEffect, useRef, Suspense } from 'react';
import { annotationService } from '../../Services/AnnotationService';
import { dataService } from '../../Services/DataService';
import { useTimeStore, useScaleStore } from '../../Store';
import Text from '../Text';
import * as THREE from 'three';
const HEIGHT_OVER_XZ = 10;
const sampleRate = dataService.getSampleRate();
let colors = [
  '0x3498db',
  '0x2ecc71',
  '0xe74c3c',
  '0xf1c40f',
  '0xf39c12',
  '0x9c88ff',
];

const Annotation = (props) => {
  const planeMesh = useRef();
  const annotations = annotationService.getAnnotations();
  const scale = useScaleStore((state) => state.scale);
  let width = (props.ann.end - props.ann.start) * sampleRate;
  useEffect(() => {
    planeMesh.current.rotateX(-Math.PI / 2);
    planeMesh.current.scale.set(width * 0.4, 140, 0.1);
    planeMesh.current.position.set(0, -HEIGHT_OVER_XZ, 70);
    // console.log(planeMesh);
    // let worldPos = new THREE.Vector3();
    // planeMesh.current.getWorldPosition(worldPos);
    // console.log(worldPos);
  }, []);
  return (
    <group
      position={[
        ((props.ann.start - props.startTime) * sampleRate + width / 2) * scale,
        // (annotations[0].start +
        //   (annotations[0].end - annotations[0].start) / 2) *
        //   0.004,
        HEIGHT_OVER_XZ,
        -75,
      ]}
    >
      <Text
        background={true}
        backgroundOpacity={0.3}
        backgroundColor={colors[Math.floor(Math.random() * colors.length)]}
        backgroundSize={[width * scale, 2 * HEIGHT_OVER_XZ]}
        textSize={3.4}
        rotation={[0, 0, 0]}
        depth={0.1}
      >
        {props.ann.text}
      </Text>
      <mesh ref={planeMesh}>
        <planeBufferGeometry attach="geometry" />
        <meshPhongMaterial opacity={0.1} attach="material" transparent={true} />
      </mesh>
    </group>
  );
};

export default Annotation;
