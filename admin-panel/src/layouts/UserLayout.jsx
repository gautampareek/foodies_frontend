import { Outlet } from "react-router-dom";
import NavBar from "../components/user/Navbar/NavBar";
import Footer from "../components/user/FooterComponent/FooterComponent";
import { ToastContainer } from "react-toastify";

const UserLayout = () => {
  return (
    <>
      {/* Later you can add Navbar + Footer here */}
      <div className="d-flex flex-column min-vh-100">
      <ToastContainer />
      <NavBar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  );
};

export default UserLayout;
