import React, { useEffect, useRef, useState } from 'react';
import Popper from '@material-ui/core/Popper';

import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {},
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 0,
  },
});

const AnnotationPopper = (props) => {
  const id = props.open ? 'popper' : undefined;
  const classes = useStyles();
  return (
    <Popper
      open={Boolean(props.anchor)}
      anchorEl={props.anchor}
      placement={'top'}
      transition
      modifiers={{ offset: { enabled: true, offset: '0, 8' } }}
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
                From: {props.ann.start.toFixed(2) + 's'}
              </Typography>
              <Typography variant="subtitle2">
                To: {props.ann.end.toFixed(2) + 's'}
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      )}
    </Popper>
  );
};

export default AnnotationPopper;
