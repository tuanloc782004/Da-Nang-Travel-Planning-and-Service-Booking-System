import React, { useState } from "react";
import {
  Package,
  Plus,
  Edit3,
  Trash2,
  X,
  AlertTriangle,
  Calendar,
  DollarSign,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";
import mockPackages from "./mockdatas/mockPackages";

const Packages = () => {
  const [packages, setPackages] = useState(mockPackages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [packageToDelete, setPackageToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    desc: "",
  });

  const handleOpenModal = (pkg = null) => {
    if (pkg) {
      setCurrentPackage(pkg);
      setFormData({
        name: pkg.name,
        price: pkg.price,
        duration: pkg.duration,
        desc: pkg.desc,
      });
    } else {
      setCurrentPackage(null);
      setFormData({ name: "", price: "", duration: "", desc: "" });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-jakarta pb-10">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-cormorant font-bold text-[#004D40]">
            Quản lý gói đăng ký
          </h1>
          <p className="text-[#004D40]/60 mt-1 font-medium text-sm">
            Tạo và quản lý các gói dịch vụ cho Owner
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#004D40] hover:bg-[#00332A] text-white px-6 py-2.5 rounded-tr-[20px] rounded-bl-[20px] rounded-tl-md rounded-br-md font-bold text-sm flex items-center gap-2 transition shadow-lg shadow-[#004D40]/20"
        >
          <Plus size={18} /> Tạo gói mới
        </button>
      </motion.div>

      {/* TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-[10px] rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#004D40]/5 text-[#004D40] text-xs uppercase">
                <th className="px-6 py-4 text-left font-bold">Tên gói</th>
                <th className="px-6 py-4 text-left font-bold">Giá (VNĐ)</th>
                <th className="px-6 py-4 text-left font-bold">Thời hạn</th>
                <th className="px-6 py-4 text-left font-bold">Trạng thái</th>
                <th className="px-6 py-4 text-right font-bold">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {packages.map((pkg, idx) => (
                <motion.tr
                  key={pkg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-[#E0F2F1]/40 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#004D40]/10 text-[#004D40] rounded-lg">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-[#004D40]">{pkg.name}</p>
                        <p className="text-xs text-[#004D40]/60 line-clamp-1 max-w-[250px]">
                          {pkg.desc}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-black text-[#FFAB40]">
                    {pkg.price.toLocaleString()}đ
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-[#004D40]/70 text-xs">
                      <Calendar size={14} /> {pkg.duration}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-[#00C853]/10 text-[#00C853] text-[10px] font-bold border border-[#00C853]/20">
                      HOẠT ĐỘNG
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(pkg)}
                        className="p-2 hover:bg-[#FFAB40]/10 text-[#FFAB40] rounded-lg transition"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setPackageToDelete(pkg);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-2 hover:bg-[#FF5252]/10 text-[#FF5252] rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* MODAL: CREATE / EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-[10px] w-full max-w-lg rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-[#E0F2F1] flex justify-between items-center">
              <h2 className="text-xl font-cormorant font-bold text-[#004D40] flex items-center gap-2">
                {currentPackage ? (
                  <Edit3 className="text-[#FFAB40]" />
                ) : (
                  <Plus className="text-[#004D40]" />
                )}
                {currentPackage ? "Chỉnh sửa gói" : "Tạo gói đăng ký mới"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#004D40]/60 hover:text-[#004D40]"
              >
                <X />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#004D40]/70 mb-1.5 uppercase">
                  Tên gói dịch vụ
                </label>
                <div className="relative">
                  <Layers
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#004D40]/40"
                    size={16}
                  />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="VD: Gói VIP Tháng"
                    className="w-full bg-white/60 border border-[#E0F2F1] rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md py-3 pl-10 pr-4 text-[#004D40] focus:ring-2 focus:ring-[#004D40]/20 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#004D40]/70 mb-1.5 uppercase">
                    Giá (VNĐ)
                  </label>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#004D40]/40"
                      size={16}
                    />
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="500,000"
                      className="w-full bg-white/60 border border-[#E0F2F1] rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md py-3 pl-10 pr-4 text-[#004D40] focus:ring-2 focus:ring-[#004D40]/20 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#004D40]/70 mb-1.5 uppercase">
                    Thời hạn
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#004D40]/40"
                      size={16}
                    />
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      placeholder="30 ngày"
                      className="w-full bg-white/60 border border-[#E0F2F1] rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md py-3 pl-10 pr-4 text-[#004D40] focus:ring-2 focus:ring-[#004D40]/20 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#004D40]/70 mb-1.5 uppercase">
                  Mô tả quyền lợi
                </label>
                <textarea
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData({ ...formData, desc: e.target.value })
                  }
                  placeholder="Nhập các quyền lợi của gói..."
                  className="w-full h-24 bg-white/60 border border-[#E0F2F1] rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md p-4 text-[#004D40] focus:ring-2 focus:ring-[#004D40]/20 outline-none resize-none"
                />
              </div>
            </div>

            <div className="p-6 bg-white/40 border-t border-[#E0F2F1] flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2.5 text-[#004D40]/60 font-bold hover:text-[#004D40] transition"
              >
                Hủy bỏ
              </button>
              <button className="flex-1 bg-[#004D40] hover:bg-[#00332A] text-white font-bold py-2.5 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md transition">
                {currentPackage ? "Cập nhật gói" : "Xác nhận tạo"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-[10px] p-8 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl w-full max-w-sm text-center shadow-2xl"
          >
            <div className="w-16 h-16 bg-[#FF5252]/20 text-[#FF5252] rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-2xl font-cormorant font-bold text-[#004D40] mb-2">
              Xác nhận xóa?
            </h3>
            <p className="text-[#004D40]/60 text-sm mb-6">
              Bạn có chắc chắn muốn xóa{" "}
              <span className="text-[#004D40] font-bold">
                {packageToDelete?.name}
              </span>
              ? Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 text-[#004D40]/60 font-bold hover:text-[#004D40] transition"
              >
                Hủy
              </button>
              <button className="flex-1 bg-[#FF5252] hover:bg-[#E04848] text-white font-bold py-2.5 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md transition">
                Xóa ngay
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Packages;