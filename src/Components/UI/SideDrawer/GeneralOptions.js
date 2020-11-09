import React from 'react';
import SettingsSlider from '../Settings/SettingsSlider';
import SettingsCheck from '../Settings/SettingsCheck';
import { useCameraStore, useSnackbarStore } from '../../../Store';

const GeneralOptions = () => {
  const [fov, setFov] = useCameraStore((state) => [state.fov, state.setFov]);
  const [showSnackbar, toggleShowSnackbar] = useSnackbarStore((state) => [
    state.showSnackbar,
    state.toggleShowSnackbar,
  ]);

  return (
    <>
      <SettingsSlider
        title={'Camera FOV'}
        description={'Use the slider to select the field of view of the camera'}
        value={fov}
        minValue={50}
        maxValue={120}
        stepSize={10}
        onChange={(e, v) => setFov(v)}
      />

      <SettingsCheck
        state={showSnackbar}
        onClick={toggleShowSnackbar}
        name='show-snackbar-option'
        label='Show snackbar'
        description='Show snackbar popup with messages. E.g. when changing playback speed'
      />
    </>
  );
};

export default GeneralOptions;
