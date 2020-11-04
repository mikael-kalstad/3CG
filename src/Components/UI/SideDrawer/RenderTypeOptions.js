import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';
import { useRenderTypeStore } from '../../../Store';
import Dropdown from '../Dropdown';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SelectBetween from '../SelectBetween';
import Typography from '@material-ui/core/Typography';
import SettingsCheck from '../SettingsCheck';

const Wrapper = styled.div`
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 15px;
  align-items: end;
`;

const MarginWrapper = styled.div`
  margin: 24px;
`;

const MAX_NUM_OF_RENDER_VIEWS = 3;

const useStyles = makeStyles((theme) => ({
  button: {
    background: '#93bc6e',
    color: 'white',
    '&:hover': {
      background: '#93bc6e',
      color: 'white',
      filter: 'brightness(0.9)',
    },
  },
  deleteIcon: {
    color: '#555',
    margin: '8px',
    cursor: 'pointer',
    '&:hover': {
      color: '#333',
    },
  },
}));

const RenderTypeOptions = () => {
  const store = useRenderTypeStore();

  const classes = useStyles();

  console.log(
    '%c [RenderOptions] is rendering',
    'background: #111; color: #ebd31c'
  );

  const handleChange = (index, e) => {
    console.log(e);
    store.editRender(index, e.target.value);
  };

  const handleClick = () => {
    // Default new render to be added to split view is the first
    let newRender = store.renderNames[0];

    // Try to find a render that is not already active in the rendernames list
    for (let i = 1; i < store.renderNames.length; i++) {
      if (!store.activeRenders.includes(store.renderNames[i])) {
        newRender = store.renderNames[i];
        break;
      }
    }

    // Add the new render to the split view
    store.addActiveRender(newRender);
  };

  return (
    <>
      <Wrapper>
        <FormHelperText>
          Change or add more render views below. Several render views will be
          displayed with a split view. Render views can also be removed.
        </FormHelperText>
      </Wrapper>

      <MarginWrapper>
        {/* Render dropdown for each active render */}
        {store.activeRenders.map(
          (a, i) =>
            a && (
              <Wrapper key={a + i}>
                <Dropdown
                  items={store.renderNames.sort()}
                  value={a}
                  title={'Render view ' + (i + 1)}
                  handleChange={handleChange}
                  index={i}
                />
                {store.activeRenders.length > 1 && (
                  <DeleteIcon
                    className={classes.deleteIcon}
                    onClick={() => store.removeActiveRender(i)}
                  />
                )}
              </Wrapper>
            )
        )}

        <Button
          variant='contained'
          className={classes.button}
          startIcon={<AddIcon />}
          size='small'
          onClick={() => handleClick()}
          disabled={store.activeRenders.length === MAX_NUM_OF_RENDER_VIEWS}
        >
          Add renderview
        </Button>

        {store.activeRenders.length === MAX_NUM_OF_RENDER_VIEWS && (
          <FormHelperText style={{ color: 'rgba(247, 152, 29, 1)' }}>
            Maximum {MAX_NUM_OF_RENDER_VIEWS} render views is allowed
          </FormHelperText>
        )}

        <Typography
          id='split-orientation-title'
          gutterBottom
          style={{ marginTop: '40px' }}
        >
          Split orientation
        </Typography>

        <FormHelperText>
          Change the orientation of the split view if several render views is
          active.
        </FormHelperText>

        <SelectBetween
          selectTexts={['Vertical', 'Horizontal']}
          active={store.orientation}
          onClick={store.toggleOrientation}
          disabled={store.activeRenders.length < 2}
        />
      </MarginWrapper>

      <SettingsCheck
        state={store.showRenderviewIndex}
        onClick={store.toggleShowRenderviewIndex}
        name='showrenderviewindex-checkbox'
        label='Show render index'
        description={
          'Show the index of each render view in the corner to easily distinguish the difference between render views'
        }
      />
    </>
  );
};

export default RenderTypeOptions;
