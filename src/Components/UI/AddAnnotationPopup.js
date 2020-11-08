import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import AnnotationListDropdown from './AnnotationListDropdown';
import { useMarkStore, useAnnotationStore, useModeStore } from '../../Store';
import SelectedTimeInputs from './SelectedTimeInputs';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    width: 320,
    paddingBottom: 60,
  },
  title: {
    fontWeight: 700,
    margin: '30px 0 15px 0',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const AddAnnotationPopup = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [inputValue, setInputValue] = useState(null);
  const addAnnotation = useAnnotationStore((state) => state.addAnnotation);
  const [markMode, toggleMarkMode] = useModeStore((state) => [
    state.markMode,
    state.toggleMarkMode,
  ]);

  const [
    startSelected,
    setStartSelected,
    endSelected,
    setEndSelected,
  ] = useMarkStore((state) => [
    state.startSelected,
    state.setStartSelected,
    state.endSelected,
    state.setEndSelected,
  ]);

  const handleDropdownChange = (e, v) => setInputValue(v);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose && props.onClose();
  };

  const handleSubmit = () => {
    // Add all annotations selected
    inputValue.forEach((a) => {
      addAnnotation({
        start: Number(startSelected),
        end: Number(endSelected),
        code: a['Abbreviation'],
        text: a['Dx'],
      });
    });

    // Reset selected values
    setStartSelected(-1);
    setEndSelected(-1);

    // Disable markMode
    toggleMarkMode();

    // Close dialog
    handleClose();
  };

  return (
    <div>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Add annotation</DialogTitle>

        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <FormHelperText>
                Fill out the form to add annotation. Adding several diagnosis
                will create seperate annotations for the timeframe selected.
              </FormHelperText>

              <Typography className={classes.title}>
                Start- and end-time*
              </Typography>
              <SelectedTimeInputs />

              <Typography className={classes.title}>Diagnosis*</Typography>
              <AnnotationListDropdown
                labelId={'annotation-dropdown-label'}
                onChange={handleDropdownChange}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              inputValue === null ||
              startSelected < 0 ||
              endSelected < 0 ||
              endSelected - startSelected < 0
            }
            color='primary'
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddAnnotationPopup;
