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
      <div className={styles.logoMenu}>
        <div className={styles.logo} onClick={handleLogoClick}>
          <img src="/logo.svg" alt="Logo" />
        </div>
        <div className={styles.menu}>
          <div className={styles.closetMenu}>CLOSET <img src="/src/assets/images/lowerArrow.png" alt="lowerArrow" className={styles.lowerArrow}/></div>
          <div className={styles.closetMenu}>DIARY <img src="/src/assets/images/lowerArrow.png" alt="lowerArrow" className={styles.lowerArrow}/></div>
          <div className={styles.closetMenu}>FRIENDS <img src="/src/assets/images/lowerArrow.png" alt="lowerArrow" className={styles.lowerArrow}/></div>
        </div>
      </div>
      <div className={styles.userSearchNotice}>
        <div className={styles.userControl}>
          <div className={styles.profile}>Profile</div>
          <div className={styles.profile}>Sign Out</div>
        </div>
        <div className={styles.searchNotice}>
          <div className={styles.search}>
            <img className={styles.searchImage} alt="Search" src="/src/assets/images/search-3.png" />
          </div>
          <div className={styles.notice}>
            <img className={styles.noticeImage} alt="Notifications" src="/src/assets/images/notifications-3.png" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Header;
