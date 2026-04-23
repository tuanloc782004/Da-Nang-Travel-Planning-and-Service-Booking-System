import React, { useState } from "react";
import {
  Search,
  Settings,
  BellDot,
  CheckCircle2,
  CreditCard,
  UserPlus,
  User,
  Lock,
  Landmark,
  Bell,
  LogOut,
  Eye,
  EyeOff,
  Save,
  ShieldCheck,
} from "lucide-react";
import adminImg from "../../assets/admin.png";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: <User size={16} />, label: "Thông tin cá nhân", path: "/admin/profile" },
  { icon: <CreditCard size={16} />, label: "Cấu hình thanh toán", path: "/admin/payment" },
  { icon: <Landmark size={16} />, label: "Tài khoản ngân hàng", path: "/admin/bank" },
  { divider: true },
  { icon: <LogOut size={16} />, label: "Đăng xuất", action: "logout", color: "text-red-400" },
];

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Owner chuyển tiền thành công",
      desc: "Gói VIP - VNPay: #VN88291",
      time: "2 phút trước",
      icon: <CreditCard size={16} className="text-green-400" />,
      bg: "bg-green-400/10",
    },
    {
      id: 2,
      title: "Yêu cầu đăng ký Owner mới",
      desc: "Từ người dùng: Nguyễn Văn A",
      time: "1 giờ trước",
      icon: <UserPlus size={16} className="text-blue-400" />,
      bg: "bg-blue-400/10",
    },
    {
      id: 3,
      title: "Dịch vụ mới chờ duyệt",
      desc: "Khách sạn Sunview vừa đăng tải",
      time: "3 giờ trước",
      icon: <CheckCircle2 size={16} className="text-yellow-400" />,
      bg: "bg-yellow-400/10",
    },
  ];

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[#1a1c2e] border-b border-slate-800 relative z-50">
      {/* Search Bar */}
      <div className="relative w-72 group">
        <h1 className="text-mauve-50 text-xl uppercase font-medium ">
          Quản lý hệ thống
        </h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications Dropdown Container */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2.5 rounded-xl transition-all duration-200 relative
              ${
                showNotifications
                  ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
          >
            <BellDot size={20} />
            {/* Red Dot Badge */}
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1a1c2e]"></span>
          </button>

          {/* Notification Box */}
          {showNotifications && (
            <>
              {/* Overlay để click ra ngoài thì đóng */}
              <div
                className="fixed inset-0 z-[-1]"
                onClick={() => setShowNotifications(false)}
              ></div>

              <div className="absolute right-0 mt-3 w-80 bg-[#1e213a] border border-slate-700 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200 origin-top-right">
                <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                  <h3 className="font-bold text-white">Thông báo</h3>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                    3 Mới
                  </span>
                </div>

                <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 hover:bg-slate-800/50 transition cursor-pointer border-b border-slate-800/50 last:border-0 group"
                    >
                      <div className="flex gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                        >
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-200 line-clamp-1">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                            {item.desc}
                          </p>
                          <p className="text-[10px] text-slate-600 mt-2 font-medium">
                            {item.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-slate-700 text-center">
                  <button className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition">
                    Xem tất cả thông báo
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="w-[1px] h-8 bg-slate-800 mx-2"></div>

        {/* Profile */}
        <div className="relative">
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 pl-2 group cursor-pointer"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                Admin Phương
              </p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                Super Admin
              </p>
            </div>

            <div className="relative">
              <img
                src={adminImg}
                className="w-10 h-10 rounded-xl border-2 border-slate-800 group-hover:border-indigo-500 transition-all object-cover"
                alt="avatar"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1a1c2e] rounded-full"></span>
            </div>
          </div>

          {/* Dropdown */}
          {showProfileMenu && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowProfileMenu(false)}
              ></div>

              <div className="absolute right-0 mt-3 w-64 bg-[#1e213a] border border-slate-700 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in duration-200">
                {/* Menu */}
                <div className="py-2">
                  {menuItems.map((item, index) =>
  item.divider ? (
    <div key={index} className="h-[1px] bg-slate-700 my-2"></div>
  ) : item.path ? (
    <Link
      to={item.path}
      key={index}
      className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition 
      ${item.color || "text-slate-300"} 
      hover:bg-slate-800 hover:text-white`}
      onClick={() => setShowProfileMenu(false)}
    >
      {item.icon}
      {item.label}
    </Link>
  ) : (
    <button
      key={index}
      onClick={() => handleMenuClick(item.action)}
      className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition 
      ${item.color || "text-slate-300"} 
      hover:bg-slate-800 hover:text-white`}
    >
      {item.icon}
      {item.label}
    </button>
  )
)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
