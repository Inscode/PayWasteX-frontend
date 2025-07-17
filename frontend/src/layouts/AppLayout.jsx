import Header from "./Header";
import RoleButtonGroup from "../components/RoleButtonGroup";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => (
  <div className="flex flex-col min-h-screen bg-[#222]">
    <Header />
    <main className="flex-1 pt-0 pb-6 px-6 bg-white">
  <RoleButtonGroup />
  <Outlet />
</main>
        <Footer />
  </div>
);

export default AppLayout;
