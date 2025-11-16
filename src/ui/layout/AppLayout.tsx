import { Outlet } from "react-router";
import Header from "../header/Header";

import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles["main-layout"]}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
