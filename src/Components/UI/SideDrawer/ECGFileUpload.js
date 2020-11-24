import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from '@material-ui/core/styles';

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: 12,
    height: 54,
    width: '100%',
  },
}));

const ECGFileUpload = () => {
  const classes = useStyles();

  const handleChange = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
  };

  return (
    <>
      <Input type='file' id='ecg-upload-button' onChange={handleChange} />
      <label htmlFor='ecg-upload-button'>
        <Button
          variant='contained'
          component='span'
          color='primary'
          startIcon={<PublishIcon />}
          className={classes.button}
        >
          Upload ECG-datafile
        </Button>
      </label>
    </>
  );
};

export default ECGFileUpload;
