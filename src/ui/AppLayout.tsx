import { Outlet } from "react-router";

function AppLayout() {
  return (
    <>
      <h1>Layout route</h1>
      <Outlet />
    </>
  );
}

export default AppLayout;
