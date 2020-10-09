import React, { useEffect, useRef, Suspense } from 'react';
import { annotationService } from '../../Services/AnnotationService';
import { dataService } from '../../Services/DataService';
import { useScaleStore } from '../../Store';
import Text from '../Text';

const HEIGHT_OVER_XZ = 10;
const sampleRate = dataService.getSampleRate();

const Annotation = (props) => {
  const planeMesh = useRef();
  const scale = useScaleStore((state) => state.scale);
  let width = (props.ann.end - props.ann.start) * sampleRate;

  useEffect(() => {
    planeMesh.current.rotateX(-Math.PI / 2);
    planeMesh.current.scale.set(width * scale, 140, 0.1);
    planeMesh.current.position.set(0, -HEIGHT_OVER_XZ, 70);
    planeMesh.current.material.color.setHex(props.color);
  }, []);

  console.log();
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
        backgroundOpacity={0.6}
        backgroundColor={props.color}
        backgroundSize={[width * scale, 2 * HEIGHT_OVER_XZ]}
        textSize={scale * 15}
        rotation={[0, 0, 0]}
        depth={0.1}
        clippingPlanes={props.clippingPlanes}
      >
        {props.ann.text}
      </Text>
      <mesh ref={planeMesh}>
        <planeBufferGeometry attach="geometry" />
        <meshPhongMaterial
          opacity={0.1}
          attach="material"
          transparent={true}
          clippingPlanes={props.clippingPlanes}
        />
      </mesh>
    </group>
  );
};

export default Annotation;
