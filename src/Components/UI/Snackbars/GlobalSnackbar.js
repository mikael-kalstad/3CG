import React from 'react';
import { useSnackbarStore } from '../../../Store';

// Only one global snackbar should be rendered, so snackbars don't overlap.
// By putting this logic (and listening to store changes) in its own component,
// unecessary re-renders of the Layout component and all of its childs can be avoided.
const GlobalSnackbar = () => {
  // Get global snackbar component from store
  const snackbar = useSnackbarStore((state) => state.snackbar);

  // This should be the only snackbar rendered in application!
  return <>{snackbar}</>;
};

export default GlobalSnackbar;
