import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialog = (props) => (
  <Dialog
    disableEscapeKeyDown
    open={true}
    onClose={props.handleClose}
    maxWidth='sm'
    fullWidth={true}
  >
    <DialogTitle>{props.title}</DialogTitle>

    <DialogContent style={{ fontSize: 14 }}>{props.content}</DialogContent>

    <DialogActions style={{ padding: 20 }}>
      <Button onClick={props.handleClose} color='primary'>
        Close
      </Button>
      <Button onClick={props.handleClick} variant='contained' color='primary'>
        {props.actionText}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
