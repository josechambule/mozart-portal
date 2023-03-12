import React from "react";

import MainNavigation from "./MainNavigation";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={classes["main-header"]}>
      <h1>Mozart</h1>
      <MainNavigation />
    </header>
  );
};

export default Header;
