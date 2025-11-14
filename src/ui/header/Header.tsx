import { useNavigate } from "react-router";
import LogoutBtn from "../../features/auth/LogoutBtn";
import styles from "./Header.module.css";
type THeaderProps = {
  className: string;
};

function Header({ className }: THeaderProps) {
  const navigate = useNavigate();

  return (
    <header className={`${className} ${styles.header}`}>
      <div onClick={() => navigate("/")}>Company dashboard</div>
      <LogoutBtn />
    </header>
  );
}

export default Header;
