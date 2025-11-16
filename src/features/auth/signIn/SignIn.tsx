import { Link } from "react-router";
import SignInForm from "./SignInForm";

import styles from "./SignIn.module.css";

function SignIn() {
  return (
    <div className={styles.signInContainer}>
      <SignInForm />
      <Link to="/reset-password">Forgot password?</Link>
      <Link to="/sign-up">Don't have an account?</Link>
    </div>
  );
}

export default SignIn;
