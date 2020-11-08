import React, { useState } from 'react';
import styled from 'styled-components';
// import { useAnnotationStore } from '../../../Store';

const Wrapper = styled.div``;

const UploadButton = styled.div`
  &:hover {
    filter: brightness(85%);
    cursor: pointer;
  }
  height: 38px;
  background-color: lightgray;
  border-radius: 10px;
  display: grid;
  align-items: center;
  font-size: 18px;
  padding: 10px;
  margin: 13px 30px 13px 30px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
`;

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const AnnotationFileUpload = (props) => {
  const [aiUploaded, setAiUploaded] = useState(false);
  // const [annotations, addAnnotation] = useAnnotationStore((state) => [
  //   state.annotations,
  //   state.addAnnotation,
  // ]);
  const handleUserAnnotationUpload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      console.log('Done reading');
      console.log(reader.result);
      // let json = JSON.parse(reader.result);
    };
    reader.readAsText(file);
  };

  const handleAiAnnotationUpload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      console.log('Done reading');
      console.log(reader.result);
      // let json = JSON.parse(reader.result);
    };
    if (file !== undefined) {
      reader.readAsText(file);
    }
    setAiUploaded(true);
  };
  return (
    <Wrapper>
      <Input
        type='file'
        id='user-annotation-upload-button'
        onChange={handleUserAnnotationUpload}
      />
      <label htmlFor='user-annotation-upload-button'>
        <UploadButton>Upload user-annotations</UploadButton>
      </label>

      <Input
        type='file'
        id='ai-annotation-upload-button'
        onChange={handleAiAnnotationUpload}
      />
      <label htmlFor='ai-annotation-upload-button'>
        <UploadButton style={{ backgroundColor: aiUploaded ? 'blue' : '' }}>
          Upload AI-annotations
        </UploadButton>
      </label>
    </Wrapper>
  );
};

export default AnnotationFileUpload;
