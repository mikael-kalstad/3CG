import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Fade from "@material-ui/core/Fade";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles({
  root: {},
  title: {
    fontSize: 14,
    color: "white",
  },
  pos: {
    marginBottom: 30,
    zIndex: 1000,
  },
});

const AnnotationPopper = (props) => {
  const classes = useStyles();

  return (
    <Popper
      open={Boolean(props.anchor)}
      anchorEl={props.anchor}
      placement={"top"}
      transition
      modifiers={{ offset: { enabled: true, offset: "0, 8" } }}
      className={classes.pos}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={200}>
          <Card className={classes.root}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Annotation: {props.ann.code}
              </Typography>
              <Typography variant="h5" component="h2">
                {props.ann.text}
              </Typography>
              <Typography variant="subtitle2">
                From: {props.ann.start.toFixed(2) + "s"}
              </Typography>
              <Typography variant="subtitle2">
                To: {props.ann.end.toFixed(2) + "s"}
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      )}
    </Popper>
  );
};

export default AnnotationPopper;
