import { useState, useEffect } from "react";
import classes from "./Header.module.css";
import ProfileImg from "../../../../assets/images/profile/profile.jpg";

import { ProfileMenu } from "./profile/ProfileMenu";

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeClass, setActiveClass] = useState("");

  useEffect(() => {
    if (showProfileMenu) {
      setActiveClass(classes.active);
    } else {
      setActiveClass("");
    }
  }, [showProfileMenu]);

  const clickProfileHandler = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__right}>
        <span>
          Hi, <span>wisnuprsj</span>
        </span>
        <div className={classes.profile} onClick={clickProfileHandler}>
          <img src={ProfileImg} alt="avatar" />
          <span className={activeClass}>
            <i className={classes.arrow + " " + classes.down}></i>
          </span>
        </div>
        <ProfileMenu active={showProfileMenu} />
      </div>
    </header>
  );
};

export default Header;
