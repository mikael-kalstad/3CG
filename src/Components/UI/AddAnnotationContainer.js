import React, { useEffect, useRef, useState } from 'react';
import {
  useAnnotationStore,
  useMarkStore,
  useModeStore,
  useRenderTypeStore,
  useSnackbarStore,
  useTimeStore,
} from '../../Store';
import AddAnnotationPopup from './AddAnnotationPopup';
import SnackbarAction from './Snackbars/snackbarAction';
import SnackbarPopup from './Snackbars/SnackbarPopup';

const AddAnnotationContainer = () => {
  const [displayPopup, setDisplayPopup] = useState(false);
  const activeRenders = useRenderTypeStore((state) => state.activeRenders);
  const markMode = useModeStore((state) => state.markMode);
  const markingFinished = useMarkStore((state) => state.markingFinished);
  const setSnackbar = useSnackbarStore((state) => state.setSnackbar);
  const [
    showAddAnnotationPopup,
    toggleShowAddAnnotationPopup,
  ] = useAnnotationStore((state) => [
    state.showAddAnnotationPopup,
    state.toggleShowAddAnnotationPopup,
  ]);

  // Fetch initial time state
  const startTimeRef = useRef(useTimeStore.getState().startTime);
  const endTimeRef = useRef(useTimeStore.getState().endTime);

  // Fetch initial mark-selected states
  const startSelectedRef = useRef(useMarkStore.getState().startSelected);
  const endSelectedRef = useRef(useMarkStore.getState().endSelected);

  // Connect to the store on mount, disconnect on unmount, catch state-changes in a reference
  useEffect(() => {
    useTimeStore.subscribe(
      (startTime) => (startTimeRef.current = startTime),
      (state) => state.startTime
    );

    useTimeStore.subscribe(
      (endTime) => (endTimeRef.current = endTime),
      (state) => state.endTime
    );

    useMarkStore.subscribe(
      (startSelected) => (startSelectedRef.current = startSelected),
      (state) => state.startSelected
    );

    useMarkStore.subscribe(
      (endSelected) => (endSelectedRef.current = endSelected),
      (state) => state.endSelected
    );
  }, []);

  // Check if array contains string (case insensitive)
  const arrayContainsString = (arr, string) => {
    return arr.some((el) => el.toLowerCase() === string.toLowerCase());
  };

  const togglePopup = () => setDisplayPopup((currentState) => !currentState);

  let snackbarToRender = [];

  if (
    markMode &&
    showAddAnnotationPopup &&
    markingFinished &&
    (endSelectedRef.current - startSelectedRef.current > 0 ||
      startSelectedRef.current - endSelectedRef.current > 0)
  )
    snackbarToRender = (
      <SnackbarAction
        timeout={null}
        actionName='ADD ANNOTATION'
        onClick={togglePopup}
        dontShowClick={toggleShowAddAnnotationPopup}
        message={
          'Area marked, click add annotation to selected area. Annotation can also be added in menu in the annotations section'
        }
      />
    );
  else if (
    showAddAnnotationPopup &&
    markMode &&
    !arrayContainsString(activeRenders, 'ecg')
  )
    snackbarToRender = (
      <SnackbarAction
        timeout={null}
        actionName='ADD ANNOTATION'
        onClick={togglePopup}
        dontShowClick={toggleShowAddAnnotationPopup}
        message='Mark mode can only be used with click and drag in 3D with the ecg render view. Click to add annotation using start- and end-time'
      />
    );
  else if (markMode)
    snackbarToRender = (
      <SnackbarPopup
        timeout={5000}
        message='Mark mode active, click and drag with mouse in ecg to select annotation area'
        type='info'
      />
    );

  if (!displayPopup && markMode) setSnackbar(snackbarToRender);
  else if (displayPopup && markMode) setSnackbar(null);

  return displayPopup && <AddAnnotationPopup onClose={togglePopup} />;
};

export default AddAnnotationContainer;
