import { useNavigate } from "react-router";
import { TUser } from "../../../types";

import styles from "./User.module.css";

export function User({ user }: { user: TUser }) {
  const navigate = useNavigate();

  return (
    <li
      className={styles.userRow}
      onClick={() => navigate(`/users/${user.id}`)}
    >
      <p className={styles.name}>{`${user.firstName} ${user.lastName}`}</p>
      <div className={styles.email}>{user.email}</div>
    </li>
  );
}
