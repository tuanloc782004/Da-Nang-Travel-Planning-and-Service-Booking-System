import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Trash2, Loader2 } from 'lucide-react';

const CancelConfirmModal = ({ onClose, onConfirm, isLoading }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl w-full max-w-md shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="text-red-500" size={32} />
          </div>

          <h3 className="text-2xl font-cormorant font-bold text-[#004D40] text-center mb-3">
            Xác nhận hủy đơn?
          </h3>

          <p className="text-center text-[#004D40]/70 mb-8 text-sm">
            Hành động này không thể hoàn tác. Bạn sẽ cần gửi lại đơn mới nếu muốn
            tiếp tục đăng ký.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#004D40] font-bold py-3 rounded-tr-xl rounded-bl-xl transition-colors disabled:opacity-50"
            >
              Giữ lại
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-tr-xl rounded-bl-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Đang hủy...
                </>
              ) : (
                <>
                  <Trash2 size={18} />
                  Hủy đơn
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CancelConfirmModal;