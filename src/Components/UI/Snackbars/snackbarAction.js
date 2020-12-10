import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

// A snackbar similar to snackbarPopup component, only with an action button.
const SnackbarAction = (props) => {
  const [open, setOpen] = useState(true);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      background: 'white',
    },

    button: {
      backgroundColor: '#93bc6e',
      '&:hover': {
        backgroundColor: '#7aab4f',
      },
      color: '#fff',
      marginRight: 20,
    },
    closeButton: {
      marginRight: 10,
      color: '#fff',
    },
    dontShowButton: {
      position: 'absolute',
      left: 10,
      color: '#fff',
    },
  }));

  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={props.timeout}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        message={props.message}
        action={
          <>
            <Button
              size='small'
              onClick={() => {
                handleClose();
                if (props.dontShowClick) props.dontShowClick();
              }}
              className={classes.dontShowButton}
              aria-label="Don't show again"
            >
              DON'T SHOW AGAIN
            </Button>
            <Button
              size='small'
              onClick={handleClose}
              className={classes.closeButton}
              aria-label='Close'
            >
              CLOSE
            </Button>
            <Button
              size='small'
              onClick={props.onClick}
              className={classes.button}
              aria-label={props.actionName}
            >
              {props.actionName}
            </Button>
          </>
        }
      />
    </div>
  );
};

export default SnackbarAction;
