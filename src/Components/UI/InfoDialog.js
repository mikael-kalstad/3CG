import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const InfoDialog = (props) => (
  <Dialog
    disableEscapeKeyDown
    open={true}
    onClose={props.handleClose}
    maxWidth='sm'
    fullWidth={true}
  >
    <DialogTitle>{props.title}</DialogTitle>

    <DialogContent>{props.content}</DialogContent>

    <DialogActions>
      <Button onClick={props.handleClose} color='primary'>
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default InfoDialog;
