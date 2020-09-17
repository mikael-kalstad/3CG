import React from 'react';
import Line from './Wave';

const Waves = (props) => {
  console.log('In waves', props);
  return (
    <>
      {props.data.map((channel) => (
        <Line data={channel} key={channel} />
      ))}
    </>
  );
};

export default Waves;
