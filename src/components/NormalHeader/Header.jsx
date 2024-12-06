import React from "react";
import styles from "./Header.module.css";
import classNames from "classnames";
import { useAuth } from "../../context/AuthContext"; // AuthContext의 useAuth 훅을 가져옴
import { useNavigate } from "react-router-dom";
import lowerArrow from "../../assets/images/lowerArrow.png";
import searchicon from "../../assets/images/search-3.png";
import notiicon from "../../assets/images/notifications-3.png";

const Header = ({ className }) => {
  const { logout } = useAuth(); // logout 메서드 가져오기
  const navigate = useNavigate();

  // 로고 클릭 시 새로고침 함수
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div className={styles.HeaderContainer}>
      <div className={classNames(styles.header, className)}>
        <div className={styles.logoMenu}>
          <div className={styles.logo} onClick={handleLogoClick}>
            <img src="/logo.svg" alt="Logo" />
          </div>
          <div className={styles.menu}>
            <div className={styles.closetMenu} onClick={() => navigate("/closet")}>
              CLOSET <img src={lowerArrow} alt="lowerArrow" className={styles.lowerArrow} />
            </div>
            <div className={styles.closetMenu} onClick={() => navigate("/diary")}>
              DIARY <img src={lowerArrow} alt="lowerArrow" className={styles.lowerArrow} />
            </div>
            <div className={styles.closetMenu} onClick={() => navigate("/friends")}>
              FRIENDS <img src={lowerArrow} alt="lowerArrow" className={styles.lowerArrow} />
            </div>
          </div>
        </div>
        <div className={styles.userSearchNotice}>
          <div className={styles.userControl}>
            <div className={styles.profile} onClick={() => navigate("/profile")}>
              Profile
            </div>
            <div
              className={styles.signout}
              onClick={() => {
                if (window.confirm("정말 로그아웃 하시겠습니까?")) {
                  logout(); // AuthContext의 logout 메서드 호출
                }
              }}
            >
              Sign Out
            </div>
          </div>
          <div className={styles.searchNotice}>
            <div className={styles.search}>
              <img
                className={styles.searchImage}
                alt="Search"
                src={searchicon}
              />
            </div>
            <div className={styles.notice}>
              <img
                className={styles.noticeImage}
                alt="Notifications"
                src={notiicon}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
