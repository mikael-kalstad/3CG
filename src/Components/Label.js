import React from 'react';
import { Html } from 'drei';
import styled from 'styled-components';

const Title = styled.p`
  color: white;
`;

const Label = (props) => {
  return (
    <group position={props.position}>
      <Html>
        <Title>{props.children}</Title>
      </Html>
    </group>
  );
};

export default Label;
