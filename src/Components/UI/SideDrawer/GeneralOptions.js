import React from 'react';
import SettingsSlider from '../Settings/SettingsSlider';
import { useCameraStore } from '../../../Store';

const GeneralOptions = () => {
  const [fov, setFov] = useCameraStore((state) => [state.fov, state.setFov]);

  return (
    <SettingsSlider
      title={'Camera FOV'}
      description={'Use the slider to select the field of view of the camera'}
      value={fov}
      minValue={50}
      maxValue={120}
      stepSize={10}
      onChange={(e, v) => setFov(v)}
    />
  );
};

export default GeneralOptions;
