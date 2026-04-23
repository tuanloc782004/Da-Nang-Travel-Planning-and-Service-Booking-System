import React, { useState } from "react";
import { 
  Package, Plus, Edit3, Trash2, CheckCircle, 
  X, AlertTriangle, Calendar, DollarSign, Layers
} from "lucide-react";

const mockPackages = [
  { id: 1, name: "Gói Cơ Bản", price: 500000, duration: "30 ngày", desc: "Đăng tối đa 5 dịch vụ, hỗ trợ cơ bản.", status: "ACTIVE" },
  { id: 2, name: "Gói Nâng Cao", price: 1200000, duration: "90 ngày", desc: "Đăng 20 dịch vụ, ưu tiên hiển thị tìm kiếm.", status: "ACTIVE" },
  { id: 3, name: "Gói Premium", price: 4500000, duration: "365 ngày", desc: "Không giới hạn dịch vụ, hỗ trợ 24/7, quảng cáo trang chủ.", status: "ACTIVE" },
];

const Packages = () => {
  const [packages, setPackages] = useState(mockPackages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null); // Để phân biệt Add hay Edit
  const [packageToDelete, setPackageToDelete] = useState(null);

  // Form State
  const [formData, setFormData] = useState({ name: "", price: "", duration: "", desc: "" });

  const handleOpenModal = (pkg = null) => {
    if (pkg) {
      setCurrentPackage(pkg);
      setFormData({ name: pkg.name, price: pkg.price, duration: pkg.duration, desc: pkg.desc });
    } else {
      setCurrentPackage(null);
      setFormData({ name: "", price: "", duration: "", desc: "" });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <button 
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition shadow-lg shadow-indigo-500/20"
        >
          <Plus size={18} /> Tạo gói mới
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[#1a1c2e] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/50 text-slate-400 uppercase text-[10px] font-black tracking-widest">
            <tr>
              <th className="px-6 py-4">Tên gói</th>
              <th className="px-6 py-4">Giá (VNĐ)</th>
              <th className="px-6 py-4">Thời hạn</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {packages.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-slate-800/20 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                        <Package size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-white">{pkg.name}</p>
                        <p className="text-[10px] text-slate-500 line-clamp-1 max-w-[200px]">{pkg.desc}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-black text-emerald-400">
                    {pkg.price.toLocaleString()}đ
                </td>
                <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-slate-400">
                        <Calendar size={14} /> {pkg.duration}
                    </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-[10px] font-bold border border-green-500/20">
                    HOẠT ĐỘNG
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                        onClick={() => handleOpenModal(pkg)}
                        className="p-2 hover:bg-amber-500/10 text-amber-500 rounded-lg transition"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                        onClick={() => { setPackageToDelete(pkg); setIsDeleteModalOpen(true); }}
                        className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL: CREATE / EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-[#1a1c2e] border border-slate-700 w-full max-w-lg rounded-[24px] overflow-hidden relative shadow-2xl animate-in zoom-in duration-300">
            <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    {currentPackage ? <Edit3 className="text-amber-500" /> : <Plus className="text-indigo-500" />}
                    {currentPackage ? "Chỉnh sửa gói" : "Tạo gói đăng ký mới"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white"><X /></button>
            </div>

            <div className="p-8 space-y-5">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Tên gói dịch vụ</label>
                    <div className="relative">
                        <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                        <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="VD: Gói VIP Tháng"
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-indigo-500 outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Giá niêm yết (VNĐ)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                            <input 
                                type="number" 
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                placeholder="500,000"
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-indigo-500 outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Thời hạn sử dụng</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                            <input 
                                type="text" 
                                value={formData.duration}
                                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                placeholder="30 ngày"
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-indigo-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Mô tả quyền lợi</label>
                    <textarea 
                        value={formData.desc}
                        onChange={(e) => setFormData({...formData, desc: e.target.value})}
                        placeholder="Nhập các quyền lợi của gói..."
                        className="w-full h-24 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:border-indigo-500 outline-none resize-none"
                    />
                </div>
            </div>

            <div className="p-6 bg-slate-900/50 border-t border-slate-800 flex gap-3">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-slate-400 font-bold">Hủy bỏ</button>
                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition">
                    {currentPackage ? "Cập nhật gói" : "Xác nhận tạo"}
                </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90">
            <div className="bg-[#1a1c2e] border border-slate-700 p-8 rounded-[24px] w-full max-w-sm text-center animate-in slide-in-from-top-4">
                <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Xác nhận xóa?</h3>
                <p className="text-slate-400 text-sm mb-6">
                    Bạn có chắc chắn muốn xóa <span className="text-white font-bold">{packageToDelete?.name}</span>? Hành động này không thể hoàn tác.
                </p>
                <div className="flex gap-3">
                    <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-2 text-slate-400 font-bold">Hủy</button>
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-xl transition">Xóa ngay</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Packages;