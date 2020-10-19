import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import Text from './Text';
import { useModeStore } from '../Store';



// The standard grid for ECG uses 0.04s per square in the x-axis, and 0.1mV in the y-axis.
// The mV in this grid ranges from 
// This grid shows that standard using a 25x20 grid, the scale which is set at the end of the code
// is 200 for both x and y. Position is 100 for x and 10 for y. Z-position is 55 for the I-channel (first).


const Grid = (props) => {
  let xSize = 26;
  //let xSize = 25;
  let ySize = 21;

  let xSize2 = 6
  let ySize2 = 5

  let zSize = 1;
  let zSize2 = 1;
  let n = xSize * ySize * zSize;
  let n2 = xSize2 * ySize2 * zSize2

  let geometry = new THREE.BufferGeometry();
  let geometry2 = new THREE.BufferGeometry();

  function mapTo3D(i) {
    let z = Math.floor(i / (xSize * ySize));
    i -= z * xSize * ySize;
    let y = Math.floor(i / xSize);
    let x = i % xSize;
    return { x: x, y: y, z: z };
  }

  function mapTo3D2(i2) {
    let z2 = Math.floor(i2 / (xSize2 * ySize2));
    i2 -= z2 * xSize2 * ySize2;
    let y2 = Math.floor(i2 / xSize2);
    let x2 = i2 % xSize2;
    return { x2: x2, y2: y2, z2: z2 };
  }

  function mapFrom3D(x, y, z) {
    return x + y * xSize + z * xSize * ySize;
  }

  function mapFrom3D2(x2, y2, z2) {
    return x2 + y2 * xSize2 + z2 * xSize2 * ySize2;
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

  let positions2 = [];
  for (let i2 = 0; i2 < n2; i2++) {
    let p2 = mapTo3D2(i2);
    positions2.push((p2.x2 - xSize2 / 2) / xSize2);
    positions2.push((p2.y2 - ySize2 / 2) / ySize2);
    positions2.push((p2.z2 - zSize2 / 2) / zSize2);
  }

  let positionAttribute2 = new THREE.Float32BufferAttribute(positions2, 3);
  geometry2.setAttribute('position', positionAttribute2);

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

  let indexPairs2 = [];
  for (let i2 = 0; i2 < n2; i2++) {
    let p2 = mapTo3D2(i2);
    if (p2.x2 + 1 < xSize2) {
      indexPairs2.push(i2);
      indexPairs2.push(mapFrom3D2(p2.x2 + 1, p2.y2, p2.z2));
    }
    if (p2.y2 + 1 < ySize2) {
      indexPairs2.push(i2);
      indexPairs2.push(mapFrom3D2(p2.x2, p2.y2 + 1, p2.z2));
    }
    if (p2.z2 + 1 < zSize2) {
      indexPairs2.push(i2);
      indexPairs2.push(mapFrom3D2(p2.x2, p2.y2, p2.z2 + 1));
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
  geometry2.setIndex(indexPairs2);
  const grid2 = useMemo(
    () =>
      new THREE.LineSegments(
        geometry2,
        new THREE.LineBasicMaterial({
          color: '#ff0000',
          //opacity: 0.12,
        })
      )
  );

  function PerspectiveCamera(props) {
    const ref = useRef()
    const { setDefaultCamera } = useThree()
    // Make the camera known to the system
    useEffect(() => void setDefaultCamera(ref.current), [])
    // Update it every frame
    useFrame(() => ref.current.updateMatrixWorld())
    return <perspectiveCamera ref={ref} {...props} />
  }

  //Conditional rendering to turn on grid and change between orthographic and perspective camera
  const ortoMode = useModeStore((state) => state.ortoMode);
  if (!ortoMode) {
    return (
      <PerspectiveCamera position={[100, 80, 150]} zoom={1} />
    )
  }

  function OrthographicCamera(props) {
    const ref = useRef()
    const { setDefaultCamera } = useThree()
    // Make the camera known to the system
    useEffect(() => void setDefaultCamera(ref.current), [])
    // Update it every frame
    useFrame(() => ref.current.updateMatrixWorld())
    return <orthographicCamera ref={ref} {...props} />
  }

  return (
    <Suspense fallback={null}>
      <OrthographicCamera position={[100, 0, 100]} zoom={3} />
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
        position={[-10, 50, -75]}
        rotateToCamera={true}
        background={true}
        backgroundOpacity={0.2}
        backgroundColor={0x000000}
        backgroundScaleByText={1.5}
        textSize={3.5}
      >
        0.5 mV
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
        //front position z=55
        position={[104, 5, -54.6]}
        //Scale is 8.04*xSize, and 8.05*ySize
        scale={[208, 210, 1]}
      />
      <primitive
        object={grid2}
        //front position z=55
        position={[120, 25, -54.5]}
        //Scale is 8.04*xSize, and 8.05*ySize
        scale={[240, 250, 1]}
      />
    </Suspense>
  );
};

export default Grid;
