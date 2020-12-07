import React, { useState } from 'react';
import styled from 'styled-components';
import { dataService } from '../../../Services/DataService';
import { useUploadStore, useAnnotationStore } from '../../../Store';
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

  const validateJSONFormat = (json) => {
    // Check for properties
    if (
      !json.hasOwnProperty('rec_id') ||
      !json.hasOwnProperty('sample_rate') ||
      !json.hasOwnProperty('duration') ||
      !json.hasOwnProperty('samples')
    ) {
      return false;
    }
    // Check type of properties
    if (
      typeof json.rec_id !== 'string' ||
      typeof json.sample_rate !== 'number' ||
      typeof json.duration !== 'number' ||
      typeof json.samples !== 'object'
    ) {
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    toggleDialog();
    setFile(e.target.files[0]);
  };

  const handleClick = () => {
    toggleDialog();
    let reader = new FileReader();
    // After file has been read
    reader.onloadend = () => {
      let json;
      try {
        json = JSON.parse(reader.result);
      } catch (e) {}
      if (validateJSONFormat(json)) {
        dataService.setJSON(json);
        useUploadStore.getState().incrementUserUploadedECGFile();
        useAnnotationStore.getState().deleteAllAnnotations();
      } else {
        alert('This file is not supported');
      }
    };
    // Read current file
    if (file) reader.readAsText(file);
  };

  return (
    <>
      {showDialog && (
        <ConfirmDialog
          title='Are you sure?'
          content='Do you want to upload a new ECG datafile? This will replace the current data. All annotations will also be deleted. Make sure to download annotation files if you want to save this data before uploading this ECG datafile.'
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
