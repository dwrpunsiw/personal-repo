import classes from "./NavbarTools.module.css";

interface Props {
  icon: string;
  priviledge: boolean;
  active: boolean;
}

const NavbarTools: React.FC<Props> = ({ icon, priviledge, active }) => {
  const activeClass = active ? `${classes.active}` : ``;
  return (
    <div className={classes.navigation__item}>
      <div className={classes.navigation__item__inner + " " + activeClass}>
        <i className={icon}></i>
      </div>
    </div>
  );
};

export default NavbarTools;
