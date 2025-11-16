import { useNavigate } from "react-router";
import LogoutBtn from "../../features/auth/logout/LogoutBtn";
import Navbar from "../navbar/Navbar";

import styles from "./Header.module.css";

function Header() {
  const navigate = useNavigate();

  return (
    <header className={`${styles.header}`}>
      <h1 className={styles.logo} onClick={() => navigate("/")}>
        Company dashboard
      </h1>
      <Navbar />
      <LogoutBtn />
    </header>
  );
}

export default Header;
