import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Settings, LogOut, Users, UserCheck, ShieldCheck, Package, Landmark } from "lucide-react";
import { assets } from "../../assets/assets";
import { LayoutDashboard } from "lucide-react";

const menuItems = [
  { title: "Bảng điều khiển", icon: <LayoutDashboard size={20} />, path: "/admin" },
  { title: "Người dùng", icon: <Users size={20} />, path: "/admin/users" },
  { title: "Duyệt chủ dịch vụ", icon: <UserCheck size={20} />, path: "/admin/owners" },
  { title: "Duyệt dịch vụ", icon: <UserCheck size={20} />, path: "/admin/services" },
  { title: "Gói đăng ký", icon: <Package size={20} />, path: "/admin/packages" },
  { title: "Tài chính", icon: <Landmark size={20} />, path: "/admin/finance" },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  return (
    <aside
      className={`bg-[#1a1c2e] border-r border-slate-800 text-slate-300
      flex flex-col transition-all duration-300 h-full ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo */}
      <div className="p-5 flex items-center justify-between">
        {isOpen && (
          <img src={assets.logo} alt="logo" className="h-8 opacity-90" />
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-800 rounded-lg"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition
              ${active ? "bg-indigo-600 text-white" : "hover:bg-slate-800"}`}
            >
              {item.icon}
              {isOpen && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <button className="flex items-center gap-3 w-full px-3 py-3 hover:bg-slate-800 rounded-lg">
          <Settings size={18} />
          {isOpen && "Cài đặt"}
        </button>

        <button className="flex items-center gap-3 w-full px-3 py-3 text-red-400 hover:bg-red-500/10 rounded-lg">
          <LogOut size={18} />
          {isOpen && "Đăng xuất"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;