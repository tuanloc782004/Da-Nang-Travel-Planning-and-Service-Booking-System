import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Loader2 } from "lucide-react";
import { useAuthSync } from "../hooks/useAuthSync";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isLoaded, isSignedIn } = useUser();
  const { dbUser, isLoading: isDbLoading } = useAuthSync();
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = dbUser?.role || "USER";

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [isLoaded, isSignedIn, navigate, location]);

  if (!isLoaded || isDbLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2
            className="animate-spin text-[#004D40] mx-auto mb-4"
            size={48}
          />
          <p className="text-[#004D40] font-bold">
            Đang kiểm tra quyền truy cập...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!isSignedIn) return null;

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-[10px] p-12 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 text-center max-w-md"
        >
          <div className="w-16 h-16 bg-[#FF5252]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-[#FF5252]" size={32} />
          </div>
          <h2 className="text-2xl font-cormorant font-bold text-[#004D40] mb-4">
            Khu vực hạn chế
          </h2>
          <p className="text-[#004D40]/60 mb-6">
            Trang này chỉ dành cho <strong>{allowedRoles.join(", ")}</strong>.
            {userRole === "ADMIN"
              ? " Với tư cách là Admin, bạn vui lòng quản lý thông qua Admin Dashboard."
              : " Bạn không có quyền truy cập vào mục này."}
          </p>
          <button
            onClick={() => navigate(userRole === "ADMIN" ? "/admin" : "/")}
            className="bg-[#004D40] text-white px-6 py-3 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md font-bold hover:bg-[#00332A] transition-colors"
          >
            {userRole === "ADMIN" ? "Về Admin Dashboard" : "Về trang chủ"}
          </button>
        </motion.div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;