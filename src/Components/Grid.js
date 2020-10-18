import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import Text from './Text';



// The standard grid for ECG uses 0.04s per square in the x-axis, and 0.1mV in the y-axis.
// The mV in this grid ranges from 
// This grid shows that standard using a 25x20 grid, the scale which is set at the end of the code
// is 200 for both x and y. Position is 100 for x and 10 for y. Z-position is 55 for the I-channel (first).
// 

const Grid = (props) => {
  let xSize = 25;
  let ySize = 20;

  let zSize = 1;
  let n = xSize * ySize * zSize;

  let geometry = new THREE.BufferGeometry();

  function mapTo3D(i) {
    let z = Math.floor(i / (xSize * ySize));
    i -= z * xSize * ySize;
    let y = Math.floor(i / xSize);
    let x = i % xSize;
    return { x: x, y: y, z: z };
  }

  function mapFrom3D(x, y, z) {
    return x + y * xSize + z * xSize * ySize;
  }

  let positions = [];
  for (let i = 0; i < n; i++) {
    let p = mapTo3D(i);
    positions.push((p.x - xSize / 2) / xSize);
    positions.push((p.y - ySize / 2) / ySize);
    positions.push((p.z - zSize / 2) / zSize);
  }
  let positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
  geometry.setAttribute('position', positionAttribute);

  let indexPairs = [];
  for (let i = 0; i < n; i++) {
    let p = mapTo3D(i);
    if (p.x + 1 < xSize) {
      indexPairs.push(i);
      indexPairs.push(mapFrom3D(p.x + 1, p.y, p.z));
    }
    if (p.y + 1 < ySize) {
      indexPairs.push(i);
      indexPairs.push(mapFrom3D(p.x, p.y + 1, p.z));
    }
    if (p.z + 1 < zSize) {
      indexPairs.push(i);
      indexPairs.push(mapFrom3D(p.x, p.y, p.z + 1));
    }
  }
  geometry.setIndex(indexPairs);
  const grid = useMemo(
    () =>
      new THREE.LineSegments(
        geometry,
        new THREE.MeshNormalMaterial({
          color: '#ff0000',
          opacity: 0.12,
        })
      )
  );

  const grid2 = useMemo(
    () =>
      new THREE.LineSegments(
        geometry,
        new THREE.MeshNormalMaterial({
          color: '#FF0000',
          //opacity: 0.12,
        })
      )
  );

  return (
    <Suspense fallback={null}>
      <Text
        position={[-10, 105, -75]}
        rotateToCamera={true}
        background={true}
        backgroundOpacity={0.2}
        backgroundColor={0x000000}
        backgroundScaleByText={1.5}
        textSize={3.5}
      >
        1.0 mV
      </Text>
      <Text
        position={[-10, 0, -75]}
        rotateToCamera={true}
        background={true}
        backgroundOpacity={0.2}
        backgroundColor={0x000000}
        backgroundScaleByText={1.5}
        textSize={3.5}
      >
        0 mV
      </Text>
      <primitive
        object={grid}
        //position={[100, 10, 55]}
        position={[100, 10, -54.6]}
        //scale={[xSize, ySize, 1]}
        scale={[200, 200, 1]}
      />
    </Suspense>
  );
};

export default Grid;
