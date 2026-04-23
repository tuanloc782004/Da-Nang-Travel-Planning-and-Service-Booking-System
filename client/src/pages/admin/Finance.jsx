import React, { useState } from "react";
import { 
  DollarSign, TrendingUp, CreditCard, ArrowUpRight, 
  Search, Filter, Eye, RotateCcw, CheckCircle2, 
  XCircle, Clock, FileText, ExternalLink, AlertCircle
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

// Data mẫu doanh thu theo ngày
const chartData = [
  { date: '10/04', amount: 2100 }, { date: '11/04', amount: 4500 },
  { date: '12/04', amount: 3200 }, { date: '13/04', amount: 8900 },
  { date: '14/04', amount: 5400 }, { date: '15/04', amount: 7200 },
  { date: '16/04', amount: 12000 },
];

const mockTransactions = [
  { 
    id: "TXN123456", owner: "Nguyễn Văn A", package: "Gói Premium", 
    amount: 4500000, status: "PAID", date: "2026-04-16 14:20",
    vnpayRef: "VNP15892023", email: "vana@gmail.com"
  },
  { 
    id: "TXN123457", owner: "Luxury Hotel", package: "Gói Nâng Cao", 
    amount: 1200000, status: "FAILED", date: "2026-04-16 10:30",
    vnpayRef: "VNP15892024", email: "hotel@gmail.com"
  },
];

const Finance = () => {
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [showRefundConfirm, setShowRefundConfirm] = useState(false);
  const [filter, setFilter] = useState("ALL");

  const stats = [
    { title: "Tổng doanh thu", value: "158.400.000đ", trend: "+12.5%", icon: <DollarSign size={20}/>, color: "text-emerald-400" },
    { title: "Doanh thu tháng này", value: "42.150.000đ", trend: "+8.2%", icon: <TrendingUp size={20}/>, color: "text-blue-400" },
    { title: "Số giao dịch", value: "1,240", trend: "+50", icon: <FileText size={20}/>, color: "text-indigo-400" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex justify-between items-center">
        <button className="bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2">
            <ExternalLink size={14} /> Xuất báo cáo (Excel)
        </button>
      </div>

      {/* 1. OVERVIEW STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#1a1c2e] p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform ${s.color}`}>
                {s.icon}
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{s.title}</p>
            <h2 className={`text-2xl font-black mt-2 text-white`}>{s.value}</h2>
            <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400">{s.trend}</span>
                <span className="text-[10px] text-slate-600 uppercase font-bold text-xs italic">so với tháng trước</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. BIỂU ĐỒ DOANH THU */}
      <div className="bg-[#1a1c2e] p-6 rounded-2xl border border-slate-800 shadow-xl">
        <h3 className="font-bold text-white mb-6 flex items-center gap-2 uppercase text-sm tracking-widest">
            <TrendingUp size={16} className="text-indigo-400"/> Biểu đồ tăng trưởng doanh thu
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `${val/1000}M`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e213a', border: 'none', borderRadius: '12px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. BẢNG GIAO DỊCH */}
      <div className="bg-[#1a1c2e] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="font-bold text-white uppercase text-sm tracking-widest">Lịch sử giao dịch</h3>
            <div className="flex gap-2">
                {["ALL", "PAID", "PENDING", "FAILED"].map(f => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all border ${
                            filter === f ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/50 text-slate-400 uppercase text-[10px] font-black">
            <tr>
              <th className="px-6 py-4">Mã GD / Ngày</th>
              <th className="px-6 py-4">Chủ sở hữu (Owner)</th>
              <th className="px-6 py-4">Gói dịch vụ</th>
              <th className="px-6 py-4">Số tiền</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {mockTransactions.map((txn) => (
              <tr key={txn.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="px-6 py-4">
                    <p className="font-mono text-xs text-white">{txn.id}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{txn.date}</p>
                </td>
                <td className="px-6 py-4">
                    <p className="font-bold text-white text-xs">{txn.owner}</p>
                    <p className="text-[10px] text-slate-500 italic">{txn.email}</p>
                </td>
                <td className="px-6 py-4 uppercase text-[10px] font-bold text-indigo-400">
                    {txn.package}
                </td>
                <td className="px-6 py-4 font-black text-white">
                    {txn.amount.toLocaleString()}đ
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-black border ${
                      txn.status === 'PAID' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                      txn.status === 'FAILED' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                  }`}>
                    {txn.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => setSelectedTxn(txn)}
                    className="p-2 hover:bg-indigo-500/10 text-indigo-400 rounded-lg transition"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. MODAL CHI TIẾT GIAO DỊCH */}
      {selectedTxn && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedTxn(null)}></div>
          <div className="bg-[#1a1c2e] border border-slate-700 w-full max-w-lg rounded-[24px] overflow-hidden relative shadow-2xl animate-in zoom-in duration-300">
            <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Chi tiết thanh toán</h2>
                <button onClick={() => setSelectedTxn(null)} className="text-slate-500 hover:text-white"><X /></button>
            </div>

            <div className="p-8 space-y-6">
                <div className="text-center pb-6 border-b border-slate-800">
                    <p className="text-slate-500 text-[10px] font-black uppercase">Tổng số tiền</p>
                    <h1 className="text-4xl font-black text-emerald-400 mt-2">{selectedTxn.amount.toLocaleString()}đ</h1>
                </div>

                <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Mã đối tác</p>
                        <p className="text-white font-medium">{selectedTxn.owner}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Gói đăng ký</p>
                        <p className="text-indigo-400 font-bold">{selectedTxn.package}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">VNPay Ref ID</p>
                        <p className="text-white font-mono">{selectedTxn.vnpayRef}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Thời gian</p>
                        <p className="text-white">{selectedTxn.date}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Trạng thái hệ thống</p>
                        <div className="mt-2 flex items-center gap-2 text-green-400">
                            <CheckCircle2 size={16} /> <span className="text-xs font-bold">Thanh toán thành công qua VNPay</span>
                        </div>
                    </div>
                </div>

                {/* Refund Section */}
                <div className="mt-4 p-4 bg-red-500/5 border border-red-500/20 rounded-2xl">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="text-red-500 shrink-0" size={18} />
                        <div>
                            <h4 className="text-xs font-bold text-white italic">Khu vực xử lý khiếu nại</h4>
                            <p className="text-[10px] text-slate-500 mt-1">Việc hoàn tiền sẽ thực hiện qua cổng VNPay và thu hồi gói dịch vụ của Owner.</p>
                            <button 
                                onClick={() => setShowRefundConfirm(true)}
                                className="mt-3 flex items-center gap-2 text-xs font-black text-red-500 hover:text-red-400 transition"
                            >
                                <RotateCcw size={14} /> HOÀN TIỀN (REFUND)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. CONFIRM REFUND MODAL */}
      {showRefundConfirm && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <div className="bg-[#1a1c2e] border border-slate-700 p-8 rounded-[32px] w-full max-w-sm text-center animate-in slide-in-from-top-4">
                <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <RotateCcw size={40} />
                </div>
                <h3 className="text-xl font-black text-white mb-2">Xác nhận hoàn tiền?</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                    Hệ thống sẽ gửi yêu cầu hoàn trả <span className="text-white font-bold">{selectedTxn?.amount.toLocaleString()}đ</span> cho Owner. Hành động này không thể rút lại.
                </p>
                <div className="flex gap-3">
                    <button onClick={() => setShowRefundConfirm(false)} className="flex-1 py-3 text-slate-400 font-bold hover:text-white transition">Hủy bỏ</button>
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-red-900/20">Xác nhận Refund</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Finance;