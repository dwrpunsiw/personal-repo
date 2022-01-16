import classes from "./Navbar.module.css";
import list_menu from "../../../../assets/data/list_menu.json";
import user_options from "../../../../assets/data/user_options.json";
import logoImages from "../../../../assets/images/etc/logo.png";
import { Nav } from "react-bootstrap";
import NavbarItem from "./NavbarItem";
import { constructUserSpecificPath } from "../../../helpers/utils";

interface ListMenu {
  path: string;
  icon: string;
  content: string;
  priviledge: boolean;
}

const Navbar: React.FC = () => {
  const userId = "u1";
  return (
    <section className={classes.navigation}>
      <div className="navigation__brand flex justify-center p-6">
        <img src={logoImages} className="w-20" />
      </div>
      <div className="navigation__menu">
        <Nav>
          {list_menu.map((menu: ListMenu) => {
            const specificPath = constructUserSpecificPath(userId, menu.path);
            return (
              <NavbarItem
                key={menu.path}
                path={specificPath}
                icon={menu.icon}
                content={menu.content}
                priviledge={menu.priviledge}
              />
            );
          })}
        </Nav>
      </div>
      <div className="navigation_misc">
        <Nav>
          {user_options.map((menu: ListMenu) => {
            const specificPath = constructUserSpecificPath(userId, menu.path);
            return (
              <NavbarItem
                key={menu.path}
                path={specificPath}
                icon={menu.icon}
                content={menu.content}
                priviledge={menu.priviledge}
              />
            );
          })}
        </Nav>
      </div>
    </section>
  );
};

export default Navbar;
