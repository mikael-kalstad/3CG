import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import {
  useAnnotationStore,
  useModeStore,
  useTimelineOptionsStore,
  useTimeStore,
  useScaleStore,
  useInspectStore,
} from '../../../Store';
import Text from '../../Text';
import { dataService } from '../../../Services/DataService';

// The standard grid for ECG uses 0.04s per square in the x-axis, and 0.1mV in the y-axis.
// The mV in this grid ranges from -1.0mV to +1.0mV
// This grid shows that standard using a 25x20 grid that scales with the timeline.

const Grid = (props) => {
  let n = 50;
  // Fetch initial time state
  const startTime = useTimeStore((state) => state.startTime);
  const endTime = useTimeStore((state) => state.endTime);
  const inspected = useInspectStore((state) => state.inspected);
  const [vChannelScaling, vChannelScaleFactor] = useScaleStore((state) => [
    state.vChannelScaling,
    state.vChannelScaleFactor,
  ]);
  let inspectedChannel =
    inspected === -1 ? '' : dataService.getChannelNamesArray()[inspected];
  let textScale = 1;
  console.log(inspectedChannel);
  if (inspected !== -1 && inspectedChannel[0] == 'V' && vChannelScaling) {
    textScale = 1 / vChannelScaleFactor;
  }

  let a = (endTime - startTime) * 5;

  let graphLength = 5;

  if (a > 5) {
    graphLength = Math.ceil(a);
  }

  let xPoints = [];
  for (let i = 0; i < 21; i++) {
    if ((i + 5) % 5 == 0) {
      continue;
    }
    let m = i * 10;
    xPoints.push(new THREE.Vector3(0, m, 0));
    xPoints.push(new THREE.Vector3(n * graphLength, m, 0));
    xPoints.push(new THREE.Vector3(0, m, 0));
  }
  let xLinesGeo = new THREE.BufferGeometry().setFromPoints(xPoints);

  let yPoints = [];
  for (let i = 0; i < graphLength * 5 + 1; i++) {
    if ((i + 5) % 5 == 0) {
      continue;
    }
    let m = i * 10;
    yPoints.push(new THREE.Vector3(m, 0, 0));
    yPoints.push(new THREE.Vector3(m, n * 4, 0));
    yPoints.push(new THREE.Vector3(m, 0, 0));
  }
  let yLinesGeo = new THREE.BufferGeometry().setFromPoints(yPoints);

  let oxPoints = [];
  for (let i = 0; i < 5; i++) {
    let m = i * 50;
    oxPoints.push(new THREE.Vector3(0, m, 0));
    oxPoints.push(new THREE.Vector3(n * graphLength, m, 0));
    oxPoints.push(new THREE.Vector3(0, m, 0));
  }
  let oxLinesGeo = new THREE.BufferGeometry().setFromPoints(oxPoints);

  let oyPoints = [];
  for (let i = 0; i < graphLength + 1; i++) {
    let m = i * 50;
    oyPoints.push(new THREE.Vector3(m, 0, 0));
    oyPoints.push(new THREE.Vector3(m, n * 4, 0));
    oyPoints.push(new THREE.Vector3(m, 0, 0));
  }
  let oyLinesGeo = new THREE.BufferGeometry().setFromPoints(oyPoints);

  const material = new THREE.MeshNormalMaterial({
    color: 0xff0000,
    opacity: 0.12,
  });

  const material2 = new THREE.LineBasicMaterial({
    color: 0xff0000,
  });

  const xLines = new THREE.Line(xLinesGeo, material);
  const yLines = new THREE.Line(yLinesGeo, material);
  const oxLines = new THREE.Line(oxLinesGeo, material2);
  const oyLines = new THREE.Line(oyLinesGeo, material2);

  // Conditional rendering to turn grid on/off
  const gridMode = useModeStore((state) => state.gridMode);

  const position = [-104, -105, -0.5];
  const oPosition = [-104, -105, -0];
  const scale = [0.8, 1, 1];

  if (!gridMode) {
    return <></>;
  }

  return (
    <Suspense fallback={null}>
      <group position={props.position}>
        {[-2, -1, 0, 1, 2].map((e) => (
          <Text
            position={[-124, -5 + e * 50, 0]}
            rotateToCamera={true}
            background={true}
            backgroundOpacity={0.2}
            backgroundColor={0x000000}
            backgroundScaleByText={1.5}
            textSize={3.5}
          >
            {((textScale * e) / 2).toFixed(1) + ' mV'}
          </Text>
        ))}
        <primitive object={xLines} position={position} scale={scale} />
        <primitive object={yLines} position={position} scale={scale} />
        <primitive object={oxLines} position={oPosition} scale={scale} />
        <primitive object={oyLines} position={oPosition} scale={scale} />
      </group>
    </Suspense>
  );
};

export default Grid;
