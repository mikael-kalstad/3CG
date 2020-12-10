import React, { useState } from 'react';
import styled from 'styled-components';
import { useAnnotationStore, useUploadStore } from '../../../Store';
import { annotationService } from '../../../Services/AnnotationService';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import NoteAdd from '@material-ui/icons/NoteAdd';
import { makeStyles } from '@material-ui/core/styles';
import ConfirmDialog from '../ConfirmDialog';
import { ToggleButton } from '@material-ui/lab';

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

  const [showDialog, setShowDialog] = useState(false);
  const toggleDialog = () => setShowDialog((state) => !state);
  // 0 = User annotation, 1 = AI annotation
  const [annotationType, setAnnotationType] = useState(0);
  const [file, setFile] = useState(null);

  const classes = useStyles();

  const validateJSONFormat = (json) => {
    if (!Array.isArray(json)) return false;

    if (
      !json[0].hasOwnProperty('onset') ||
      !json[0].hasOwnProperty('duration') ||
      !json[0].hasOwnProperty('code') ||
      !json[0].hasOwnProperty('text')
    ) {
      return false;
    }
    if (
      typeof json[0].onset !== 'string' ||
      typeof json[0].duration !== 'number' ||
      typeof json[0].code !== 'string' ||
      typeof json[0].text !== 'string'
    ) {
      return false;
    }
    return true;
  };

  const deleteAiAnnotations = () => {
    let aiAnnotationsIndices = [];
    useAnnotationStore
      .getState()
      .annotations.forEach((e, i) =>
        e.ai ? aiAnnotationsIndices.push(i) : null
      ); // Get indices of ai-annotations
    useAnnotationStore.getState().deleteAnnotations(aiAnnotationsIndices);
  };

  const deleteUserAnnotations = () => {
    let userAnnotationsIndices = [];
    useAnnotationStore
      .getState()
      .annotations.forEach((e, i) =>
        e.ai ? null : userAnnotationsIndices.push(i)
      ); // Get indices of user-annotations
    useAnnotationStore.getState().deleteAnnotations(userAnnotationsIndices);
  };

  const handleUserAnnotationUpload = (e) => {
    setAnnotationType(0);
    setFile(e.target.files[0]);
    toggleDialog();
  };

  const handleUserAnnotationClick = () => {
    let reader = new FileReader();
    reader.onloadend = () => {
      let json;
      try {
        json = JSON.parse(reader.result);
      } catch (e) {}
      if (validateJSONFormat(json)) {
        let uploadedAnnotations = annotationService.formatFile(json, false);
        for (let i = 0; i < uploadedAnnotations.length; i++) {
          addAnnotation(uploadedAnnotations[i]);
        }
      } else {
        alert('This file is not supported');
      }
    };
    if (file !== undefined) {
      deleteUserAnnotations();
      reader.readAsText(file);
    }
  };

  const handleAiAnnotationUpload = (e) => {
    setAnnotationType(1);
    setFile(e.target.files[0]);
    toggleDialog();
  };

  const handleAiAnnotationClick = () => {
    let reader = new FileReader();
    reader.onloadend = () => {
      let json;
      try {
        json = JSON.parse(reader.result);
      } catch (e) {}
      if (validateJSONFormat(json)) {
        let uploadedAnnotations = annotationService.formatFile(json, true);
        for (let i = 0; i < uploadedAnnotations.length; i++) {
          addAnnotation(uploadedAnnotations[i]);
        }
      } else {
        alert('This file is not supported');
      }
    };
    if (file !== undefined) {
      deleteAiAnnotations();
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

  const handleClick = () => {
    if (annotationType === 0) handleUserAnnotationClick();
    else if (annotationType === 1) handleAiAnnotationClick();

    toggleDialog();
  };

  return (
    <>
      {showDialog && (
        <ConfirmDialog
          title='Are you sure?'
          content='Do you want to upload a new annotation datafile? This will replace the current data. Make sure to download the current annotation datafile if you want to save this data before uploading a new datafile.'
          actionText='Yes, replace datafile'
          handleClick={handleClick}
          handleClose={toggleDialog}
        />
      )}
      <Input
        type='file'
        id='user-annotation-upload-uploadButton'
        onChange={handleUserAnnotationUpload}
      />
      <label htmlFor='user-annotation-upload-uploadButton'>
        <Button
          variant='contained'
          color='primary'
          component='span'
          startIcon={<NoteAdd />}
          className={classes.uploadButton}
          aria-label='Upload user-annotations'
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
        aria-label='Download user-annotations'
      >
        Download User Annotations
      </Button>

      <Input
        type='file'
        id='ai-annotation-upload-uploadButton'
        onChange={handleAiAnnotationUpload}
      />
      <label htmlFor='ai-annotation-upload-uploadButton'>
        <Button
          variant='contained'
          color='primary'
          component='span'
          startIcon={<NoteAdd />}
          className={classes.uploadButton}
          aria-label='Upload ai-annotations'
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
        aria-label='Download ai-annotations'
      >
        Download Ai Annotations
      </Button>
    </>
  );
};

export default AnnotationFileUpload;
