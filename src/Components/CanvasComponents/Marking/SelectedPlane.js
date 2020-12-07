import React, { useEffect, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { dataService } from '../../../Services/DataService';
import { useScaleStore, useTimeStore } from '../../../Store';

const TRANSPARANCY_PLANE = 0.3;
const YSCALE = 0.2;
const sampleRate = dataService.getSampleRate();

const SelectedPlane = (props) => {
  const startTime = useTimeStore((state) => state.startTime);
  const endTime = useTimeStore((state) => state.endTime);
  const scale = useScaleStore((state) => state.scale);
  const planeMesh = useRef();

  // Set initial values
  useEffect(() => {
    planeMesh.current.scale.set(0, YSCALE, 150);
    planeMesh.current.position.y = YSCALE / 2;
    planeMesh.current.material.color.setHex(0xffffff);
  }, []);

  useFrame(() => {
    if (shouldRender(props.selected)) {
      // Calculate size and position of plane
      planeMesh.current.scale.x =
        (props.selected[1] - props.selected[0]) * sampleRate * scale;
      let start = (props.selected[0] - startTime) * sampleRate * scale;
      let end = (props.selected[1] - startTime) * sampleRate * scale;
      let middlePos = start + (end - start) / 2;
      planeMesh.current.position.x = middlePos;
      planeMesh.current.visible = true;
    } else {
      planeMesh.current.visible = false;
    }
  });

  // Check if selected area is big enough
  const shouldRender = (selected) => {
    return Math.abs(selected[1] - selected[0]) > 0.001;
  };

  // Two planes for clipping the selected plane
  let startPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
  let endPlane = new THREE.Plane(
    new THREE.Vector3(-1, 0, 0),
    (endTime - startTime) * sampleRate * scale
  );
  return (
    <group>
      <mesh ref={planeMesh}>
        <boxBufferGeometry attach='geometry' />
        <meshPhongMaterial
          opacity={shouldRender(props.selected) ? TRANSPARANCY_PLANE : 0}
          attach='material'
          transparent={true}
          clippingPlanes={[startPlane, endPlane]}
        />
      </mesh>
    </group>
  );
};

export default SelectedPlane;
