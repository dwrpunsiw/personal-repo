import classes from "./NavbarItem.module.css";

interface Props {
  icon: string;
  content: string;
  priviledge: boolean;
  active: boolean;
}

const NavbarItem: React.FC<Props> = ({ icon, content, priviledge, active }) => {
  const activeClass = active ? `${classes.active}` : ``;
  return (
    <div className={classes.navigation__item}>
      <div className={classes.navigation__item__inner + " " + activeClass}>
        <i className={icon}></i>
        <span>{content}</span>
      </div>
    </div>
  );
};

export default NavbarItem;
