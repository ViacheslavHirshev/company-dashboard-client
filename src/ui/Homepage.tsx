import { Link } from "react-router";
import { useRoleContext } from "../context/RoleProvider";

function Homepage() {
  const { role } = useRoleContext();
  return (
    <>
      <div>HomePage</div>
      <Link to={`${role ? "/dashboard" : "/sign-in"}`}>Start</Link>
    </>
  );
}

export default Homepage;
