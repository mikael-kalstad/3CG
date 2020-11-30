import React from 'react';
import styled from 'styled-components';
import { useRenderTypeStore } from '../Store';
import CircularVisualization from './CircularVisualization';
import Scene from './Scene';
import Ecg from './Ecg';
import Vcg from './Vcg';

const IndexIcon = styled.div`
  position: absolute;
  top: ${(props) =>
    props.orientation === 0
      ? '10px'
      : 'calc(' + (100 / props.numOfRenders) * props.index + '% + 10px)'};
  left: ${(props) =>
    props.orientation === 0
      ? 'calc(' + (100 / props.numOfRenders) * props.index + '% + 10px)'
      : '10px'};
  background: #00a8ff;
  width: 30px;
  height: 30px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  z-index: 100;
  display: grid;
  align-items: center;
  justify-items: center;
  opacity: 0.8;
`;

const Split = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: ${(props) =>
    props.orientation === 0 && 'repeat(' + props.numOfRenders + ', 1fr)'};
  grid-template-rows: ${(props) =>
    props.orientation === 1 && 'repeat(' + props.numOfRenders + ', 1fr)'};
`;

const RenderView = () => {
  const store = useRenderTypeStore();

  // Link names from store with component
  let componentsNameList = [
    {
      name: 'Ecg',
      component: <Ecg />,
    },
    {
      name: 'Vcg',
      component: <Vcg />,
    },
    {
      name: 'Circle',
      component: <CircularVisualization />,
    },
  ];

  let activeComponents = [];

  // Extract component from state that is active and should be included in the split view
  store.activeRenders.map((r, i) =>
    componentsNameList.forEach((c) => {
      if (c.name.toLowerCase() === r.toLowerCase())
        activeComponents.push(
          <React.Fragment key={c.name + i}>
            {store.showRenderviewIndex && store.activeRenders.length > 1 && (
              <IndexIcon
                index={i}
                numOfRenders={store.activeRenders.length}
                orientation={store.orientation}
              >
                {i + 1}
              </IndexIcon>
            )}
            <Scene>{c.component}</Scene>
          </React.Fragment>
        );
    })
  );

  return (
    <Split
      numOfRenders={store.activeRenders.length}
      orientation={store.orientation}
    >
      {activeComponents}
    </Split>
  );
};

export default RenderView;
