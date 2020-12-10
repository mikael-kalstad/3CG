import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const PaperStyle = styled(Paper)`
  width: 150px;
  padding: 10px;
  margin-bottom: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
  border: 1px solid transparent;
  &:hover {
    border: 1px solid rgba(63, 81, 181, 0.6);
  }
  cursor: pointer;
  transition: box-shadow 50ms ease;
`;

const AnnotationCard = (props) => {
  return (
    <PaperStyle onClick={() => props.onClick(props.index)}>
      <Typography variant='h6' component='h2' style={{ fontSize: '20px' }}>
        {props.title}
      </Typography>
      <Typography style={{ fontSize: '12px' }}>{props.text}</Typography>
    </PaperStyle>
  );
};

export default AnnotationCard;
