import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useState } from "react";

import Sidebar from "../components/admin/Sidebar/Sidebar";
import Menubar from "../components/admin/Menubar/Menubar";

const AdminLayout = () => {
  const [sideBarVisible, setSideBarVisible] = useState(true);

  const toggleSideBar = () => {
    setSideBarVisible(prev => !prev);
  };

  return (
    <div className="d-flex" id="wrapper">
      <ToastContainer />
      
      <Sidebar sideBarVisible={sideBarVisible} />
      <div id="page-content-wrapper">
        <Menubar toggleSideBar={toggleSideBar} sideBarVisible={sideBarVisible} />
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
