import React from 'react';
import styled from 'styled-components';
import { dataService } from '../../../Services/DataService';
import { useUploadStore } from '../../../Store';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from '@material-ui/core/styles';
// import { dataService } from '../../../Services/DataService';

const Wrapper = styled.div``;

const UploadButton = styled.div`
  &:hover {
    filter: brightness(85%);
    cursor: pointer;
  }
  height: 90px;
  align-self: center;
  background-color: lightgray;
  border-radius: 7px;
  display: grid;
  align-items: center;
  font-size: 30px;
  padding: 20px;
  margin: 10px 30px 10px 30px;
  font-weight: bold;
  color: #333333;
  text-align: center;
`;

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
    reader.onloadend = () => {
      console.log('Done reading');
      console.log(reader.result);
      let json = JSON.parse(reader.result);
      dataService.setJSON(json);
      useUploadStore.getState().setUserUploadedECGFile(true);
    };
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
