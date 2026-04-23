import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Eye,
  Building2,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  User,
  ImageIcon,
} from "lucide-react";

const mockApplications = [
  {
    id: "APP-001",
    user: "Nguyễn Văn A",
    businessName: "Mây Trắng Homestay",
    phone: "0901234567",
    email: "vana@gmail.com",
    address: "Đà Lạt",
    status: "PENDING",
    date: "2026-04-15",
    bank: { name: "VCB", number: "1234567890", accountName: "NGUYEN VAN A" },
    docs: [],
  },
  {
    id: "APP-002",
    user: "Trần Thị B",
    businessName: "Biển Xanh Hotel",
    phone: "0912345678",
    email: "",
    address: "Nha Trang",
    status: "APPROVED",
    date: "2026-04-18",
    bank: { name: "TCB", number: "0987654321", accountName: "TRAN THI B" },
    docs: [],
  },
  {
    id: "APP-003",
    user: "Lê Văn C",
    businessName: "Sunrise Villa",
    phone: "0933333333",
    email: "c@gmail.com",
    address: "Phú Quốc",
    status: "REJECTED",
    date: "2026-04-10",
    bank: { name: "ACB", number: "111222333", accountName: "LE VAN C" },
    docs: [],
  },
];

const OwnerApprovals = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [zoomImg, setZoomImg] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showReject, setShowReject] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [tab, setTab] = useState("PENDING");

  const filteredApps = mockApplications.filter((app) => app.status === tab);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div className="flex bg-[#1a1c2e] p-1 rounded-xl border border-slate-800">
          {[
            { key: "PENDING", label: "Chờ duyệt" },
            { key: "APPROVED", label: "Đã duyệt" },
            { key: "REJECTED", label: "Đã từ chối" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
                tab === t.key
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE LIST */}
      <div className="bg-[#1a1c2e] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/50 text-slate-400 uppercase text-[10px] font-black tracking-widest">
            <tr>
              <th className="px-6 py-4">Người đăng ký</th>
              <th className="px-6 py-4">Doanh nghiệp</th>
              <th className="px-6 py-4">Số điện thoại</th>
              <th className="px-6 py-4">Ngày gửi</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {filteredApps.map((app) => (
              <tr
                key={app.id}
                className="hover:bg-slate-800/20 transition-colors"
              >
                <td className="px-6 py-4 font-bold text-white">{app.user}</td>
                <td className="px-6 py-4 text-indigo-400 flex items-center gap-2">
                  <Building2 size={14} /> {app.businessName}
                </td>
                <td className="px-6 py-4 font-mono text-xs">{app.phone}</td>
                <td className="px-6 py-4 text-slate-500">{app.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      app.status === "PENDING"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : app.status === "APPROVED"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right flex items-center justify-end">
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="p-2 bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-lg transition"
                  >
                    <Eye size={13} />
                  </button>
                  <button
                    onClick={() => setShowApprove(true)}
                    className="p-2 bg-green-600/10 hover:bg-green-600 text-green-500 hover:text-white font-bold py-2 rounded-xl transition shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 ml-2"
                  >
                    <CheckCircle size={13} />
                  </button>
                  <button
                    onClick={() => setShowReject(true)}
                    className="p-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white font-bold py-2 rounded-xl transition border border-red-600/20 flex items-center justify-center gap-2 ml-2"
                  >
                    <XCircle size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      {/* MODAL CHI TIẾT HỒ SƠ */}
      {selectedApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedApp(null)}
          ></div>

          <div className="bg-[#1a1c2e] border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-[32px] overflow-hidden relative shadow-2xl flex flex-col animate-in zoom-in duration-300">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                <FileText className="text-indigo-400" /> Chi tiết hồ sơ Owner
              </h2>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-500 hover:text-white transition"
              >
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. Thông tin doanh nghiệp */}
                <div className="space-y-6">
                  <section>
                    <h3 className="text-xs font-black text-indigo-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                      <Building2 size={14} /> Thông tin chung
                    </h3>
                    <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase font-bold">
                          Tên người đăng ký
                        </span>
                        <span className="text-white font-bold mb-4">
                          {selectedApp.user}
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase font-bold">
                          Tên doanh nghiệp
                        </span>
                        <span className="text-white font-bold">
                          {selectedApp.businessName}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase font-bold">
                          Địa chỉ đăng ký
                        </span>
                        <span className="text-slate-300 text-sm italic">
                          {selectedApp.address}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 uppercase font-bold">
                            Số điện thoại
                          </span>
                          <span className="text-white text-xs">
                            {selectedApp.phone}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 uppercase font-bold">
                            Email liên hệ
                          </span>
                          <span className="text-white text-xs truncate">
                            {selectedApp.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 2. Bank Account */}
                  <section>
                    <h3 className="text-xs font-black text-emerald-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                      <CreditCard size={14} /> Tài khoản thanh toán
                    </h3>
                    <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 relative overflow-hidden group">
                      <div className="absolute top-[-10px] right-[-10px] opacity-5 group-hover:scale-110 transition-transform">
                        <CreditCard size={80} />
                      </div>
                      <div className="space-y-3">
                        <p className="text-white font-mono text-lg tracking-[4px]">
                          {selectedApp.bank.number}
                        </p>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[9px] text-slate-500 uppercase font-bold">
                              Chủ tài khoản
                            </p>
                            <p className="text-white text-sm font-black italic">
                              {selectedApp.bank.accountName}
                            </p>
                          </div>
                          <p className="text-xs text-indigo-400 font-bold">
                            {selectedApp.bank.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* 3. Documents (Gallery) */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-yellow-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                    <ImageIcon size={14} /> Hồ sơ pháp lý (Click để xem)
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {selectedApp.docs.map((doc, idx) => (
                      <div key={idx} className="group relative">
                        <p className="text-[10px] text-slate-500 mb-1 font-bold uppercase">
                          {doc.title}
                        </p>
                        <div
                          onClick={() => setZoomImg(doc)}
                          className="relative h-40 rounded-xl overflow-hidden cursor-zoom-in border border-slate-800 hover:border-indigo-500 transition-all"
                        >
                          <img
                            src={doc.url}
                            className="w-full h-full object-cover group-hover:opacity-40 transition-opacity"
                            alt=""
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ZoomIn className="text-white" size={32} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-6 bg-slate-900/50 border-t border-slate-800 flex gap-4">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-xl transition shadow-lg shadow-green-900/20 flex items-center justify-center gap-2">
                <CheckCircle size={18} /> PHÊ DUYỆT OWNER
              </button>
              <button
                onClick={() => setShowReject(true)}
                className="flex-1 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white font-bold py-2 rounded-xl transition border border-red-600/20 flex items-center justify-center gap-2"
              >
                <XCircle size={18} /> TỪ CHỐI HỒ SƠ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ZOOM LIGHTBOX */}
      {zoomImg && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8">
          <div
            className="absolute inset-0 bg-black/95"
            onClick={() => setZoomImg(null)}
          ></div>
          <div className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center animate-in zoom-in duration-200">
            <button
              onClick={() => setZoomImg(null)}
              className="absolute top-0 right-0 p-4 text-white hover:text-indigo-400"
            >
              <X size={40} />
            </button>
            <img
              src={zoomImg.url}
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain border border-white/10"
              alt=""
            />
            <p className="mt-4 text-white font-bold uppercase tracking-widest text-lg">
              {zoomImg.title}
            </p>
          </div>
        </div>
      )}

      {/* REJECT MODAL (Giống phần trước) */}
      {showReject && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#1a1c2e] border border-slate-700 p-8 rounded-[24px] w-full max-w-md animate-in slide-in-from-bottom-4">
            <h3 className="text-xl font-bold text-white mb-4">
              Lý do từ chối hồ sơ
            </h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="VD: Giấy phép kinh doanh hết hạn hoặc mờ..."
              className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-red-500 transition"
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowReject(false)}
                className="flex-1 text-slate-400 font-bold"
              >
                Hủy
              </button>
              <button className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl">
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}

      {/* APPROVE MODAL */}
      {showApprove && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#1a1c2e] border border-slate-700 p-8 rounded-[24px] w-full max-w-md animate-in slide-in-from-bottom-4">
            <h3 className="text-xl font-bold text-white mb-4">
              Xác nhận duyệt hồ sơ
            </h3>
            <p className="text-slate-400 mb-6">
              Bạn có chắc chắn muốn duyệt hồ sơ này không?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowApprove(false)}
                className="flex-1 text-slate-400 font-bold"
              >
                Hủy
              </button>
              <button className="flex-1 bg-green-600 text-white font-bold py-3 rounded-xl">
                Xác nhận duyệt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerApprovals;
