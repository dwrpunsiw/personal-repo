import classes from "./ProfileMenu.module.css";
import profile_menu from "../../../../../assets/data/profile_menu.json";
import { ProfileItem } from "./ProfileItem";

interface Props {
  active: boolean;
}

export const ProfileMenu: React.FC<Props> = ({ active }) => {
  const activeClass = active ? classes.active : "";

  return (
    <div className={classes.profile__menu + " " + activeClass}>
      <div className={classes.profile__info}>
        <h3>Wisnu Prasojo Widianto</h3>
      </div>
      <ul>
        {profile_menu.map((menu, index) => {
          return (
            <ProfileItem
              icon={menu.icon}
              content={menu.content}
              path={menu.path}
              key={index}
            />
          );
        })}
      </ul>
    </div>
  );
};
