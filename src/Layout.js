import React from "react";

const Layout = (props) => {
  return (
    <>
      <p>Layout TOP</p>
      {props.children}
      <p>Layout BOTTOM</p>
    </>
  );
};

export default Layout;
