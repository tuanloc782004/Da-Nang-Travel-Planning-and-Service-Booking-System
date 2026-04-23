import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/adminUI/Sidebar";
import Topbar from "../../components/adminUI/Topbar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className=" h-screen flex bg-slate-50 text-slate-900 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col  min-w-0">
        <Topbar
        />

        <div className="flex-1 overflow-y-auto p-6 bg-[#111322] custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;