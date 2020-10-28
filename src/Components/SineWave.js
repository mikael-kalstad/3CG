import React, {
  useMemo,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";
import * as THREE from "three";

const SineWave = (props) => {
  const [timeSteps, setTimeSteps] = useState(new Array(1000).fill(0));
  const [ySteps, setYSteps] = useState([]);

  const [active, setActive] = useState(0);
  const activeRef = useRef(active);
  useEffect(() => {
    setTimeSteps(timeSteps.map((val, i) => i / 10));
  }, []);
  useEffect(() => setYSteps(timeSteps.map((val, i) => Math.sin(val) * 5)), [
    timeSteps,
  ]);

  const points = useMemo(
    () => ySteps.map((val, i) => new THREE.Vector3(timeSteps[i], ySteps[i], 0)),
    [ySteps]
  );

  const onUpdate = useCallback((self) => self.setFromPoints(points), [points]);

  return (
    <group>
      <line position={[0, 0, 0]}>
        <bufferGeometry attach="geometry" onUpdate={onUpdate} />
        <lineBasicMaterial
          attach="material"
          color={"#9c88ff"}
          linewidth={10}
          linecap={"round"}
          linejoin={"round"}
        />
      </line>
    </group>
  );
};

export default SineWave;
