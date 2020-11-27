import React, { useEffect, useState } from 'react';
import { useFrame, useUpdate } from 'react-three-fiber';
import * as THREE from 'three';
import { dataService } from '../Services/DataService';
import { useTimeStore, useInspectStore } from '../Store';

const sampleRate = dataService.getSampleRate();

const CircularVisualization = (props) => {
  let points; //= dataService.getSamplesByChannel('I');
  const [renderPoints, setRenderPoints] = useState([]);
  const startTime = useTimeStore((state) => state.startTime);
  const endTime = useTimeStore((state) => state.endTime);
  const inspected = useInspectStore((state) => state.inspected);
  if (inspected !== -1) {
    let channelNames = dataService.getChannelNamesArray();
    points = dataService.getSamplesByChannel(channelNames[inspected]);
  } else {
    points = dataService.getSamplesByChannel('I');
  }

  useEffect(() => {
    let newPoints = [];
    let theta = 0;
    let r = 30;
    for (let i = 0; i < points.length; i++) {
      theta = (i / 150) * Math.PI;
      newPoints.push(
        new THREE.Vector3(Math.cos(theta) * r, points[i], Math.sin(theta) * r)
      );
      setRenderPoints(newPoints);
    }
  }, [points]);

  useFrame(() => {
    geom.current.setDrawRange(
      startTime * sampleRate,
      (endTime - startTime) * sampleRate
    );
  });

  const geom = useUpdate(
    (self) => {
      // Set specific range which is to be shown
      self.setDrawRange(0 * sampleRate, 1 * sampleRate);

      // Set initial points
      self.setFromPoints(renderPoints);

      // Set initial colors
      //updateColors(self, startTimeRef.current, endTimeRef.current);

      self.verticesNeedUpdate = true;
    },
    [renderPoints, startTime, endTime]
  );

  return (
    <group position={[90, 0, 0]}>
      <line scale={[1, 100, 1]} color={0xffffff}>
        <bufferGeometry attach='geometry' ref={geom} />
        <lineBasicMaterial
          name='line'
          attach='material'
          linewidth={1000}
          linecap={'round'}
          linejoin={'round'}
          needsUpdate={true}
        />
      </line>
    </group>
  );
};

export default CircularVisualization;
