import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FaRobot, FaUserNurse } from 'react-icons/fa';
import styled from 'styled-components';

const useStyles = makeStyles({
  root: {},
  title: {
    fontSize: 14,
    color: 'white',
  },
  pos: {
    marginBottom: 30,
    zIndex: 1000,
  },
});

const TopRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  margin: 0;
  align-items: center;
`;

const iconStyle = {
  fontSize: '30px',
  justifySelf: 'right',
  color: '#000000aa',
};

const AnnotationPopper = (props) => {
  const classes = useStyles();

  return (
    <Popper
      open={Boolean(props.anchor)}
      anchorEl={props.anchor}
      placement={'top'}
      transition
      modifiers={{ offset: { enabled: true, offset: '0, 8' } }}
      className={classes.pos}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={200}>
          <Card className={classes.root}>
            <CardContent>
              <TopRow>
                <Typography
                  color='textSecondary'
                  gutterBottom
                  style={{ margin: 0 }}
                >
                  Annotation: {props.ann.data.Abbreviation}
                </Typography>
                {props.ann.ai ? (
                  <FaRobot style={iconStyle} />
                ) : (
                  <FaUserNurse style={iconStyle} />
                )}
              </TopRow>
              <Typography variant='h5' component='h2'>
                {props.ann.data.Dx}
              </Typography>
              <Typography variant='subtitle2'>
                From: {props.ann.start.toFixed(2) + 's'}
              </Typography>
              <Typography variant='subtitle2'>
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
