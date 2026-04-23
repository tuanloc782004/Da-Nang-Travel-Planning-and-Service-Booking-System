import React, { useState } from "react";
import { CreditCard, Eye, EyeOff, Save, ShieldCheck } from "lucide-react";

const PaymentSettings = () => {
  const [showSecret, setShowSecret] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [vnpayConfig, setVnpayConfig] = useState({
    tmnCode: "TP123456",
    hashSecret: "A5F6G7H8J9K0L1M2N3P4Q5R6S7T8U9V0"
  });

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
        <div className="p-3 bg-indigo-600/20 rounded-2xl text-indigo-400">
          <CreditCard size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Cấu hình thanh toán</h1>
          <p className="text-slate-500 text-sm">Kết nối Terminal và Secret Key từ VNPay Sandbox/Production</p>
        </div>
      </div>

      <div className="bg-[#1a1c2e] p-8 rounded-[32px] border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Decor Background */}
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <ShieldCheck size={120} />
        </div>

        {/* VNPay Terminal ID */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            VNPay Terminal ID (vnp_TmnCode) <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            value={vnpayConfig.tmnCode}
            onChange={(e) => setVnpayConfig({...vnpayConfig, tmnCode: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none transition font-mono"
            placeholder="Nhập mã Terminal..."
          />
        </div>

        {/* VNPay Hash Secret */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            VNPay Hash Secret Key <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input 
              type={showSecret ? "text" : "password"} 
              value={vnpayConfig.hashSecret}
              onChange={(e) => setVnpayConfig({...vnpayConfig, hashSecret: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-white focus:border-indigo-500 outline-none transition font-mono"
              placeholder="Nhập mã Secret..."
            />
            <button 
              onClick={() => setShowSecret(!showSecret)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
            >
              {showSecret ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="text-[10px] text-slate-600 italic">Mã bí mật dùng để tạo chữ ký (checksum) cho mỗi giao dịch.</p>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button 
            onClick={() => setIsConfirmOpen(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
          >
            <Save size={18} /> LƯU CẤU HÌNH
          </button>
        </div>
      </div>

      {/* MODAL CONFIRM */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
           <div className="bg-[#1a1c2e] border border-slate-700 p-8 rounded-[32px] w-full max-w-sm text-center shadow-2xl animate-in zoom-in duration-200">
              <div className="w-16 h-16 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Lưu cấu hình VNPay?</h3>
              <p className="text-slate-400 text-sm mb-8">Việc thay đổi các mã này sẽ ảnh hưởng trực tiếp đến quy trình thanh toán của Owner trên toàn website.</p>
              
              <div className="flex gap-3">
                 <button 
                  onClick={() => setIsConfirmOpen(false)} 
                  className="flex-1 py-3 text-slate-400 font-bold hover:text-white transition"
                 >
                    Hủy
                 </button>
                 <button 
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition"
                  onClick={() => {
                    // Xử lý lưu ở đây
                    setIsConfirmOpen(false);
                    alert("Đã lưu cấu hình mới!");
                  }}
                 >
                    Xác nhận Lưu
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSettings;