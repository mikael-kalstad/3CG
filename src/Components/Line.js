import React, { useRef, useState, useMemo } from "react";
import { Canvas, extend, useThree, useResource } from "react-three-fiber";
import { DragControls } from "three/examples/jsm/controls/DragControls";

const Line = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const { camera, gl } = useThree();
  const [ref, object] = useResource();

  const points = useMemo(
    () => [
      new THREE.Vector3(-10, 0, 0),
      new THREE.Vector3(0, 10, 0),
      new THREE.Vector3(10, 0, 0),
    ],
    []
  );
  const onUpdate = useCallback((self) => self.setFromPoints(points), [points]);

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [2.5, 2.5, 2.5] : [2, 2, 2]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <line position={[0, -2.5, -10]} ref={ref}>
        <bufferGeometry attach="geometry" onUpdate={onUpdate} />
        <lineBasicMaterial
          attach="material"
          color={"#9c88ff"}
          linewidth={10}
          linecap={"round"}
          linejoin={"round"}
        />
      </line>
      <dragControls args={[[object], camera, gl.domElement]} />
      />
    </mesh>
  );
};

export default Line;
