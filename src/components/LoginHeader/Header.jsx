import React from "react";
import styles from "./Header.module.css";
import classNames from "classnames";

const Header = ({ className }) => {
  // 로고 클릭 시 새로고침 함수
  const handleLogoClick = () => {
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <div className={classNames(styles.header, className)}>
      <div className={styles.logo} onClick={handleLogoClick}>
        <img src="/logo.svg" alt="Logo" />
      </div>
    </div>
  );
};

export default Header;
