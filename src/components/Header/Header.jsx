import React from "react";
import styles from "./Header.module.css";
import classNames from "classnames";

const Header = ({ className }) => {
  return (
    <div className={classNames(styles.Header, className)}>
      <div className={styles.logo} />
    </div>
  );
};

export default Header;