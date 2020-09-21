import React, { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';


const Grid = (props) => {

    let xSize = 100;
    let ySize = 100;
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
    geometry.setAttribute("position", positionAttribute);

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
    const grid = useMemo(() => new THREE.LineSegments(geometry, new THREE.MeshNormalMaterial({
        color: '#ff0000',
        opacity: 0.12

    })));

    return (
        <primitive object={grid} position={[0, 0, 0.55]} scale={[100, 100, 1]} />
        //<primitive object={grid} position={props.position} scale={[100, 100, 1]} />
    );
};

export default Grid;