import React from 'react';
import ECGFileUpload from './ECGFileUpload';
import AnnotationFileUpload from './AnnotationFileUpload';
import styled from 'styled-components';
const Wrapper = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h3`
  margin: 5px 10px;
`;
const FileUpload = (props) => {
  return (
    <Wrapper>
      <Title>ECG-file</Title>
      <ECGFileUpload />
      <Title>Annotation-files</Title>
      <AnnotationFileUpload />
    </Wrapper>
  );
};

export default FileUpload;
