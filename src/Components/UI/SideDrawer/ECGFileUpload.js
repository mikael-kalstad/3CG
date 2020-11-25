import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from '@material-ui/core/styles';
import ConfirmDialog from '../ConfirmDialog';

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
  const [showDialog, setShowDialog] = useState(false);
  const toggleDialog = () => setShowDialog((state) => !state);

  const [file, setFile] = useState(null);
  const classes = useStyles();

  const handleChange = (e) => {
    toggleDialog();
    setFile(e.target.files[0]);
  };

  const handleClick = () => {
    toggleDialog();
    let reader = new FileReader();
    if (file) reader.readAsText(file);
  };

  return (
    <>
      {showDialog && (
        <ConfirmDialog
          title='Are you sure?'
          content='Do you want to upload a new ecg datafile? This will replace the current data. All annotations will also be deleted. Make sure to download annotation files if you want to save this data before uploading this ecg datafile.'
          actionText='Yes, replace datafile'
          handleClick={handleClick}
          handleClose={toggleDialog}
        />
      )}
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
