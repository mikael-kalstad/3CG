import React, { useState, useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useUpdate, useFrame, extend } from 'react-three-fiber';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import { dataService } from '../../Services/DataService';
import { Vector3 } from 'three';
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
  // let points = dataService.getPointsNearestTime(1 / 500);
  // console.log(points);
  // let vectors = new Float32Array(points.length * 3);
  // console.log(vectors);
  // for (let i = 0; i < points.length; i++) {
  //   console.log(i);
  //   vectors[3 * i] = i * 0.4;
  //   vectors[3 * i + 1] = points[i]*20;
  //   vectors[3 * i + 2] = i * 10 - (10 * (points.length - 1)) / 2;
  // }
  // console.log(vectors);

  // var geom = new THREE.Geometry();
  // var v1 = new THREE.Vector3(0, 0, 0);
  // var v2 = new THREE.Vector3(0, 5, 0);
  // var v3 = new THREE.Vector3(0, 5, 5);

  // geom.vertices.push(v1);
  // geom.vertices.push(v2);
  // geom.vertices.push(v3);

  // geom.faces.push(new THREE.Face3(0, 1, 2));

  // var object = new THREE.Mesh(geom, new THREE.MeshNormalMaterial());

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
      {/* <mesh>
        <bufferGeometry attach="geometry" vertices={vectors} />
        <meshPhongMaterial attach="material" />
      </mesh> */}
      {/* <primitive object={object} position={[0, 0, 0.55]} scale={[1, 1, 1]} />; */}
    </group>
  );
};

export default SelectedPlane;
