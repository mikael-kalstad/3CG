import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  chip: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const SettingsCheck = (props) => {
  const classes = useStyles();

  return (
    <FormControl component='fieldset' className={classes.formControl}>
      <FormControlLabel
        key={props.name}
        control={
          <Checkbox
            checked={props.state}
            onChange={() => props.onClick()}
            name={props.name}
            aria-label='Toggle checkbox'
          />
        }
        label={props.label}
        disabled={props.disabled}
      />
      <FormHelperText>{props.description}</FormHelperText>
    </FormControl>
  );
};

export default SettingsCheck;
