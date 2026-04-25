import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/adminUI/Sidebar";
import Topbar from "../../components/adminUI/Topbar";
import Footer from "../../components/adminUI/Footer";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex bg-[#F5F5F5] text-slate-900 overflow-hidden font-jakarta">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col min-w-0">
        <Topbar />

        <div className="flex-1 overflow-y-auto p-6 bg-[#F5F5F5] custom-scrollbar">
          <div className="min-h-full">
            <Outlet />
          </div>
          
          <Footer/>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;