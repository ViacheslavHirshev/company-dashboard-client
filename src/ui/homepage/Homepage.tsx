import { useNavigate } from "react-router";
import { useRoleContext } from "../../context/RoleProvider";
import Button from "../buttons/Button";

import styles from "./Homepage.module.css";

function Homepage() {
  const { role } = useRoleContext();
  const navigate = useNavigate();

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeHeader}>Start managing your companies</h1>
      <Button
        className={styles.startBtn}
        onClickHandler={() => navigate(`${role ? "/dashboard" : "/sign-in"}`)}
      >
        Start
      </Button>
    </div>
  );
}

export default Homepage;
