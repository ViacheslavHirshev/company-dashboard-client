import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./uiStyles/AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.layout}>
      <Header className={styles["header-layout"]} />
      <Sidebar className={styles["sidebar-layout"]} />
      <main className={styles["main-layout"]}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
