import React from "react";
import { useTimelineOptionsStore } from "../../../Store";
import FormHelperText from "@material-ui/core/FormHelperText";
import SettingsCheck from "../SettingsCheck";

const TimeLineOptions = () => {
  const store = useTimelineOptionsStore();
  console.log(store);

  return (
    <div>
      <FormHelperText>
        Options that will change how the timeline works and/or looks.
      </FormHelperText>

      <SettingsCheck
        state={store.showAnnotations}
        onClick={store.toggleShowAnnotations}
        name="annotations-show"
        label="Show annotations"
        description="Show annotations in background of timeline"
      />

      <SettingsCheck
        state={store.showTimeOnDrag}
        onClick={store.toggleShowTimeOnDrag}
        name="time-in-timeline-show"
        label="Show time on drag"
        description="Show current start time when dragging/scrolling in timeline"
      />

      <SettingsCheck
        state={store.showTotalTime}
        onClick={store.toggleShowTotalTime}
        name="time-total-show"
        label="Show time under timeline"
        description="Show total time underneath the timeline"
      />
    </div>
  );
};

export default TimeLineOptions;
