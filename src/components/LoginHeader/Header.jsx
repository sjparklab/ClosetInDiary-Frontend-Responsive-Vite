import React from "react";
import styles from "./Header.module.css";
import classNames from "classnames";

const Header = ({ className }) => {
  return (
    <div className={classNames(styles.header, className)}>
      <div className={styles.logo}><img src="/logo.svg"></img></div>
    </div>
  );
};

export default Header;