import React, { useState } from 'react';
import styled from 'styled-components';
import { useAnnotationStore, useUploadStore } from '../../../Store';
import { annotationService } from '../../../Services/AnnotationService';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import NoteAdd from '@material-ui/icons/NoteAdd';
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
  uploadButton: {
    fontSize: 12,
  },
  downloadButton: {
    fontSize: 12,
    margin: '15px 0',
  },
}));

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

  const classes = useStyles();

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
    <>
      <Input
        type='file'
        id='user-annotation-upload-uploadButton'
        onChange={handleUserAnnotationUpload}
        disabled={userAnnotationsUploaded}
      />
      <label htmlFor='user-annotation-upload-uploadButton'>
        {/* <UploadButton uploaded={userAnnotationsUploaded}>
          {userAnnotationsUploaded
            ? 'User-annotations uploaded'
            : 'Upload user-annotations'}
        </UploadButton> */}
        <Button
          variant='contained'
          color='primary'
          component='span'
          startIcon={<NoteAdd />}
          className={classes.uploadButton}
        >
          Upload user annotation datafile
        </Button>
      </label>
      <Button
        variant='outlined'
        color='primary'
        component='span'
        startIcon={<GetAppIcon />}
        className={classes.downloadButton}
        onClick={handleUserDownload}
      >
        Download User Annotations
      </Button>

      <Input
        type='file'
        id='ai-annotation-upload-uploadButton'
        onChange={handleAiAnnotationUpload}
        disabled={aiAnnotationsUploaded}
      />
      <label htmlFor='ai-annotation-upload-uploadButton'>
        {/* <UploadButton uploaded={aiAnnotationsUploaded}>
          {aiAnnotationsUploaded
            ? 'AI-annotations uploaded'
            : 'Upload AI-annotations'}
        </UploadButton> */}
        <Button
          variant='contained'
          color='primary'
          component='span'
          startIcon={<NoteAdd />}
          className={classes.uploadButton}
        >
          Upload AI annotation datafile
        </Button>
      </label>
      <Button
        variant='outlined'
        color='primary'
        component='span'
        startIcon={<GetAppIcon />}
        className={classes.downloadButton}
        onClick={handleAiDownload}
      >
        Download Ai Annotations
      </Button>
    </>
  );
};

export default AnnotationFileUpload;
