import classes from "./Navbar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import NavbarItem from "./NavbarItem";
import NavbarTools from "./NavbarTools";

import list_menu from "../../../../assets/data/list_menu.json";
import list_tools from "../../../../assets/data/user_options.json";
import logo from "../../../../assets/images/etc/logo.png";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeLink = list_menu.findIndex(
    (menu) => menu.path === location.pathname
  );
  const activeTools = list_tools.findIndex(
    (menu) => menu.path === location.pathname
  );
  const onClickBrand = () => {
    navigate("/");
  };

  return (
    <section className={classes.navigation}>
      <div className={classes.navigation__logo}>
        <img src={logo} alt="LOGO" onClick={onClickBrand} />
      </div>
      <div className={classes.navigation__menu}>
        {list_menu.map((menu, index) => {
          return (
            <Link to={menu.path} key={index}>
              <NavbarItem
                icon={menu.icon}
                content={menu.content}
                priviledge={menu.priviledge}
                active={activeLink === index}
              />
            </Link>
          );
        })}
      </div>
      <div className={classes.navigation__tools}>
        {list_tools.map((menu, index) => {
          return (
            <Link to={menu.path} key={index}>
              <NavbarTools
                key={menu.path}
                icon={menu.icon}
                priviledge={menu.priviledge}
                active={activeTools === index}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Navbar;
