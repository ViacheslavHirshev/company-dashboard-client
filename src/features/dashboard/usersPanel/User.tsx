import { Link } from "react-router";
import { TUser } from "../../../types";

export function User({ user }: { user: TUser }) {
  return (
    <Link to={`/users/${user.id}`}>
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid black",
          marginTop: "5px",
        }}
      >
        <p>{`${user.firstName} ${user.lastName}`}</p>
      </div>
    </Link>
  );
}
