import React, { useState } from "react";
import { 
  User, Mail, ShieldCheck, Calendar, Edit3, 
  Lock, Key, Save, X, Eye, EyeOff, CheckCircle2 
} from "lucide-react";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // Thông tin Admin của Phương
  const [adminInfo, setAdminInfo] = useState({
    fullName: "Trần Thị Thanh Phương",
    email: "thanhphuong.admin@tripplanner.vn",
    role: "ADMIN",
    createdAt: "10/04/2026"
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* SECTION: THÔNG TIN ADMIN */}
      <div className="bg-[#1a1c2e] border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl">
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
          <div className="absolute -bottom-12 left-8 p-1 bg-[#1a1c2e] rounded-3xl">
            <div className="w-24 h-24 bg-slate-800 rounded-[22px] flex items-center justify-center border-4 border-[#1a1c2e]">
              <User size={48} className="text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="pt-16 p-8 space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-black text-white">{adminInfo.fullName}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-black border border-indigo-500/20 uppercase tracking-widest">
                  {adminInfo.role}
                </span>
                <span className="text-slate-500 text-xs flex items-center gap-1">
                  <Calendar size={12} /> Tham gia từ: {adminInfo.createdAt}
                </span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2"
              >
                {isEditing ? <><X size={14} /> Hủy</> : <><Edit3 size={14} /> Sửa hồ sơ</>}
              </button>
              <button 
                onClick={() => setShowPasswordModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                <Lock size={14} /> Đổi mật khẩu
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/50">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <User size={12} /> Họ và Tên
              </label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={adminInfo.fullName}
                  onChange={(e) => setAdminInfo({...adminInfo, fullName: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none transition"
                />
              ) : (
                <p className="text-white font-medium p-3 bg-slate-900/50 rounded-xl border border-transparent italic">
                   {adminInfo.fullName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Mail size={12} /> Địa chỉ Email
              </label>
              <p className="text-slate-400 p-3 bg-slate-900/50 rounded-xl border border-slate-800/20 flex items-center gap-2">
                 {adminInfo.email} <ShieldCheck size={14} className="text-emerald-500" />
              </p>
            </div>
          </div>

          {isEditing && (
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
               <Save size={18} /> LƯU THAY ĐỔI
            </button>
          )}
        </div>
      </div>

      {/* SECTION: MODAL ĐỔI MẬT KHẨU */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#1a1c2e] border border-slate-700 w-full max-w-md rounded-[32px] overflow-hidden relative shadow-2xl animate-in zoom-in duration-300">
            <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2 tracking-tighter">
                    <Key className="text-indigo-400" size={20} /> THIẾT LẬP MẬT KHẨU MỚI
                </h2>
                <button onClick={() => setShowPasswordModal(false)} className="text-slate-500 hover:text-white"><X /></button>
            </div>

            <div className="p-8 space-y-5">
              <PasswordInput label="Mật khẩu hiện tại" placeholder="••••••••" />
              <div className="h-px bg-slate-800 my-2"></div>
              <PasswordInput label="Mật khẩu mới" placeholder="Nhập mật khẩu mới" />
              <PasswordInput label="Xác nhận mật khẩu mới" placeholder="Nhập lại mật khẩu mới" />
            </div>

            <div className="p-6 bg-slate-900/50 border-t border-slate-800 flex gap-3">
                <button onClick={() => setShowPasswordModal(false)} className="flex-1 py-3 text-slate-400 font-bold hover:text-white transition">Hủy bỏ</button>
                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-indigo-500/20">
                    CẬP NHẬT NGAY
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Component con cho Input mật khẩu để tái sử dụng
const PasswordInput = ({ label, placeholder }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
      <div className="relative">
        <input 
          type={show ? "text" : "password"}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-white focus:border-indigo-500 outline-none transition"
          placeholder={placeholder}
        />
        <button 
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;