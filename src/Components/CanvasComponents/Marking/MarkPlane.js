import React, { useEffect, useRef, useState } from 'react';
import { useMarkStore } from '../../../Store';

const MarkPlane = (props) => {
  const mesh = useRef();
  const [pressing, setPressing] = useState(false);

  /* Setting initial values */
  useEffect(() => {
    mesh.current.scale.set(props.width, 0.1, 3 * 115);
    mesh.current.position.x = props.middlePoint;
    mesh.current.position.y = -0.2;
    // mesh.current.material.color.setHex(0xff0000);
  }, [props.middlePoint, props.width]);

  const onPointerDown = (event) => {
    if (event.button == 0) {
      props.updateXStart(event.point.x);
      setPressing(true);
      useMarkStore.setState({ markingFinished: false });
    }
  };

  const finishMarking = () => {
    setPressing(false);

    useMarkStore.setState({ markingFinished: true });

    // Get non-reactive fresh states from markStore
    const startSelected = useMarkStore.getState().startSelected;
    const endSelected = useMarkStore.getState().endSelected;

    // Check if startSelected is larger than endSelected
    if (startSelected > endSelected) {
      // Swap values of the two states
      useMarkStore.setState({ startSelected: endSelected });
      useMarkStore.setState({ endSelected: startSelected });
    }
  };

  const onPointerUp = (event) => {
    if (event.button == 0) {
      finishMarking();
    }
  };

  const onPointerDrag = (event) => {
    props.updateXEnd(event.point.x);
  };

  const onPointerOut = () => {
    if (pressing) {
      finishMarking();
    }
  };

  return (
    <mesh
      ref={mesh}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={pressing && onPointerDrag}
      onPointerOut={onPointerOut}
    >
      <boxBufferGeometry attach='geometry' />
      <meshPhongMaterial opacity={0} attach='material' transparent={true} />
    </mesh>
  );
};

export default MarkPlane;
