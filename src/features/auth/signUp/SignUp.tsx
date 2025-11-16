import { Link } from "react-router";
import SignUpForm from "./SignUpForm";

function SignUp() {
  return (
    <div>
      <SignUpForm />
      <Link to="/sign-in">Already have an account?</Link>
    </div>
  );
}

export default SignUp;
