import React, { useState } from "react";
import { 
  Landmark, CreditCard, User, CheckCircle2, 
  AlertCircle, Edit, Save, X, Eye, EyeOff 
} from "lucide-react";

const AdminBank = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showFullAccount, setShowFullAccount] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Data mẫu tài khoản ngân hàng của Phương
  const [bankData, setBankData] = useState({
    bankName: "Vietcombank (VCB)",
    accountNumber: "1234567890123",
    accountHolder: "TRAN THI THANH PHUONG"
  });

  // Hàm che số tài khoản: ****1234
  const formatAccountNumber = (number) => {
    if (showFullAccount) return number;
    const lastFour = number.slice(-4);
    return `****${lastFour}`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
            <Landmark size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Tài khoản ngân hàng</h1>
            <p className="text-slate-500 text-sm italic">Nơi nhận doanh thu từ hệ thống và VNPay</p>
          </div>
        </div>
        
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold text-sm transition"
          >
            <Edit size={16} /> Chỉnh sửa
          </button>
        )}
      </div>

      {/* BANK CARD VISUAL */}
      <div className="bg-gradient-to-br from-slate-900 to-[#1a1c2e] p-8 rounded-[32px] border border-slate-700 shadow-2xl relative overflow-hidden group">
        {/* Chips & Logo Decor */}
        <div className="flex justify-between items-start mb-12">
           <div className="w-12 h-10 bg-gradient-to-tr from-amber-400 to-amber-200 rounded-md opacity-80 shadow-inner"></div>
           <Landmark size={40} className="text-white/10 group-hover:text-white/20 transition-all" />
        </div>

        <div className="space-y-6">
            {/* Account Number Section */}
            <div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-[2px]">Số tài khoản nhận tiền</p>
                <div className="flex items-center gap-4">
                    {isEditing ? (
                        <input 
                            type="text"
                            value={bankData.accountNumber}
                            onChange={(e) => setBankData({...bankData, accountNumber: e.target.value})}
                            className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1 text-xl font-mono text-white outline-none focus:border-indigo-500 w-full"
                        />
                    ) : (
                        <h2 className="text-3xl font-mono text-white tracking-[4px]">
                            {formatAccountNumber(bankData.accountNumber)}
                        </h2>
                    )}
                    {!isEditing && (
                        <button 
                            onClick={() => setShowFullAccount(!showFullAccount)}
                            className="text-slate-500 hover:text-white transition"
                        >
                            {showFullAccount ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    )}
                </div>
            </div>

            {/* Holder & Bank Name */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-[1px]">Chủ tài khoản</p>
                    {isEditing ? (
                        <input 
                            type="text"
                            value={bankData.accountHolder}
                            onChange={(e) => setBankData({...bankData, accountHolder: e.target.value.toUpperCase()})}
                            className="bg-slate-800 border border-slate-600 rounded-lg px-2 py-1 text-sm text-white outline-none w-full"
                        />
                    ) : (
                        <p className="text-white font-bold uppercase italic tracking-wider">{bankData.accountHolder}</p>
                    )}
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-[1px]">Ngân hàng</p>
                    {isEditing ? (
                        <select 
                            value={bankData.bankName}
                            onChange={(e) => setBankData({...bankData, bankName: e.target.value})}
                            className="bg-slate-800 border border-slate-600 rounded-lg px-2 py-1 text-sm text-white outline-none"
                        >
                            <option>Vietcombank (VCB)</option>
                            <option>Techcombank (TCB)</option>
                            <option>MB Bank</option>
                            <option>VietinBank</option>
                        </select>
                    ) : (
                        <p className="text-indigo-400 font-black">{bankData.bankName}</p>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* ACTIONS */}
      {isEditing && (
        <div className="flex gap-4 animate-in slide-in-from-top-2">
            <button 
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-slate-800 text-slate-400 font-bold py-3 rounded-2xl hover:bg-slate-700 transition flex items-center justify-center gap-2"
            >
                <X size={18} /> Hủy bỏ
            </button>
            <button 
                onClick={() => setIsConfirmOpen(true)}
                className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
                <Save size={18} /> Cập nhật tài khoản
            </button>
        </div>
      )}

      {/* INFO BOX */}
      <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-2xl flex gap-3">
        <AlertCircle className="text-blue-400 shrink-0" size={20} />
        <p className="text-xs text-slate-400 leading-relaxed">
            Mọi yêu cầu rút tiền từ Owner hoặc thanh toán tự động qua VNPay sẽ được đối soát và chuyển về tài khoản này. Vui lòng đảm bảo thông tin chính xác tuyệt đối.
        </p>
      </div>

      {/* CONFIRM MODAL */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
           <div className="bg-[#1a1c2e] border border-slate-700 p-8 rounded-[32px] w-full max-w-sm text-center shadow-2xl animate-in zoom-in duration-200">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Xác nhận thay đổi?</h3>
              <p className="text-slate-400 text-sm mb-8">Hệ thống sẽ cập nhật thông tin nhận tiền mới. Bạn đã kiểm tra kỹ số tài khoản chưa?</p>
              
              <div className="flex gap-3">
                 <button onClick={() => setIsConfirmOpen(false)} className="flex-1 py-3 text-slate-400 font-bold">Kiểm tra lại</button>
                 <button 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition"
                  onClick={() => {
                    setIsEditing(false);
                    setIsConfirmOpen(false);
                  }}
                 >
                    Đồng ý lưu
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminBank;