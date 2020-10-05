import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import MenuBtn from "./Buttons/MenuBtn";
import CheckList from "./CheckList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  drawerPaper: {
    width: "250px",
  },
}));

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
        {/* <Divider /> */}
        <CheckList />
      </Drawer>
    </>
  );
};

export default SideDrawer;
