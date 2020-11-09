import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  background: ${(props) => (props.active === props.i ? '#464646' : '#fff')};
  &:hover: {
    background: ${(props) =>
      props.active === props.i ? '#333' : 'rgba(255,255,255,0.8)'};
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 45px;
  margin: 15px 0;
  display: grid;
  grid-template-columns: ${(props) =>
    'repeat(' + props.numOfChildren + ', 1fr)'};
  border: 1px solid #464646;
  opacity: ${(props) => props.disabled && '0.7'};

  /* Add border to all childs but first */
  > * {
    border-left: 1px solid #464646;
  }

  & ${Container}:nth-child(1) {
    border-left: none;
  }
`;

const SelectBetween = (props) => (
  <Wrapper disabled={props.disabled} numOfChildren={props.selectTexts.length}>
    {props.selectTexts.map((text, i) => (
      <Container
        disabled={props.disabled}
        i={i}
        key={text + i}
        active={props.active}
        onClick={() =>
          !props.disabled && props.active !== i && props.onClick(i)
        }
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
