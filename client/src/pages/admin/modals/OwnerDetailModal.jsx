import React from "react";
import { motion } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const OwnerDetailModal = ({
  application,
  onClose,
  onApprove,
  onReject,
  onImageClick,
  getStatusBadge,
}) => {
  if (!application) return null;
  const badge = getStatusBadge(application.status) || {};
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#F5F5F5] w-full max-w-6xl rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
      >
        {/* HEADER */}
        <div className="bg-white/90 backdrop-blur-[10px] p-6 border-b border-[#E0F2F1] flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-cormorant font-bold text-[#004D40]">
              Hồ sơ đăng ký Owner
            </h2>
            <p className="text-sm text-[#004D40]/60 mt-1">
              Mã đơn: <span className="font-bold">{application._id?.slice(-8).toUpperCase()}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#004D40]/5 rounded-full transition-colors"
          >
            <X className="text-[#004D40]" size={24} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* CỘT TRÁI - Thông tin người dùng */}
          <div className="lg:col-span-4 space-y-6">
            {/* Người đăng ký */}
            <div className="bg-white/80 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
              <h3 className="text-xl font-cormorant font-bold text-[#004D40] border-b border-[#004D40]/10 pb-3 mb-5">
                Người đăng ký
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#004D40]/70 mb-1.5">
                    Họ và tên
                  </label>
                  <p className="text-base font-bold text-[#004D40]">
                    {application.userId?.fullName}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#004D40]/70 mb-1.5">
                    Email
                  </label>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-[#004D40]/60" />
                    <p className="text-sm text-[#004D40]">
                      {application.userId?.email || "-"}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#004D40]/70 mb-1.5">
                    Số điện thoại
                  </label>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-[#004D40]/60" />
                    <p className="text-sm text-[#004D40]">{application.phoneNumber}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#004D40]/70 mb-1.5">
                    Trạng thái
                  </label>
                  <span
                    className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold border ${
                    badge.bg
                    } ${badge.text} ${badge.border}`}
                  >
                  {badge.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Doanh nghiệp */}
            <div className="bg-white/80 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
              <h3 className="text-xl font-cormorant font-bold text-[#004D40] border-b border-[#004D40]/10 pb-3 mb-5">
                Thông tin doanh nghiệp
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#004D40]/70 mb-1.5">
                    Tên doanh nghiệp
                  </label>
                  <p className="text-base font-bold text-[#004D40]">
                    {application.businessName}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#004D40]/70 mb-1.5">
                    Địa chỉ
                  </label>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-red-500 mt-0.5" />
                    <p className="text-sm text-[#004D40]">{application.businessAddress}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#004D40]/70 mb-1.5">
                    Ngày đăng ký
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-[#004D40]/60" />
                    <p className="text-sm text-[#004D40]">{new Date(application.createdAt).toLocaleDateString('vi-VN')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin ngân hàng */}
            <div className="bg-white/80 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
              <h3 className="text-xl font-cormorant font-bold text-[#004D40] border-b border-[#004D40]/10 pb-3 mb-5">
                Thông tin thanh toán
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#004D40]/10 rounded-lg flex items-center justify-center">
                    <CreditCard size={20} className="text-[#004D40]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#004D40]/60">Ngân hàng</p>
                    <p className="text-sm font-bold text-[#004D40]">
                      {application.bankAccount?.bankName}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#004D40]/70 mb-1">
                    Tên tài khoản
                  </label>
                  <p className="text-sm text-[#004D40]">
                    {application.bankAccount?.accountHolderName}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#004D40]/70 mb-1">
                    Số tài khoản
                  </label>
                  <p className="text-sm font-mono text-[#004D40]">
                    {application.bankAccount?.accountNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Ghi chú admin */}
            {application.adminNotes && (
              <div className="bg-[#FFAB40]/10 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl border-2 border-[#FFAB40]/30">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={18} className="text-[#FFAB40]" />
                  <h3 className="text-sm font-bold text-[#FFAB40] uppercase">
                    Ghi chú Admin
                  </h3>
                </div>
                <p className="text-sm text-[#004D40] leading-relaxed">
                  {application.adminNotes}
                </p>
              </div>
            )}
          </div>

          {/* CỘT PHẢI - Tài liệu */}
          <div className="lg:col-span-8 space-y-6">
            {/* CCCD */}
            <div className="bg-white/80 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
              <h3 className="text-xl font-cormorant font-bold text-[#004D40] border-b border-[#004D40]/10 pb-3 mb-5">
                CCCD / CMND
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {(application.documents || []).filter((d) => d.type === "CCCD")
                  .map((doc, i) => (
                    <div key={i}>
                      <p className="text-xs font-bold text-[#004D40]/70 mb-2">
                        {doc.title}
                      </p>
                      <div
                        onClick={() => onImageClick(doc)}
                        className="aspect-video rounded-tr-[24px] rounded-bl-[24px] rounded-tl-xl rounded-br-xl overflow-hidden border-2 border-[#E0F2F1] cursor-zoom-in hover:border-[#004D40] transition-all group"
                      >
                        <img
                          src={doc.url}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          alt={doc.title}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Giấy phép kinh doanh */}
            {(application.documents || []).filter((d) => d.type === "BUSINESS_LICENSE").length >
              0 && (
              <div className="bg-white/80 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
                <h3 className="text-xl font-cormorant font-bold text-[#004D40] border-b border-[#004D40]/10 pb-3 mb-5">
                  Giấy phép kinh doanh
                </h3>
                <div className="space-y-4">
                  {application.documents
                    .filter((d) => d.type === "BUSINESS_LICENSE")
                    .map((doc, i) => (
                      <div key={i}>
                        <p className="text-xs font-bold text-[#004D40]/70 mb-2">
                          {doc.title}
                        </p>
                        <div
                          onClick={() => onImageClick(doc)}
                          className="aspect-video rounded-tr-[24px] rounded-bl-[24px] rounded-tl-xl rounded-br-xl overflow-hidden border-2 border-[#E0F2F1] cursor-zoom-in hover:border-[#004D40] transition-all group"
                        >
                          <img
                            src={doc.url}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            alt={doc.title}
                          />
                        </div>
                        {doc.description && (
                          <p className="text-xs text-[#004D40]/60 mt-2 italic">
                            {doc.description}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Ảnh dịch vụ */}
            {(application.documents || []).filter((d) => d.type === "SERVICE_IMAGE").length >
              0 && (
              <div className="bg-white/80 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
                <h3 className="text-xl font-cormorant font-bold text-[#004D40] border-b border-[#004D40]/10 pb-3 mb-5">
                  Ảnh dịch vụ
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {application.documents
                    .filter((d) => d.type === "SERVICE_IMAGE")
                    .map((doc, i) => (
                      <div key={i}>
                        <div
                          onClick={() => onImageClick(doc)}
                          className="aspect-video rounded-tr-[24px] rounded-bl-[24px] rounded-tl-xl rounded-br-xl overflow-hidden border-2 border-[#E0F2F1] cursor-zoom-in hover:border-[#004D40] transition-all group"
                        >
                          <img
                            src={doc.url}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            alt="Service"
                          />
                        </div>
                        {doc.description && (
                          <p className="text-xs text-[#004D40]/60 mt-2">
                            {doc.description}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        {application.status === "PENDING" && (
          <div className="bg-white/90 backdrop-blur-[10px] p-6 border-t border-[#E0F2F1] flex gap-4">
            <button
              onClick={onApprove}
              className="flex-1 bg-[#00C853] hover:bg-[#00B248] text-white font-bold py-3 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} /> PHÊ DUYỆT
            </button>
            <button
              onClick={onReject}
              className="flex-1 bg-[#FF5252]/10 hover:bg-[#FF5252] text-[#FF5252] hover:text-white font-bold py-3 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md transition-all border-2 border-[#FF5252]/30 flex items-center justify-center gap-2"
            >
              <XCircle size={20} /> TỪ CHỐI
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OwnerDetailModal;