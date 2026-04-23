import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Eye,
  MapPin,
  User,
  Clock,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Info,
} from "lucide-react";

const mockServices = [
  {
    id: 1,
    name: "Khách sạn Mây Trắng",
    type: "HOTEL",
    owner: "Nguyễn Văn A",
    pricePreUnit: 800000 + "/phòng",
    status: "PENDING",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    ],
    address: "Đà Lạt, Lâm Đồng",
    description:
      "Khách sạn đạt tiêu chuẩn 4 sao với view nhìn ra thung lũng cực đẹp, đầy đủ tiện nghi hiện đại.",
    ownerEmail: "vana@gmail.com",
    ownerPhone: "0901234567",
  },
  {
    id: 2,
    name: "Tour Bà Nà Hills",
    type: "TOUR",
    owner: "Trần Thị B",
    pricePreUnit: 500000 + "/khách",
    status: "REJECTED",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800",
    ],
    address: "Đà Nẵng",
    description:
      "Trải nghiệm tour trọn gói đến Bà Nà Hills với xe đưa đón, vé cáp treo và hướng dẫn viên chuyên nghiệp.",
    ownerEmail: "thib@gmail.com",
    ownerPhone: "0901234568",
  },
  {
    id: 3,
    name: "Dịch vụ cho thuê xe máy",
    type: "CAR_RENTAL",
    owner: "Lê Văn C",
    pricePreUnit: 200000 + "/ngày",
    status: "APPROVED",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800",
    ],
    address: "Đà Nẵng",
    description:
      "Cho thuê xe máy với giá cả hợp lý, chất lượng tốt, phục vụ khách hàng tận tâm.",
    ownerEmail: "vanc@gmail.com",
    ownerPhone: "0901234569",
  },
];

const ServiceApprovals = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [rejectReason, setRejectReason] = useState("");
  const [tab, setTab] = useState("PENDING");

  const filteredApps = mockServices.filter((service) => service.status === tab);

  const getTypeLabel = (type) => {
    switch (type) {
      case "HOTEL":
        return "Khách sạn";
      case "RESTAURANT":
        return "Nhà hàng";
      case "ACTIVITY":
        return "Hoạt động";
      case "TOUR":
        return "Tour";
      case "CAR_RENTAL":
        return "Thuê xe";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* HEADER & FILTER (Giữ nguyên phần trước) */}
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

      {/* SERVICE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((service) => (
          <div
            key={service.id}
            className="bg-[#1a1c2e] border border-slate-800 rounded-2xl overflow-hidden group hover:border-indigo-500/50 transition-all shadow-xl"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={service.images[0]}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider border border-white/10">
                {getTypeLabel(service.type)}
              </span>
              <span
                className={`absolute top-3 right-3 text-[10px] px-2 py-1 rounded-md font-bold border ${
                  service.status === "PENDING"
                    ? "bg-yellow-600/20 text-yellow-400 border-yellow-600/50"
                    : service.status === "APPROVED"
                      ? "bg-green-600/20 text-green-400 border-green-600/50"
                      : "bg-red-600/20 text-red-400 border-red-600/50"
                }`}
              >
                {service.status === "PENDING"
                  ? "Chờ duyệt"
                  : service.status === "APPROVED"
                    ? "Đã duyệt"
                    : "Đã từ chối"}
              </span>
            </div>

            <div className="p-5 space-y-4">
              <h3 className="text-lg font-bold text-white line-clamp-1">
                {service.name}
              </h3>
              <div className="flex flex-col gap-1 py-3 border-y border-slate-800/50">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                  Giá
                </p>
                <p className="text-sm font-black text-emerald-400">
                  {service.pricePreUnit}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <User size={14} />{" "}
                  <span className="text-xs">{service.owner}</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedService(service);
                    setActiveImgIndex(0);
                  }}
                  className="bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2"
                >
                  <Eye size={14} /> Chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
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

      {/* MODAL CHI TIẾT DỊCH VỤ (New Gallery Style) */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          ></div>

          <div className="bg-[#1a1c2e] border border-slate-700 w-full max-w-5xl rounded-[32px] overflow-hidden relative shadow-2xl animate-in zoom-in duration-300">
            <div className="flex flex-col md:flex-row h-[85vh]">
              {/* Left: Beautiful Gallery */}
              <div className="w-full md:w-3/5 bg-black relative flex flex-col p-6">
                <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative">
                  <img
                    src={selectedService.images[activeImgIndex]}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                {/* Thumbnail List */}
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {selectedService.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${activeImgIndex === idx ? "border-indigo-500 scale-105" : "border-transparent opacity-50"}`}
                    >
                      <img
                        src={img}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Info Section */}
              <div className="w-full md:w-2/5 p-8 flex flex-col bg-[#1e213a]">
                <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                  <div>
                    <h2 className="text-2xl font-black text-white">
                      {selectedService.name}
                    </h2>
                    <p className="text-emerald-400 font-bold mt-2 text-lg">
                      {selectedService.pricePreUnit}
                    </p>
                    <p className="text-slate-400 text-sm flex items-center mt-2 font-medium">
                      <MapPin size={14} className="mr-1 text-red-400" />{" "}
                      {selectedService.address}
                    </p>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase mb-3">
                      Thông tin đối tác
                    </h4>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white">
                        {selectedService.owner.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-white">
                        {selectedService.owner}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Mail size={12} /> {selectedService.ownerEmail}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Phone size={12} /> {selectedService.ownerPhone}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-slate-500 uppercase mb-2">
                      Mô tả bài đăng
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed italic">
                      "{selectedService.description}"
                    </p>
                  </div>
                </div>

                {/* Footer Buttons (Smaller) */}
                <div className="pt-6 mt-6 border-t border-slate-800 flex gap-3">
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={16} /> PHÊ DUYỆT
                  </button>
                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="flex-1 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white font-bold py-2.5 rounded-xl text-xs transition border border-red-600/20 flex items-center justify-center gap-2"
                  >
                    <XCircle size={16} /> TỪ CHỐI
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* THÔNG BÁO XÁC NHẬN PHÊ DUYỆT */}
      {showConfirm && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a1c2e] border border-slate-700 p-8 rounded-[24px] w-full max-w-sm text-center shadow-2xl animate-in fade-in slide-in-from-top-4">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Xác nhận phê duyệt?
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Dịch vụ này sẽ được hiển thị công khai trên website sau khi bạn
              xác nhận.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 text-slate-400 font-bold hover:text-white transition"
              >
                Hủy
              </button>
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl transition">
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}

      {showRejectModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90">
          <div className="bg-[#1a1c2e] border border-slate-700 p-6 rounded-2xl w-full max-w-md animate-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2 text-red-400 mb-4">
              <AlertCircle />
              <h3 className="font-bold text-lg text-white">Lý do từ chối</h3>
            </div>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="VD: Hình ảnh không rõ nét, sai địa chỉ, vi phạm chính sách..."
              className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-white focus:border-red-500 outline-none transition"
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-2 text-slate-400 font-bold hover:text-white transition"
              >
                Hủy bỏ
              </button>
              <button className="flex-1 bg-red-600 text-white font-bold py-2 rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-900/20">
                GỬI PHẢN HỒI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceApprovals;
