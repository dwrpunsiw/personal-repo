import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "./NavbarItem.css";

interface Props {
  path: string;
  icon: string;
  content: string;
  priviledge: boolean;
}

const NavbarItem: React.FC<Props> = ({ path, icon, content, priviledge }) => {
  return (
    <Nav.Item className="px-5 py-3">
      <NavLink
        to={path}
        className={(isActive) =>
          "nav-link " + (isActive ? "selected " : "") + "font-medium"
        }
      >
        {content}
      </NavLink>
    </Nav.Item>
  );
};

export default NavbarItem;
