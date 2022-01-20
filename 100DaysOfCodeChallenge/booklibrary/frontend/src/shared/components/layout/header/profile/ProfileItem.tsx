import { Link } from "react-router-dom";
import classes from "./ProfileItem.module.css";

interface Props {
  icon: string;
  path: string;
  content: string;
}

export const ProfileItem: React.FC<Props> = ({ icon, path, content }) => {
  return (
    <li className={classes.profile__menu__item}>
      <Link to={path} className={classes.profile__link}>
        <i className={icon}></i>
        <span>{content}</span>
      </Link>
    </li>
  );
};
