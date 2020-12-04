import React, { useEffect, useRef } from 'react';
import { dataService } from '../../Services/DataService';
import { annotationService } from '../../Services/AnnotationService';
import { useScaleStore } from '../../Store';
import Text from '../CanvasComponents/Text';

const HEIGHT_OVER_XZ = 10;
const sampleRate = dataService.getSampleRate();

const formatHexColor = (hex) => {
  return '0x' + hex.slice(1);
};

const Annotation = (props) => {
  const firstRenderRef = useRef(true);
  const planeMesh = useRef();
  const scale = useScaleStore((state) => state.scale);
  let width = (props.ann.end - props.ann.start) * sampleRate;

  // Get grouping color for annotation based on code, if it exists.
  // If not use standard color will be used
  let groupingColor = annotationService.getGroupingColor(
    props.ann.data['SNOMED CT Code']
  );

  if (groupingColor) groupingColor = formatHexColor(groupingColor);

  useEffect(() => {
    const onMount = () => {
      planeMesh.current.rotateX(-Math.PI / 2);
      planeMesh.current.scale.set(width * scale, 150, 0.1);
      planeMesh.current.position.set(
        0,
        -HEIGHT_OVER_XZ - props.level * 0.2,
        75
      );
      planeMesh.current.material.color.setHex(groupingColor || props.color);
    };
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      onMount();
    }
  }, [groupingColor, props.color, props.level, scale, width]);

  return (
    <group
      position={[
        ((props.ann.start - props.startTime) * sampleRate + width / 2) * scale,
        HEIGHT_OVER_XZ,
        -75,
      ]}
    >
      <Text
        position={[0, 2 * HEIGHT_OVER_XZ * props.level, 0]}
        background={true}
        backgroundOpacity={0.6}
        backgroundColor={groupingColor || props.color}
        backgroundSize={[width * scale, 2 * HEIGHT_OVER_XZ]}
        textSize={scale * 15}
        rotation={[0, 0, 0]}
        depth={0.25}
        clippingPlanes={props.clippingPlanes}
        repeatText={true}
      >
        {props.ann.data['Abbreviation']}
      </Text>
      <mesh ref={planeMesh}>
        <planeBufferGeometry attach='geometry' />
        <meshPhongMaterial
          opacity={0.1}
          attach='material'
          transparent={true}
          clippingPlanes={props.clippingPlanes}
        />
      </mesh>
    </group>
  );
};

export default Annotation;
