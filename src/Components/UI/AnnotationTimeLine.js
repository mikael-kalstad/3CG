import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Typography from "@material-ui/core/Typography";
import AnnotationCard from "./AnnotationCard";
import { useAnnotationStore } from "../../Store";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/core/styles";
import SelectAllOrNoneBtns from "./Buttons/SelectAllOrNoneBtns";
import styled from "styled-components";
import FormHelperText from "@material-ui/core/FormHelperText";

const SelectWrapper = styled.div`
  margin: 24px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));

const AnnotationTimeline = () => {
  const [
    annotations,
    activeAnnotations,
    toggleAnnotation,
    toggleAllAnnotations,
  ] = useAnnotationStore((state) => [
    state.annotations,
    state.activeAnnotations,
    state.toggleAnnotation,
    state.toggleAllAnnotations,
  ]);

  const classes = useStyles();

  return (
    <div>
      <FormHelperText>
        Toggle annotations on/off. Click on annotation card to see annotation in
        3D visualization
      </FormHelperText>

      <Timeline align="left" style={{ padding: "6px 0px" }}>
        {annotations &&
          annotations.map((a, i) => (
            <TimelineItem key={i}>
              <TimelineOppositeContent
                className={classes.root}
              ></TimelineOppositeContent>
              <TimelineSeparator>
                <Typography variant="body2" color="textSecondary">
                  {/* {a.start} */} 20s
                </Typography>

                <TimelineDot
                  color="primary"
                  style={{ cursor: "pointer", padding: 0 }}
                  onClick={() => toggleAnnotation(i)}
                >
                  {
                    <CircleCheckedFilled
                      style={{ opacity: activeAnnotations[i] ? 1 : 0 }}
                    />
                  }
                </TimelineDot>

                {/* Only render connector if it is not the last item in the list */}
                {i !== annotations.length - 1 && <TimelineConnector />}
              </TimelineSeparator>

              <TimelineContent>
                <AnnotationCard title={a.code} text={a.text} />
              </TimelineContent>
            </TimelineItem>
          ))}
      </Timeline>

      <SelectWrapper>
        <SelectAllOrNoneBtns
          toggleAll={toggleAllAnnotations}
          type="annotations"
        />
      </SelectWrapper>
    </div>
  );
};

export default AnnotationTimeline;
