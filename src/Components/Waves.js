import React from "react";
import Line from "./Line";

const Waves = (props) => {
  return (
    <>
      {props.data.map((channel) => (
        <Line data={channel} key={channel} />
      ))}
    </>
  );
};

export default Waves;
