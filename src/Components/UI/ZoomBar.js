import Slider from "@material-ui/core/Slider";
import React from "react";
import { useCameraStore } from "../../Store";

const ZoomBar = (props) => {
  const [zoomValue, setZoomValue] = useCameraStore((state) => [
    state.zoomValue,
    state.setZoomValue,
  ]);

  const SliderStyle = {
    width: "50px",
    height: "50px",
    top: "20px",
    right: "150px",
    position: "absolute",
    color: "white",
  };

  return (
    <Slider
      orientation="vertical"
      defaultValue={1}
      style={SliderStyle}
      min={0.5}
      max={17}
      step={0.05}
      aria-labelledby="vertical-slider"
      onChange={(e, val) => setZoomValue(val)}
      value={zoomValue}
      color={"white"}
    />
  );
};

export default ZoomBar;
