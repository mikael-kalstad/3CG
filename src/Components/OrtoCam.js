import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { useModeStore } from "../Store";

const OrtoCam = () => {
  // Normal camera
  function PerspectiveCamera(props) {
    const ref = useRef();
    const { setDefaultCamera } = useThree();
    // Make the camera known to the system
    useEffect(() => setDefaultCamera(ref.current), [setDefaultCamera]);
    // Update it every frame
    useFrame(() => ref.current.updateMatrixWorld());
    return <perspectiveCamera ref={ref} {...props} />;
  }

  // Orthographic Camera
  function OrthographicCamera(props) {
    const ref = useRef();
    const { setDefaultCamera } = useThree();
    // Make the camera known to the system
    useEffect(() => setDefaultCamera(ref.current), [setDefaultCamera]);
    // Update it every frame
    useFrame(() => ref.current.updateMatrixWorld());
    return <orthographicCamera ref={ref} {...props} />;
  }

  //Conditional rendering to change between orthographic and perspective camera
  const ortoMode = useModeStore((state) => state.ortoMode);

  if (!ortoMode) {
    return <PerspectiveCamera position={[100, 80, 150]} zoom={1} />;
  }

  return <OrthographicCamera position={[100, 0, 100]} zoom={3} />;
};

export default OrtoCam;
