import React, { useState, useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useUpdate, useFrame, extend } from 'react-three-fiber';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
const TRANSPARANCY_PLANE = 0.3;
const TRANSPARANCY_LINE = 0.6;
const YSCALE = 0.2;
const WIDTH = 115;

extend({ MeshLine, MeshLineMaterial });

const SelectedPlane = (props) => {
  const mesh = useRef();

  useEffect(() => {
    mesh.current.scale.set(0, YSCALE, 115);
    mesh.current.position.y = YSCALE / 2;
    mesh.current.material.color.setHex(0xffffff);
  }, []);

  useEffect(() => {
    if (Math.abs(props.selected[1] - props.selected[0]) > 0.001) {
      mesh.current.scale.x = props.selected[1] - props.selected[0];
      mesh.current.position.x =
        props.selected[0] + (props.selected[1] - props.selected[0]) / 2;
    }
  }, [props.selected]);

  const calculateEdges = () => {
    let points = [];
    points.push(props.selected[0], 0, WIDTH / 2);
    points.push(props.selected[0], 0, -WIDTH / 2);
    points.push(props.selected[1], 0, -WIDTH / 2);
    points.push(props.selected[1], 0, WIDTH / 2);
    points.push(props.selected[0], 0, WIDTH / 2);

    return points;
  };

  const shouldRender = (selected) => {
    return Math.abs(selected[1] - selected[0]) > 0.001;
  };
  const points = [];
  for (let j = 0; j < Math.PI * 5; j += (2 * Math.PI) / 100) {
    points.push(Math.cos(j) * 10, Math.sin(j) * 10, j);
  }
  // const line = new MeshLine();
  // line.setPoints(points);
  // const material = new MeshLineMaterial({ color: 0xffffff });
  // const object = THREE.Mesh(line, material);

  return (
    <group>
      <mesh ref={mesh}>
        <boxBufferGeometry attach="geometry" />
        <meshPhongMaterial
          opacity={shouldRender(props.selected) ? TRANSPARANCY_PLANE : 0}
          attach="material"
          transparent={true}
        />
      </mesh>
      <mesh>
        <meshLine attach="geometry" points={calculateEdges()} />
        <meshLineMaterial
          attach="material"
          transparent={true}
          opacity={shouldRender(props.selected) ? TRANSPARANCY_LINE : 0}
          depthTest={false}
          lineWidth={1}
          color={0xffffff}
          // dashArray={0.04}
          // dashRatio={0.4}
          sizeAttenuation={true}
        />
      </mesh>
    </group>
  );
};

export default SelectedPlane;
