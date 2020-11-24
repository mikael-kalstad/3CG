import React, { useState } from 'react';
import styled from 'styled-components';
import { useAnnotationStore, useUploadStore } from '../../../Store';
import { annotationService } from '../../../Services/AnnotationService';
import Button from '@material-ui/core/Button';

const Wrapper = styled.div``;

const UploadButton = styled.div`
  &:hover {
    cursor: ${(props) => (props.uploaded ? 'default' : 'pointer')};
    filter: ${(props) =>
      props.uploaded ? 'brightness(100%)' : 'brightness(85%)'};
  }
  height: 38px;
  border-radius: 7px;
  display: grid;
  align-items: center;
  font-size: 16px;
  padding: 10px;
  margin: 13px 30px 13px 30px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;

  background-color: ${(props) => (props.uploaded ? '#2ecc71' : 'lightgray')};
  color: ${(props) => (props.uploaded ? '#34495e' : '#333333')};
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
  const [annotations, addAnnotation] = useAnnotationStore((state) => [
    state.annotations,
    state.addAnnotation,
  ]);

  const [
    userAnnotationsUploaded,
    setUserAnnotationsUploaded,
    aiAnnotationsUploaded,
    setAiAnnotationsUploaded,
  ] = useUploadStore((state) => [
    state.userAnnotationsUploaded,
    state.setUserAnnotationsUploaded,
    state.aiAnnotationsUploaded,
    state.setAiAnnotationsUploaded,
  ]);

  const validateJSONFormat = (json) => {
    if (!Array.isArray(json)) return false;

    if (
      !json[0].hasOwnProperty('onset') &&
      !json[0].hasOwnProperty('duration') &&
      !json[0].hasOwnProperty('code') &&
      !json[0].hasOwnProperty('text')
    ) {
      return false;
    }
    if (
      typeof json[0].onset !== 'string' &&
      typeof json[0].duration !== 'number' &&
      typeof json[0].code !== 'string' &&
      typeof json[0].text !== 'string'
    ) {
      return false;
    }
    return true;
  };
  const handleUserAnnotationUpload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      let json = JSON.parse(reader.result);
      if (validateJSONFormat(json)) {
        let uploadedAnnotations = annotationService.formatFile(json, false);
        for (let i = 0; i < uploadedAnnotations.length; i++) {
          addAnnotation(uploadedAnnotations[i]);
        }
        setUserAnnotationsUploaded(true);
      } else {
        alert('This file is not supported');
      }
    };
    if (file !== undefined) {
      reader.readAsText(file);
    }
  };

  const handleAiAnnotationUpload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      let json = JSON.parse(reader.result);
      if (validateJSONFormat(json)) {
        let uploadedAnnotations = annotationService.formatFile(json, true);
        for (let i = 0; i < uploadedAnnotations.length; i++) {
          addAnnotation(uploadedAnnotations[i]);
        }
        setAiAnnotationsUploaded(true);
      } else {
        alert('This file is not supported');
      }
    };
    if (file !== undefined) {
      reader.readAsText(file);
    }
  };

  const handleUserDownload = (e) => {
    let downloadAnchor = document.createElement('a');
    let nonAiAnnotations = annotationService.formatBackToFile(
      annotations.filter((e) => e.ai === false)
    );
    let file =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(nonAiAnnotations));
    downloadAnchor.setAttribute('href', file);
    downloadAnchor.setAttribute('download', 'annotations.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleAiDownload = (e) => {
    let downloadAnchor = document.createElement('a');
    let nonAiAnnotations = annotationService.formatBackToFile(
      annotations.filter((e) => e.ai === true)
    );
    let file =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(nonAiAnnotations));
    downloadAnchor.setAttribute('href', file);
    downloadAnchor.setAttribute('download', 'aiannotations.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <Wrapper>
      <Input
        type='file'
        id='user-annotation-upload-button'
        onChange={handleUserAnnotationUpload}
        disabled={userAnnotationsUploaded}
      />
      <label htmlFor='user-annotation-upload-button'>
        <UploadButton uploaded={userAnnotationsUploaded}>
          {userAnnotationsUploaded
            ? 'User-annotations uploaded'
            : 'Upload user-annotations'}
        </UploadButton>
      </label>
      <Button onClick={handleUserDownload}>Download User Annotations</Button>

      <Input
        type='file'
        id='ai-annotation-upload-button'
        onChange={handleAiAnnotationUpload}
        disabled={aiAnnotationsUploaded}
      />
      <label htmlFor='ai-annotation-upload-button'>
        <UploadButton uploaded={aiAnnotationsUploaded}>
          {aiAnnotationsUploaded
            ? 'AI-annotations uploaded'
            : 'Upload AI-annotations'}
        </UploadButton>
      </label>
      <Button onClick={handleAiDownload}>Download Ai Annotations</Button>
    </Wrapper>
  );
};

export default AnnotationFileUpload;
