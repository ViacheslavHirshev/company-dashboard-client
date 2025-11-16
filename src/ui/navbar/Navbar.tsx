import { NavLink } from "react-router";

import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <ul className={styles.navbar}>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/companies">Companies</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
    </ul>
  );
}

export default Navbar;
