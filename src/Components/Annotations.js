import React, { useState, useEffect, useRef, Suspense } from 'react';
import Text from './Text';

const Annotations = (props) => {
  //console.log('timeprops', props.timeProps);
  return (
    <>
      <Text
        position={[5, 5, 5]}
        rotateToCamera={false}
        background={true}
        backgroundOpacity={0.4}
        backgroundColor={0x000000}
        backgroundScaleByText={1.5}
        textSize={2.4}
      >
        Hello!
      </Text>
    </>
  );
};

export default Annotations;
