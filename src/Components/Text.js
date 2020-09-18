import React from 'react';
import { Html } from 'drei';
import styled from 'styled-components';

const Title = styled.h1`
  width: 150px;
  font-size: 20px;
  padding-top: 10px;
  transform: translate3d(50%, 0, 0);
  text-align: #e5e5e5;
  border: 1px solid #575757;
  background: white;
  color: black;
  padding: 10px 15px;
  border-radius: 5px;
`;

const Text = (props) => {
  return (
    <group position={props.position}>
      <Html>
        <Title>{props.children}</Title>
      </Html>
    </group>
  );
};

export default Text;
