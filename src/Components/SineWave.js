import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const SineWave = (props) => {
  const [box, setBox] = useState(new THREE.BoxGeometry(1, 1, 1));
  const [material, setMaterial] = useState(
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  );
  const [cube, setCube] = useState(new THREE.Mesh(box, material));

  return <cube></cube>;
};

export default SineWave;
