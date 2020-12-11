import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import {
  useAnnotationStore,
  useInspectStore,
  useModeStore,
  useTimelineOptionsStore,
  useTimeStore,
} from '../../../Store';
import Text from '../Text';
import { dataService } from '../../../Services/DataService';

const channelNames = dataService.getChannelNamesArray();

const TimeGrid = (props) => {
  let n = 50;
  // Fetch initial time state
  const startTime = useTimeStore((state) => state.startTime);
  const endTime = useTimeStore((state) => state.endTime);

  let a = (endTime - startTime) * 5;

  let graphLength = 5;

  if (a > 5) {
    graphLength = Math.ceil(a);
  }

  // i < 12
  //
  let xPoints = [];
  for (let i = 0; i < 2; i++) {
    let m = i * 110;
    xPoints.push(new THREE.Vector3(0, 0, m));
    xPoints.push(new THREE.Vector3(n * graphLength, 0, m));
    xPoints.push(new THREE.Vector3(0, 0, m));
  }
  let xLinesGeo = new THREE.BufferGeometry().setFromPoints(xPoints);

  let yPoints = [];
  for (let i = 0; i < graphLength + 1; i++) {
    let m = i * 50;
    yPoints.push(new THREE.Vector3(m, 0, 0));
    yPoints.push(new THREE.Vector3(m, 0, n * 2.2));
    yPoints.push(new THREE.Vector3(m, 0, 0));
  }
  let yLinesGeo = new THREE.BufferGeometry().setFromPoints(yPoints);

  /*
  const material = new THREE.LineDashedMaterial({
    color: 0xffffff,
    linewidth: 3,
    scale: 1,
    dashSize: 3,
    gapSize: 3,
  });
  */
  const material = new THREE.MeshNormalMaterial({
    opacity: 0.2,
  });
  const xLines = new THREE.LineSegments(xLinesGeo, material);
  const yLines = new THREE.LineSegments(yLinesGeo, material);
  /*
  xLines.computeLineDistances();
  yLines.computeLineDistances();
  */
  // Conditional rendering to turn grid on/off
  const gridMode = useModeStore((state) => state.gridMode);
  const inspected = useInspectStore((state) => state.inspected);

  const position = [0, -100, -55];
  const scale = [0.8, 1, 1];

  if (!gridMode || inspected !== -1) {
    return <></>;
  }

  return (
    <Suspense fallback={null}>
      <group>
        <primitive object={xLines} position={position} scale={scale} />
        <primitive object={yLines} position={position} scale={scale} />
      </group>
    </Suspense>
  );
};

export default TimeGrid;
