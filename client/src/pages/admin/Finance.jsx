import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  FileText,
  Eye,
  RotateCcw,
  CheckCircle2,
  X,
  AlertCircle,
  Download,
  Filter,
  Calendar,
  CreditCard,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { chartData, mockTransactions } from "./mockdatas/mockDataFinance";

const Finance = () => {
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [showRefundConfirm, setShowRefundConfirm] = useState(false);
  const [filter, setFilter] = useState("ALL");

  const stats = [
    {
      title: "Tổng doanh thu",
      value: "158.400.000đ",
      trend: "+12.5%",
      icon: <DollarSign size={20} />,
      color: "text-[#00C853]",
    },
    {
      title: "Doanh thu tháng này",
      value: "42.150.000đ",
      trend: "+8.2%",
      icon: <TrendingUp size={20} />,
      color: "text-[#FFAB40]",
    },
    {
      title: "Số giao dịch",
      value: "1,240",
      trend: "+50",
      icon: <FileText size={20} />,
      color: "text-[#004D40]",
    },
  ];

  const filteredTransactions =
    filter === "ALL"
      ? mockTransactions
      : mockTransactions.filter((txn) => txn.status === filter);

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
            Quản lý tài chính
          </h1>
          <p className="text-[#004D40]/60 mt-1 font-medium text-sm">
            Theo dõi doanh thu và giao dịch của hệ thống
          </p>
        </div>
        <button className="bg-[#004D40] hover:bg-[#00332A] text-white px-6 py-2.5 rounded-tr-[20px] rounded-bl-[20px] rounded-tl-md rounded-br-md font-bold text-sm flex items-center gap-2 transition shadow-lg shadow-[#004D40]/20">
          <Download size={16} /> Xuất báo cáo Excel
        </button>
      </motion.div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="bg-white/80 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group"
          >
            <div
              className={`absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform ${s.color}`}
            >
              {s.icon}
            </div>
            <p className="text-[#004D40]/60 text-xs font-bold uppercase tracking-widest">
              {s.title}
            </p>
            <h2 className="text-3xl font-black mt-2 text-[#004D40]">
              {s.value}
            </h2>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm font-bold text-[#00C853]">
                {s.trend}
              </span>
              <span className="text-xs text-[#004D40]/60 font-medium italic">
                so với tháng trước
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* BIỂU ĐỒ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <h3 className="font-bold text-[#004D40] mb-6 flex items-center gap-2 uppercase text-sm tracking-widest">
          <TrendingUp size={18} className="text-[#FFAB40]" />
          Biểu đồ tăng trưởng doanh thu
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#004D40" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#004D40" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0F2F1" />
              <XAxis dataKey="date" stroke="#004D40" fontSize={12} />
              <YAxis
                stroke="#004D40"
                fontSize={12}
                tickFormatter={(val) => `${val / 1000}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E0F2F1",
                  borderRadius: "12px",
                  color: "#004D40",
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#004D40"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorAmt)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* BẢNG GIAO DỊCH */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/80 backdrop-blur-[10px] rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-bold text-[#004D40] uppercase text-sm tracking-widest">
            Lịch sử giao dịch
          </h3>
          <div className="flex gap-2">
            {["ALL", "PAID", "PENDING", "FAILED"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-tr-lg rounded-bl-lg rounded-tl-sm rounded-br-sm text-xs font-bold transition-all border ${
                  filter === f
                    ? "bg-[#004D40] border-[#004D40] text-white"
                    : "bg-white/60 border-[#E0F2F1] text-[#004D40]/60 hover:text-[#004D40]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#004D40]/5 text-[#004D40] text-xs uppercase">
                <th className="px-6 py-4 text-left font-bold">Mã GD / Ngày</th>
                <th className="px-6 py-4 text-left font-bold">
                  Chủ sở hữu (Owner)
                </th>
                <th className="px-6 py-4 text-left font-bold">Gói dịch vụ</th>
                <th className="px-6 py-4 text-left font-bold">Số tiền</th>
                <th className="px-6 py-4 text-left font-bold">Trạng thái</th>
                <th className="px-6 py-4 text-right font-bold">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.map((txn, idx) => (
                <motion.tr
                  key={txn.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-[#E0F2F1]/40 transition"
                >
                  <td className="px-6 py-4">
                    <p className="font-mono text-xs text-[#004D40] font-bold">
                      {txn.id}
                    </p>
                    <p className="text-xs text-[#004D40]/60 mt-1">
                      {txn.date}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#004D40] text-sm">
                      {txn.owner}
                    </p>
                    <p className="text-xs text-[#004D40]/60 italic">
                      {txn.email}
                    </p>
                  </td>
                  <td className="px-6 py-4 uppercase text-xs font-bold text-[#FFAB40]">
                    {txn.package}
                  </td>
                  <td className="px-6 py-4 font-black text-[#004D40]">
                    {txn.amount.toLocaleString()}đ
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        txn.status === "PAID"
                          ? "bg-[#00C853]/10 text-[#00C853] border-[#00C853]/20"
                          : txn.status === "FAILED"
                            ? "bg-[#FF5252]/10 text-[#FF5252] border-[#FF5252]/20"
                            : "bg-[#FFAB40]/10 text-[#FFAB40] border-[#FFAB40]/20"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedTxn(txn)}
                      className="p-2 hover:bg-[#004D40]/10 text-[#004D40] rounded-lg transition"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* MODAL CHI TIẾT */}
      {selectedTxn && !showRefundConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-[10px] w-full max-w-lg rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-[#E0F2F1] flex justify-between items-center">
              <h2 className="text-xl font-cormorant font-bold text-[#004D40] uppercase tracking-tight">
                Chi tiết thanh toán
              </h2>
              <button
                onClick={() => setSelectedTxn(null)}
                className="text-[#004D40]/60 hover:text-[#004D40]"
              >
                <X />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="text-center pb-6 border-b border-[#E0F2F1]">
                <p className="text-xs font-bold text-[#004D40]/60 uppercase">
                  Tổng số tiền
                </p>
                <h1 className="text-4xl font-black text-[#00C853] mt-2">
                  {selectedTxn.amount.toLocaleString()}đ
                </h1>
              </div>

              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div>
                  <p className="text-xs text-[#004D40]/60 uppercase font-bold">
                    Mã đối tác
                  </p>
                  <p className="text-[#004D40] font-bold">
                    {selectedTxn.owner}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#004D40]/60 uppercase font-bold">
                    Gói đăng ký
                  </p>
                  <p className="text-[#FFAB40] font-bold">
                    {selectedTxn.package}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#004D40]/60 uppercase font-bold">
                    VNPay Ref ID
                  </p>
                  <p className="text-[#004D40] font-mono text-xs">
                    {selectedTxn.vnpayRef}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#004D40]/60 uppercase font-bold">
                    Thời gian
                  </p>
                  <p className="text-[#004D40]">{selectedTxn.date}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-[#004D40]/60 uppercase font-bold">
                    Trạng thái hệ thống
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[#00C853]">
                    <CheckCircle2 size={16} />
                    <span className="text-xs font-bold">
                      Thanh toán thành công qua VNPay
                    </span>
                  </div>
                </div>
              </div>

              {/* Refund Section */}
              <div className="mt-4 p-4 bg-[#FF5252]/5 border-2 border-[#FF5252]/20 rounded-tr-[24px] rounded-bl-[24px] rounded-tl-xl rounded-br-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-[#FF5252] shrink-0" size={18} />
                  <div>
                    <h4 className="text-xs font-bold text-[#004D40]">
                      Khu vực xử lý khiếu nại
                    </h4>
                    <p className="text-xs text-[#004D40]/60 mt-1">
                      Việc hoàn tiền sẽ thực hiện qua cổng VNPay và thu hồi gói
                      dịch vụ của Owner.
                    </p>
                    <button
                      onClick={() => setShowRefundConfirm(true)}
                      className="mt-3 flex items-center gap-2 text-xs font-bold text-[#FF5252] hover:text-[#E04848] transition"
                    >
                      <RotateCcw size={14} /> HOÀN TIỀN (REFUND)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* CONFIRM REFUND */}
      {showRefundConfirm && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-[10px] p-8 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl w-full max-w-sm text-center shadow-2xl"
          >
            <div className="w-16 h-16 bg-[#FF5252]/20 text-[#FF5252] rounded-full flex items-center justify-center mx-auto mb-6">
              <RotateCcw size={32} />
            </div>
            <h3 className="text-2xl font-cormorant font-bold text-[#004D40] mb-2">
              Xác nhận hoàn tiền?
            </h3>
            <p className="text-[#004D40]/60 text-sm mb-8 leading-relaxed">
              Hệ thống sẽ gửi yêu cầu hoàn trả{" "}
              <span className="text-[#004D40] font-bold">
                {selectedTxn?.amount.toLocaleString()}đ
              </span>{" "}
              cho Owner. Hành động này không thể rút lại.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRefundConfirm(false)}
                className="flex-1 py-2.5 text-[#004D40]/60 font-bold hover:text-[#004D40] transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => {
                  console.log("Refund:", selectedTxn.id);
                  setShowRefundConfirm(false);
                  setSelectedTxn(null);
                }}
                className="flex-1 bg-[#FF5252] hover:bg-[#E04848] text-white font-bold py-2.5 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md transition shadow-lg shadow-[#FF5252]/20"
              >
                Xác nhận Refund
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Finance;