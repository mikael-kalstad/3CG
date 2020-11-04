import React from 'react';
import styled from 'styled-components';

import AnnotationTimeLine from './AnnotationTimeLine';
import AddAnnotation from './AddAnnotation';
const Wrapper = styled.div`
  display: grid;
`;
const AnnotationMenu = (props) => {
  return (
    <Wrapper>
      <AddAnnotation />
      
      <AnnotationTimeLine />
    </Wrapper>
  );
};

export default AnnotationMenu;
