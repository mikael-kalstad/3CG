import Annotation from './Annotation';
import React from 'react';
import { annotationService } from '../../Services/AnnotationService';
import { dataService } from '../../Services/DataService';
import { useTimeStore, useScaleStore } from '../../Store';
import * as THREE from 'three';

const sampleRate = dataService.getSampleRate();

const AnnotationRenderer = (props) => {
  let startTime = useTimeStore((state) => state.startTime);
  let endTime = useTimeStore((state) => state.endTime);
  let annotations = annotationService.getAnnotations();
  const scale = useScaleStore((state) => state.scale);

  const shouldRender = (start, end) => start <= endTime && startTime <= end;

  // Two planes for clipping the annotations
  let startPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
  let endPlane = new THREE.Plane(
    new THREE.Vector3(-1, 0, 0),
    (endTime - startTime) * sampleRate * scale
  );

  return (
    <>
      {annotations.map(
        (ann, i) =>
          shouldRender(ann.start, ann.end) && (
            <React.Fragment key={i}>
              <Annotation
                ann={ann}
                startTime={startTime}
                endTime={endTime}
                clippingPlanes={[startPlane, endPlane]}
              />
            </React.Fragment>
          )
      )}
      {/* <planeHelper plane={startPlane} size={20} />
      <planeHelper plane={endPlane} size={20} /> */}
    </>
  );
};

export default AnnotationRenderer;
