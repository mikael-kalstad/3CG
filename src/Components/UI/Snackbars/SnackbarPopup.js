import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { useSnackbarStore } from '../../../Store';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const SnackbarPopup = (props) => {
  const [open, setOpen] = useState(true);
  const setSnackbar = useSnackbarStore((state) => state.setSnackbar);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      background: 'white',
    },
  }));

  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setSnackbar(null);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={props.timeout}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Alert onClose={handleClose} severity={props.type || null}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarPopup;
