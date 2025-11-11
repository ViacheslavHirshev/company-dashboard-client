import { NavLink } from "react-router";

type TSidebarProps = {
  className: string;
};

function Sidebar({ className }: TSidebarProps) {
  return (
    <aside className={className}>
      <ul>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/companies">Companies</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
