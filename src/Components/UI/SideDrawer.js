import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MenuBtn from "./Buttons/MenuBtn";
import MuiAccordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChannelList from "./ChannelList";
import AnnotationTimeLine from "./AnnotationTimeLine";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  drawerPaper: {
    width: "300px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Accordion = withStyles({
  root: {
    "&$expanded": {
      margin: 0,
    },
  },
  expanded: {
    margin: 0,
  },
})(MuiAccordion);

const MenuItems = [
  {
    title: "Channels",
    component: <ChannelList />,
  },
  {
    title: "Annotations",
    component: <AnnotationTimeLine />,
  },
];

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const classes = useStyles();
  console.log(
    "%c [SideDrawer] is rendering",
    "background: #111; color: #ebd31c"
  );

  // Toggle between showing and hiding menu
  const toggleMenu = () => setShow(!show);

  return (
    <>
      <MenuBtn onClick={toggleMenu} />
      <Drawer
        anchor={"right"}
        open={show}
        onClose={() => toggleMenu()}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {MenuItems.map((item, i) => (
          <Accordion TransitionProps={{ unmountOnExit: true }} key={i}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{item.title}</Typography>
            </AccordionSummary>

            <AccordionDetails>{item.component}</AccordionDetails>
          </Accordion>
        ))}
      </Drawer>
    </>
  );
};

export default SideDrawer;
