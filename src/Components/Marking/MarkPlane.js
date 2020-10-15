import React, { useState, useRef, useEffect } from 'react';

const MarkPlane = (props) => {
  const mesh = useRef();
  const [pressing, setPressing] = useState(false);

  /* Setting initial values */
  useEffect(() => {
    mesh.current.scale.set(props.width, 0.1, 115);
    mesh.current.position.x = props.middlePoint;
    mesh.current.position.y = -0.2;
    // mesh.current.material.color.setHex(0xff0000);
  }, []);

  const onPointerDown = (event) => {
    props.updateXStart(event.point.x);
    setPressing(true);
  };

  const onPointerUp = (event) => {
    setPressing(false);
    //console.log('Hello');
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
      onPointerOut={pressing && onPointerUp}
    >
      <boxBufferGeometry attach="geometry" />
      <meshPhongMaterial opacity={0} attach="material" transparent={true} />
    </mesh>
  );
};

export default MarkPlane;
