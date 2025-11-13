import LogoutBtn from "../../features/auth/LogoutBtn";
import styles from "./Header.module.css";
type THeaderProps = {
  className: string;
};

function Header({ className }: THeaderProps) {
  return (
    <header className={`${className} ${styles.header}`}>
      <div>App emblem(return on homepage)</div>
      <LogoutBtn />
    </header>
  );
}

export default Header;
