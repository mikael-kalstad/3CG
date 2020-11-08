import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  margin: 15px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #464646;
  opacity: ${(props) => props.disabled && '0.7'};
`;

const Container = styled.div`
  padding: 10px;
  display: grid;
  justify-items: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  background: ${(props) => (props.active === props.i ? '#464646' : '#fff')};
  :hover: {
    background: ${(props) =>
      props.active === props.i ? '#333' : 'rgba(255,255,255,0.8)'};
  }
`;

const SelectBetween = (props) => (
  <Wrapper disabled={props.disabled}>
    {props.selectTexts.map((text, i) => (
      <Container
        disabled={props.disabled}
        i={i}
        key={text + i}
        active={props.active}
        onClick={() => !props.disabled && props.onClick(i)}
      >
        <Typography
          variant='h6'
          component='h2'
          style={{
            fontSize: '16px',
            color: props.active === i && '#fff',
          }}
        >
          {text}
        </Typography>
      </Container>
    ))}
  </Wrapper>
);

export default SelectBetween;
