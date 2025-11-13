import { Outlet } from "react-router";

import styles from "./AppLayout.module.css";
import Header from "../header/Header";
import Sidebar from "../Sidebar";

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
