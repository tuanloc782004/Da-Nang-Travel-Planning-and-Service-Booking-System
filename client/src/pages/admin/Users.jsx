import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Lock,
  CheckCircle,
  Mail,
  Shield,
  Calendar,
  MapPin,
  User as UserIcon,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const mockUsers = [
  {
    id: 1,
    fullName: "Nguyễn Văn A",
    email: "vana@gmail.com",
    role: "USER",
    status: "ACTIVE",
    avatar: "https://i.pravatar.cc/150?u=1",
    createdAt: "2026-01-10",
  },
  {
    id: 2,
    fullName: "Homestay Mây",
    email: "owner_may@gmail.com",
    role: "OWNER",
    status: "ACTIVE",
    avatar: "https://i.pravatar.cc/150?u=2",
    createdAt: "2026-02-15",
  },
  {
    id: 3,
    fullName: "Trần Thế Anh",
    email: "theanh@gmail.com",
    role: "USER",
    status: "BLOCKED",
    avatar: "https://i.pravatar.cc/150?u=3",
    createdAt: "2026-03-01",
  },
  {
    id: 4,
    fullName: "Luxury Hotel",
    email: "admin_hotel@gmail.com",
    role: "OWNER",
    status: "ACTIVE",
    avatar: "https://i.pravatar.cc/150?u=4",
    createdAt: "2026-03-12",
  },
];

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const [confirmUser, setConfirmUser] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleConfirmAction = () => {
    if (!confirmUser) return;

    if (confirmAction === "LOCK") {
      console.log("Khóa user:", confirmUser.id);
    } else {
      console.log("Mở khóa user:", confirmUser.id);
    }

    // đóng modal
    setConfirmUser(null);
    setConfirmAction(null);
  };

  const filteredUsers = mockUsers.filter((user) => {
    const matchSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchRole = roleFilter === "ALL" || user.role === roleFilter;

    const matchStatus = statusFilter === "ALL" || user.status === statusFilter;

    return matchSearch && matchRole && matchStatus;
  });

  const handleOpenDetail = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {/* SEARCH */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Tìm tên, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:border-indigo-500 outline-none w-64"
            />
          </div>

          {/* FILTER ROLE */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 text-sm text-slate-300 focus:border-indigo-500 outline-none"
          >
            <option value="ALL">Tất cả vai trò</option>
            <option value="USER">User</option>
            <option value="OWNER">Owner</option>
          </select>

          {/* FILTER STATUS */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 text-sm text-slate-300 focus:border-indigo-500 outline-none"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="ACTIVE">Hoạt động</option>
            <option value="BLOCKED">Đã khóa</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#1a1c2e] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/50 text-slate-400 uppercase text-[11px] font-bold">
            <tr>
              <th className="px-6 py-4">Người dùng</th>
              <th className="px-6 py-4">Vai trò</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4">Ngày tham gia</th>
              <th className="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-slate-800/30 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      className="w-10 h-10 rounded-full border border-slate-700"
                      alt=""
                    />
                    <div>
                      <p className="font-bold text-white group-hover:text-indigo-400 transition">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`flex items-center gap-1.5 font-bold text-[10px] uppercase ${user.role === "OWNER" ? "text-emerald-400" : "text-blue-400"}`}
                  >
                    <Shield size={12} /> {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${user.status === "ACTIVE" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
                  >
                    {user.status === "ACTIVE" ? "Hoạt động" : "Đã khóa"}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 font-mono">
                  {user.createdAt}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenDetail(user)}
                      className="p-2 hover:bg-indigo-500/10 text-indigo-400 rounded-lg transition"
                      title="Xem chi tiết"
                    >
                      <Eye size={18} />
                    </button>
                    {user.status === "ACTIVE" ? (
                      <button
                        onClick={() => {
                          setConfirmUser(user);
                          setConfirmAction("LOCK");
                        }}
                        className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition"
                        title="Khóa tài khoản"
                      >
                        <Lock size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setConfirmUser(user);
                          setConfirmAction("UNLOCK");
                        }}
                        className="p-2 hover:bg-green-500/10 text-green-400 rounded-lg transition"
                        title="Kích hoạt"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL XÁC NHẬN */}
      {confirmUser && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setConfirmUser(null)}
          ></div>

          {/* modal */}
          <div className="relative bg-[#1a1c2e] border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in duration-200">
            <h3 className="text-lg font-bold text-white">
              {confirmAction === "LOCK"
                ? "Xác nhận khóa tài khoản"
                : "Xác nhận mở khóa tài khoản"}
            </h3>

            <p className="text-slate-400 text-sm mt-3">
              Bạn có chắc muốn{" "}
              <span className="font-bold text-white">
                {confirmAction === "LOCK" ? "khóa" : "mở khóa"}
              </span>{" "}
              tài khoản{" "}
              <span className="text-indigo-400 font-semibold">
                {confirmUser.fullName}
              </span>{" "}
              không?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setConfirmUser(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Hủy
              </button>

              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 rounded-xl font-bold text-white ${
                  confirmAction === "LOCK"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {confirmAction === "LOCK" ? "Khóa" : "Mở khóa"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHÂN TRANG */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800">
        <p className="text-sm text-slate-500">
          Hiển thị <span className="text-white">1-3</span> trên{" "}
          <span className="text-white">24</span> dịch vụ
        </p>
        <div className="flex gap-2">
          <button
            className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white transition disabled:opacity-50"
            disabled
          >
            <ChevronLeft size={20} />
          </button>
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              className={`w-10 h-10 rounded-lg text-sm font-bold transition ${p === 1 ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
            >
              {p}
            </button>
          ))}
          <button className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white transition">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* MODAL CHI TIẾT */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="bg-[#1a1c2e] border border-slate-700 w-full max-w-2xl rounded-3xl overflow-hidden relative shadow-2xl animate-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <UserIcon className="text-indigo-400" /> Chi tiết người dùng
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Sidebar Info */}
              <div className="text-center md:border-r md:border-slate-800 pr-0 md:pr-8 flex flex-col items-center">
                <img
                  src={selectedUser.avatar}
                  className="w-24 h-24 rounded-2xl border-2 border-indigo-500 p-1 mb-4"
                  alt=""
                />
                <h3 className="text-lg font-bold text-white">
                  {selectedUser.fullName}
                </h3>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full uppercase font-bold mt-2">
                  {selectedUser.role}
                </span>
                <div className="mt-6 w-full space-y-3">
                  <div className="flex items-center gap-3 text-slate-400 text-xs">
                    <Mail size={14} className="shrink-0" />
                    <span className="truncate">{selectedUser.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-xs">
                    <Calendar size={14} />
                    <span>Tham gia: {selectedUser.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Right Main Info */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4">
                    Lịch sử hoạt động
                  </h4>
                  <div className="space-y-4 border-l-2 border-slate-800 pl-4 ml-2">
                    <div className="relative">
                      <span className="absolute -left-[22px] top-1 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-[#1a1c2e]"></span>
                      <p className="text-sm text-white font-medium">
                        Đã thanh toán gói VIP 1 năm
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase">
                        16/04/2026 - 14:20
                      </p>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[22px] top-1 w-2.5 h-2.5 bg-slate-600 rounded-full border-2 border-[#1a1c2e]"></span>
                      <p className="text-sm text-white font-medium">
                        Cập nhật thông tin doanh nghiệp
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase">
                        10/04/2026 - 09:30
                      </p>
                    </div>
                  </div>
                </div>

                {selectedUser.role === "OWNER" && (
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4">
                      Dịch vụ đã đăng
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        <p className="text-white text-xs font-bold">
                          Khách sạn Mây Trắng
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1">
                          HOTEL • Approved
                        </p>
                      </div>
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        <p className="text-white text-xs font-bold">
                          Nhà hàng Lá Phong
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1">
                          RESTAURANT • Pending
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-900/50 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl text-sm font-bold transition shadow-lg shadow-indigo-500/20"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
