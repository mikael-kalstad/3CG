import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';

const TextWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
`;

const annotationTypes = require('../../res/annotationTypes.json');

const useStyles = makeStyles({
  option: {
    display: 'grid',
    gridTemplateColumns: '25% 75%',
    gridGap: '10px',
    fontSize: 14,
    '& > span': {
      fontSize: 16,
      fontWeight: 700,
    },
  },
});

const AnnotationlistDropdown = (props) => {
  const classes = useStyles();

  return (
    <Autocomplete
      id='annotationType-select-demo'
      style={{ width: '100%', height: '40px', maxWidth: '100%' }}
      onChange={(e, v) => props.onChange(e, v)}
      options={annotationTypes}
      multiple
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) =>
        option['Abbreviation'] +
        ' ' +
        option['Dx'] +
        ' ' +
        option['SNOMED CT Code'].toString()
      }
      renderTags={(tagValue, getTagProps) =>
        tagValue.length === 1
          ? tagValue[0]['Abbreviation'] + ' ' + tagValue[0]['Dx']
          : tagValue.map((option, index) => (
              <Chip
                label={option['Abbreviation']}
                {...getTagProps({ index })}
                color='primary'
              />
            ))
      }
      renderOption={(option) => (
        <React.Fragment>
          <span>{option['Abbreviation']}</span>
          <TextWrapper>{option['Dx']} </TextWrapper>
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Choose one or more diagnoses'
          variant='outlined'
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default AnnotationlistDropdown;
