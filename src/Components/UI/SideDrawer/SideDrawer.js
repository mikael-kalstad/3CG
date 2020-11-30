import MuiAccordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from 'react';
import styled from 'styled-components';
import CloseMenuBtn from '../Buttons/CloseMenuBtn';
import MenuBtn from '../Buttons/MenuBtn';
import AnnotationMenu from './AnnotationMenu';
import ChannelList from './ChannelList';
import ColorOptions from './ColorOptions';
import FileUpload from './FileUpload';
import GeneralOptions from './GeneralOptions';
import RenderTypeOptions from './RenderTypeOptions';
import TimeLineOptions from './TimeLineOptions';
import Upload from './Upload';

const Header = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  grid-template-columns: 1fr 8fr;
  align-items: center;
  height: 60px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  padding: 0;
`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  drawerPaper: {
    width: '300px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Accordion = withStyles({
  root: {
    '&$expanded': {
      margin: 0,
    },
  },
  expanded: {
    margin: 0,
  },
})(MuiAccordion);

const MenuItems = [
  {
    title: 'General',
    component: <GeneralOptions />,
  },
  {
    title: 'Colors',
    component: <ColorOptions />,
  },
  {
    title: 'Visualizations',
    component: <RenderTypeOptions />,
  },
  {
    title: 'Channels',
    component: <ChannelList />,
  },
  {
    title: 'Annotations',
    component: <AnnotationMenu />,
  },
  {
    title: 'Timeline',
    component: <TimeLineOptions />,
  },
  {
    title: 'Upload/Download',
    component: <Upload />,
  },
];

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const [menuItemsOpen, setMenuItemsOpen] = useState(
    MenuItems.map((e, i) => (i === MenuItems.length - 1 ? true : false))
  );

  const toggleMenuItemOpen = (index) =>
    setMenuItemsOpen((prevState) =>
      prevState.map((e, i) => (i === index ? !e : e))
    );

  // Toggle between showing and hiding menu
  const toggleMenu = () => setShow(!show);

  const classes = useStyles();

  return (
    <>
      <MenuBtn onClick={toggleMenu} />
      <Drawer
        anchor={'right'}
        open={show}
        onClose={() => toggleMenu()}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Header>
          <CloseMenuBtn onClick={toggleMenu} /> <Title>Menu</Title>
        </Header>

        {MenuItems.map((item, i) => (
          <Accordion
            TransitionProps={{ unmountOnExit: true }}
            key={i}
            expanded={menuItemsOpen[i]}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
              onClick={() => toggleMenuItemOpen(i)}
            >
              <Typography className={classes.heading}>{item.title}</Typography>
            </AccordionSummary>

            <AccordionDetails style={{ display: 'block' }}>
              {item.component}
            </AccordionDetails>
          </Accordion>
        ))}
      </Drawer>
    </>
  );
};

export default SideDrawer;
