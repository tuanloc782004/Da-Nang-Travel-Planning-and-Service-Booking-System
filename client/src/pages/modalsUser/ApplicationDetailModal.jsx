import React from 'react';
import { motion } from 'framer-motion';
import { Building2, CreditCard, FileText, X } from 'lucide-react';

const ApplicationDetailModal = ({ application, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white w-full max-w-4xl rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
      >
        {/* HEADER */}
        <div className="bg-[#004D40] p-6 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-cormorant font-bold text-white">
              Chi tiết hồ sơ đăng ký
            </h3>
            <p className="text-[#E0F2F1] text-sm mt-1">
              Mã đơn: {application._id?.slice(-8).toUpperCase()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="text-white" size={24} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Business Info */}
          <div className="bg-[#F5F5F5] p-6 rounded-tr-2xl rounded-bl-2xl rounded-tl-xl rounded-br-xl">
            <h4 className="font-bold text-[#004D40] mb-4 flex items-center gap-2">
              <Building2 size={18} />
              Thông tin doanh nghiệp
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Tên doanh nghiệp</p>
                <p className="font-bold text-[#004D40]">{application.businessName}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Số điện thoại</p>
                <p className="font-bold text-[#004D40]">{application.phoneNumber}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500 mb-1">Địa chỉ</p>
                <p className="font-bold text-[#004D40]">
                  {application.businessAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Bank Info */}
          <div className="bg-[#F5F5F5] p-6 rounded-tr-2xl rounded-bl-2xl rounded-tl-xl rounded-br-xl">
            <h4 className="font-bold text-[#004D40] mb-4 flex items-center gap-2">
              <CreditCard size={18} />
              Thông tin thanh toán
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Ngân hàng</p>
                <p className="font-bold text-[#004D40]">
                  {application.bankAccount.bankName}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Số tài khoản</p>
                <p className="font-bold text-[#004D40] font-mono">
                  {application.bankAccount.accountNumber}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500 mb-1">Chủ tài khoản</p>
                <p className="font-bold text-[#004D40]">
                  {application.bankAccount.accountHolderName}
                </p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-[#F5F5F5] p-6 rounded-tr-2xl rounded-bl-2xl rounded-tl-xl rounded-br-xl">
            <h4 className="font-bold text-[#004D40] mb-4 flex items-center gap-2">
              <FileText size={18} />
              Tài liệu đã gửi ({application.documents?.length || 0})
            </h4>
            <div className="grid grid-cols-3 gap-4">
              {application.documents?.map((doc, i) => (
                <div
                  key={i}
                  className="aspect-video rounded-lg overflow-hidden border-2 border-white shadow-sm"
                >
                  <img
                    src={doc.url}
                    alt={doc.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t">
          <button
            onClick={onClose}
            className="w-full bg-[#004D40] hover:bg-[#00332A] text-white font-bold py-3 rounded-tr-xl rounded-bl-xl transition-colors"
          >
            Đóng
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ApplicationDetailModal;