import { Link } from "react-router";
import SignUpForm from "./SignUpForm";

import styles from "./SignUp.module.css";

function SignUp() {
  return (
    <div className={styles.signUpContainer}>
      <SignUpForm />
      <Link to="/sign-in">Already have an account?</Link>
    </div>
  );
}

export default SignUp;
