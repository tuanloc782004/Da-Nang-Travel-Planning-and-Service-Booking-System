import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Lock, Sparkles } from "lucide-react";

const LoginPrompt = ({ isOpen, onClose, message }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white/90 backdrop-blur-[10px] p-8 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl w-full max-w-md shadow-2xl border border-white/60 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#004D40]/10 rounded-full transition-colors"
        >
          <X className="text-[#004D40]" size={20} />
        </button>

        <div className="w-16 h-16 bg-[#FFAB40]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="text-[#FFAB40]" size={32} />
        </div>

        <h3 className="text-2xl font-cormorant font-bold text-[#004D40] text-center mb-3">
          Vui lòng đăng nhập
        </h3>

        <p className="text-[#004D40]/70 text-center mb-8 text-sm">
          {message ||
            "Bạn cần đăng nhập để sử dụng tính năng này. Tạo tài khoản miễn phí chỉ trong 30 giây!"}
        </p>

        <div className="space-y-3">
          <button
            onClick={() => {
              onClose();
              navigate("/login");
            }}
            className="w-full bg-[#004D40] hover:bg-[#00332A] text-white px-6 py-3 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md font-bold transition-colors shadow-lg shadow-[#004D40]/20"
          >
            Đăng nhập ngay
          </button>

          <button
            onClick={() => {
              onClose();
              navigate("/sign-up");
            }}
            className="w-full bg-[#FFAB40]/10 hover:bg-[#FFAB40]/20 text-[#FFAB40] px-6 py-3 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md font-bold transition-colors border-2 border-[#FFAB40]/20"
          >
            Tạo tài khoản mới
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-[#E0F2F1]">
          <div className="flex items-center gap-2 text-xs text-[#004D40]/60">
            <Sparkles size={14} className="text-[#FFAB40]" />
            <span>Miễn phí mãi mãi • Không cần thẻ tín dụng</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPrompt;