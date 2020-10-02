import React, { useState, useEffect, useRef, Suspense } from 'react';
import Text from './Text';

const Annotations = (props) => {
  //console.log('timeprops', props.timeProps);
  return (
    <>
      <Text
        position={[80 / 2, 25, -60]}
        background={true}
        backgroundOpacity={0.3}
        backgroundColor={'0xff0000'}
        backgroundSize={[80, 50]}
        textSize={2.4}
        rotation={[0, 0, 0]}
        depth={0.3}
      >
        Pasienten har ikke betalt skatt
      </Text>
    </>
  );
};

export default Annotations;
