import Annotation from './Annotation';
import React, { useEffect, useState } from 'react';
import { annotationService } from '../../Services/AnnotationService';
import { dataService } from '../../Services/DataService';
import { useTimeStore, useScaleStore, useAnnotationStore } from '../../Store';
import * as THREE from 'three';

const sampleRate = dataService.getSampleRate();

let colorSelection = [
  0x3498db,
  0x2ecc71,
  0xe74c3c,
  0xf1c40f,
  0xf39c12,
  0x9c88ff,
];

const AnnotationRenderer = (props) => {
  let startTime = useTimeStore((state) => state.startTime);
  let endTime = useTimeStore((state) => state.endTime);
  const activeAnnotations = useAnnotationStore(
    (state) => state.activeAnnotations
  );
  const [annotations, setAnnotations] = useState(
    useAnnotationStore((state) => state.annotations)
  );

  const [levels, setLevels] = useState(0);

  // Pushes annotations that are overlapping up
  // After one iteration of pushes, it runs again to check if pushed annotations are overlapping again
  useEffect(() => {
    let levelsArr = new Array(annotations.length).fill(0);
    for (let k = 0; k < 5; k++) {
      let changed = false;
      for (let i = 0; i < annotations.length - 1; i++) {
        for (let j = i + 1; j < annotations.length; j++) {
          if (
            levelsArr[i] === k &&
            levelsArr[j] === k &&
            levelsArr[i] === levelsArr[j] &&
            activeAnnotations[i] &&
            activeAnnotations[j]
          ) {
            let anni = annotations[i];
            let annj = annotations[j];
            let overlap = annj.start <= anni.end && anni.start <= annj.end;
            if (overlap) {
              levelsArr[j] += 1;
              changed = true;
            }
          }
        }
      }
      if (!changed) break;
    }
    setLevels(levelsArr);
  }, [annotations, activeAnnotations]);

  //let annotations = useAnnotationStore((state) => state.annotations);
  const scale = useScaleStore((state) => state.scale);
  const shouldRender = (start, end) => start <= endTime && startTime <= end;

  let colorsIndex = [];
  let sum = 0;
  for (let i = 0; i < annotations.length; i++) {
    annotations[i].code
      .split('')
      .forEach((val) => (sum += val.charCodeAt(0) * 2));
    colorsIndex.push(sum % colorSelection.length);
    sum = 0;
  }

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
          shouldRender(ann.start, ann.end) &&
          activeAnnotations[i] && (
            <React.Fragment key={i}>
              <Annotation
                ann={ann}
                startTime={startTime}
                endTime={endTime}
                clippingPlanes={[startPlane, endPlane]}
                color={colorSelection[colorsIndex[i]]}
                level={levels[i]}
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
