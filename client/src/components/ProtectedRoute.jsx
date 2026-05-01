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

  const hasAccess = allowedRoles.length === 0 || allowedRoles.includes(userRole);

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6">
        <motion.div className="bg-white p-12 rounded-2xl shadow-xl text-center max-w-md">
          <Lock className="text-[#FF5252] mx-auto mb-6" size={48} />
          <h2 className="text-2xl font-bold text-[#004D40] mb-4">Hạn chế truy cập</h2>
          <p className="text-[#004D40]/60 mb-6">
            Bạn không có quyền truy cập vào khu vực này.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#004D40] text-white px-6 py-2 rounded-lg"
          >
            Về trang chủ
          </button>
        </motion.div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;