import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { dataService } from '../../../Services/DataService';
import {
  useAnnotationStore,
  useScaleStore,
  useTimeStore,
} from '../../..//Store';
import Annotation from './Annotation';

const sampleRate = dataService.getSampleRate();

const AnnotationRenderer = (props) => {
  let startTime = useTimeStore((state) => state.startTime);
  let endTime = useTimeStore((state) => state.endTime);
  const activeAnnotations = useAnnotationStore(
    (state) => state.activeAnnotations
  );
  const annotations = useAnnotationStore((state) => state.annotations);
  const [levels, setLevels] = useState(new Array(annotations.length).fill(0));

  // Pushes annotations that are overlapping up
  // After one iteration of pushes, it runs again to check if pushed annotations are overlapping again
  useEffect(() => {
    let levelsArr = new Array(annotations.length).fill(0);
    for (let k = 0; k < 8; k++) {
      let changed = false;
      // Iterate over every relation between annotations
      for (let i = 0; i < annotations.length - 1; i++) {
        for (let j = i + 1; j < annotations.length; j++) {
          if (
            levelsArr[i] === k && // Not changed in current iteration
            levelsArr[j] === k && // Not changed in current iteration
            levelsArr[i] === levelsArr[j] && // Both at same level
            activeAnnotations[i] &&
            activeAnnotations[j] // Both active
          ) {
            let anni = annotations[i];
            let annj = annotations[j];
            let overlap = annj.start <= anni.end && anni.start <= annj.end;
            if (overlap) {
              levelsArr[j] += 1; // Push one annotation up
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
          activeAnnotations[i] && (
            <React.Fragment key={i}>
              <Annotation
                ann={ann}
                startTime={startTime}
                endTime={endTime}
                clippingPlanes={[startPlane, endPlane]}
                color={0xffffff}
                level={levels[i] !== undefined ? levels[i] : 0}
              />
            </React.Fragment>
          )
      )}
    </>
  );
};

export default AnnotationRenderer;
