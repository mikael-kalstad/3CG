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
import {
  useAnnotationStore,
  useMarkStore,
  useModeStore,
  useSnackbarStore,
} from '../../Store';
import { dataService } from '../../Services/DataService';
import AnnotationListDropdown from './AnnotationListDropdown';
import SelectedTimeInputs from './SelectedTimeInputs';
import SnackbarPopup from './Snackbars/SnackbarPopup';

const duration = dataService.getDuration();

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
  const setSnackbar = useSnackbarStore((state) => state.setSnackbar);
  const toggleMarkMode = useModeStore((state) => state.toggleMarkMode);

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

    // Reset snackbar
    setSnackbar(null);

    let snackbar = (
      <SnackbarPopup
        message={
          'Success! ' +
          (inputValue.length === 1
            ? 'Annotation added'
            : inputValue.length + ' annotations added')
        }
        timeout={2500}
        type='success'
      />
    );

    // Show success snackbar
    setSnackbar(snackbar);
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
              endSelected - startSelected < 0 ||
              startSelected > duration ||
              endSelected > duration
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
