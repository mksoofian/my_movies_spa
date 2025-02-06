import Nav from "../components/nav";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};
