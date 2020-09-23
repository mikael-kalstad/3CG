import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useUpdate, useFrame } from 'react-three-fiber';
import { SentimentSatisfied } from '@material-ui/icons';

const MarkPlane = (props) => {
  const mesh = useRef();
  const [pressing, setPressing] = useState(false);

  /* Setting initial values */
  useEffect(() => {
    mesh.current.scale.set(props.width, 0.1, 115);
    mesh.current.position.x = props.middlePoint;
    //mesh.current.material.color.setHex(0xff0000);
  }, []);

  const onPointerDown = (event) => {
    props.updateXStart(event.point.x);
    setPressing(true);
  };

  const onPointerUp = (event) => {
    setPressing(false);
  };

  const onPointerDrag = (event) => {
    props.updateXEnd(event.point.x);
  };

  return (
    <mesh
      ref={mesh}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={pressing && onPointerDrag}
    >
      <boxBufferGeometry attach="geometry" />
      <meshPhongMaterial opacity={0} attach="material" transparent={true} />
    </mesh>
  );
};

export default MarkPlane;
