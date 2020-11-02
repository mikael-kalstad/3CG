import React from 'react';
import styled from 'styled-components';
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
  border-radius: 10px;
  display: grid;
  align-items: center;
  font-size: 30px;
  padding: 20px;
  margin: 10px 30px 10px 30px;
  font-weight: bold;
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

const ECGFileUpload = (props) => {
  const handleChange = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      console.log('Done reading');
      console.log(reader.result);
      // let json = JSON.parse(reader.result);
    };
    reader.readAsText(file);
  };
  return (
    <Wrapper>
      <Input type="file" id="ecg-upload-button" onChange={handleChange} />
      <label htmlFor="ecg-upload-button">
        <UploadButton>Upload ECG-datafile</UploadButton>
      </label>
    </Wrapper>
  );
};

export default ECGFileUpload;
