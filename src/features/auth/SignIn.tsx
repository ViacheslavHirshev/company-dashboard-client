import { Link } from "react-router";
import SignInForm from "./SignInForm";

function SignIn() {
  return (
    <div>
      <SignInForm />
      <Link to="/reset-password">Forgot password?</Link>
      <Link to="/sign-up">Don't have an account?</Link>
    </div>
  );
}

export default SignIn;
