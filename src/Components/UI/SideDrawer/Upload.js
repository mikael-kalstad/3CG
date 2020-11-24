import React, { useState } from 'react';
import ECGFileUpload from './ECGFileUpload';
import AnnotationFileUpload from './AnnotationFileUpload';
import styled from 'styled-components';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import InfoDialog from '../InfoDialog';
import JSONPretty from 'react-json-pretty';
var JSONPrettyMon = require('react-json-pretty/dist/monikai');

const ClickAbleText = styled.p`
  color: #3f51b5;
  cursor: pointer;
  font-size: 0.75rem;

  :hover {
    text-decoration: underline;
  }
`;

const Text = styled.p``;

const MarginWrapper = styled.div`
  margin: 24px;
  margin-top: 10px;
`;

const jsonEcgExample = {
  sample_rate: 500,
  duration: 11.0,
  samples: {
    I: [-0.038, -0.039, '...'],
    II: [-0.032, 0.029, '...'],
    III: [-0.038, -0.039, '...'],
    aVR: [0.058, 0.033, '...'],
    aVL: [-0.038, -0.039, '...'],
    V1: [-0.018, 0.039, '...'],
    V2: [-0.008, 0.019, '...'],
    V3: [-0.134, 0.039, '...'],
    V4: [0.128, -0.039, '...'],
    V5: [0.075, -0.039, '...'],
    V6: [-0.032, -0.039, '...'],
  },
};

const jsonAnnotationExample = [
  {
    onset: 'start time',
    duration: 'start time + duration = end time',
    text: 'explanation in text',
    code: 'diagnosis code',
  },
  {
    onset: '00:00:0.70',
    duration: 0.342,
    text: 'brady tachy syndrome',
    code: 'BTS',
  },
];
console.log(JSONPrettyMon);

const Upload = () => {
  const [showDialog, setShowDialog] = useState(false);
  // 0 = File structure for ecg data, 1 = File structure for annotation data
  const [structureInfoType, setStructureInfoType] = useState(0);
  const toggleDialog = () => setShowDialog((prevState) => !prevState);

  const stuctureType = structureInfoType === 0 ? 'ecg data' : 'annotation data';
  let content = (
    <>
      <Text>JSON example of the file structure for {stuctureType}</Text>
      <JSONPretty
        id='json-pretty'
        data={structureInfoType === 0 ? jsonEcgExample : jsonAnnotationExample}
      ></JSONPretty>
    </>
  );

  return (
    <>
      {showDialog && (
        <InfoDialog
          title={'File structure ' + stuctureType}
          content={content}
          handleClose={toggleDialog}
        />
      )}
      <FormHelperText>
        Upload or download files for ECG and annotations.
      </FormHelperText>

      <MarginWrapper>
        <Typography
          id='split-orientation-title'
          gutterBottom
          style={{ marginTop: '40px' }}
        >
          ECG File
        </Typography>
        <FormHelperText style={{ margin: '15px 0' }}>
          Upload a file with data for the 3D-visualization of ECG-signals.
        </FormHelperText>
        <ClickAbleText
          onClick={() => {
            toggleDialog();
            setStructureInfoType(0);
          }}
        >
          File structure
        </ClickAbleText>
        <ECGFileUpload />

        <Typography
          id='split-orientation-title'
          gutterBottom
          style={{ marginTop: '40px' }}
        >
          Annotation Files
        </Typography>
        <FormHelperText style={{ margin: '15px 0' }}>
          Upload a file with data for the annotations. User- and AI-annotations
          should be in seperate datafiles.
        </FormHelperText>
        <ClickAbleText
          onClick={() => {
            toggleDialog();
            setStructureInfoType(1);
          }}
        >
          File structure
        </ClickAbleText>
        <AnnotationFileUpload />
      </MarginWrapper>
    </>
  );
};

export default Upload;
