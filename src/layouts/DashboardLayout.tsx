import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <section>
      <Outlet />
    </section>
  );
};

export default DashboardLayout;
