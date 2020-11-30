import React from 'react';
import {
  useChannelStore,
  useScaleStore,
  useInspectStore,
} from '../../../Store';
import { dataService } from '../../../Services/DataService';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SelectAllOrNoneBtns from '../Buttons/SelectAllOrNoneBtns';
import FormHelperText from '@material-ui/core/FormHelperText';
import SettingsCheck from '../Settings/SettingsCheck';
import SettingsSlider from '../Settings/SettingsSlider';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const ChannelElementWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 3fr 2fr;
  align-content: center;
  margin: 5px 0px 5px 0px;
`;

const channelNames = dataService.getChannelNamesArray();

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  chip: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const InspectButtonStyle = {
  height: '35px',
  alignSelf: 'center',
};

const ChannelList = () => {
  const [
    activeChannels,
    toggleChannel,
    toggleAllChannels,
    setActiveChannels,
    setActiveChannelsPlaceholder,
  ] = useChannelStore((state) => [
    state.activeChannels,
    state.toggleChannel,
    state.toggleAllChannels,
    state.setActiveChannels,
    state.setActiveChannelsPlaceholder,
  ]);

  const [
    vChannelScaling,
    toggleVChannelScaling,
    vChannelScaleFactor,
    setVChannelScaleFactor,
  ] = useScaleStore((state) => [
    state.vChannelScaling,
    state.toggleVChannelScaling,
    state.vChannelScaleFactor,
    state.setVChannelScaleFactor,
  ]);

  const [inspected, setInspected] = useInspectStore((state) => [
    state.inspected,
    state.setInspected,
  ]);

  const classes = useStyles();

  
    '%c [Checlist] is rendering (sideDrawer child)',
    'background: #111; color: #ebd31c'
  );

  const inspectChannel = (channelIndex) => {
    setActiveChannelsPlaceholder(activeChannels);
    setInspected(channelIndex);
    let newActiveChannels = [];
    for (let i = 0; i < activeChannels.length; i++) {
      newActiveChannels.push(i === channelIndex);
    }
    setActiveChannels(newActiveChannels);
  };

  return (
    <div className={classes.root}>
      <FormHelperText>
        Click on checkbox to toggle channel on/off
      </FormHelperText>

      <FormControl
        component='fieldset'
        className={classes.formControl}
        disabled={inspected !== -1}
      >
        <FormGroup>
          {activeChannels.map((state, i) => (
            <React.Fragment key={i}>
              <ChannelElementWrapper>
                <FormControlLabel
                  key={channelNames[i]}
                  control={
                    <Checkbox
                      checked={state}
                      onChange={() => toggleChannel(i)}
                      name={channelNames[i]}
                    />
                  }
                  label={channelNames[i]}
                />
                <Button
                  variant='contained'
                  style={InspectButtonStyle}
                  disableElevation={true}
                  onClick={() => inspectChannel(i)}
                  disabled={inspected !== -1}
                >
                  Inspect
                </Button>
              </ChannelElementWrapper>
            </React.Fragment>
          ))}
        </FormGroup>

        {/* Buttons with select all or none functionality */}
        <SelectAllOrNoneBtns
          toggleAll={toggleAllChannels}
          type='channels'
          disabled={inspected !== -1}
        />
      </FormControl>

      <SettingsCheck
        state={vChannelScaling}
        onClick={toggleVChannelScaling}
        name='vScaling-checkbox'
        label='Scale V-channels'
        description={
          'Scale V1-V6 channels down to a factor of ' +
          vChannelScaleFactor +
          ' from the original'
        }
      />

      <SettingsSlider
        title={'V-channels scale factor'}
        description={
          'Use the slider to select the scale factor of the V-channels from the original, if the option is enabled'
        }
        value={vChannelScaling ? vChannelScaleFactor : 1}
        minValue={0.05}
        maxValue={1}
        stepSize={0.05}
        disabled={!vChannelScaling}
        onChange={(e, v) => setVChannelScaleFactor(v)}
      />
    </div>
  );
};

export default ChannelList;
