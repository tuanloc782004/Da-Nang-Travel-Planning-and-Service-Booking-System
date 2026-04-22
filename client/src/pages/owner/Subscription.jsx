import React from 'react'
import { CheckCircle2, ShieldCheck, Zap, CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Subscription = () => {
    const navigate = useNavigate();

    // Dữ liệu giả lập các gói cước từ Admin
    const plans = [
        {
            id: 'basic',
            name: 'Gói Cơ Bản',
            price: '500.000',
            duration: '1 Tháng',
            features: ['Hiển thị tối đa 5 dịch vụ', 'Hỗ trợ kỹ thuật tiêu chuẩn', 'Thống kê cơ bản'],
            isPopular: false
        },
        {
            id: 'pro',
            name: 'Gói Chuyên Nghiệp',
            price: '5.000.000',
            duration: '1 Năm',
            features: ['Hiển thị không giới hạn dịch vụ', 'Hỗ trợ kỹ thuật 24/7', 'Thống kê nâng cao', 'Gắn nhãn "Nổi bật" trên trang chủ'],
            isPopular: true
        }
    ]

    return (
        <div className="max-w-5xl mx-auto space-y-10 font-jakarta pb-10">

            {/* Thông tin gói hiện tại */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-[#004D40] to-[#002B24] rounded-tr-[40px] rounded-bl-[40px] rounded-tl-xl rounded-br-xl p-8 md:p-10 text-white shadow-xl shadow-[#004D40]/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-white/10"
            >
                <div>
                    <h2 className="text-sm font-bold text-[#E0F2F1] uppercase tracking-widest mb-2 opacity-80">Gói hiện tại của bạn</h2>
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl md:text-4xl font-cormorant font-bold text-white tracking-tight">Gói Chuyên Nghiệp</h1>
                        <span className="bg-[#FFAB40] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                            <ShieldCheck size={14} /> KÍCH HOẠT
                        </span>
                    </div>
                    <p className="mt-4 text-[#E0F2F1] text-sm font-medium">Ngày hết hạn: <strong className="text-white">16/04/2027</strong> (Còn 365 ngày)</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/owner/invoices')}
                    className="bg-white text-[#004D40] hover:bg-[#E0F2F1] px-7 py-3.5 rounded-tr-[20px] rounded-bl-[20px] rounded-tl-md rounded-br-md font-bold transition-colors shadow-md w-full md:w-auto flex items-center justify-center"
                >
                    Quản lý hóa đơn
                </motion.button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center pt-6 pb-2"
            >
                <h2 className="text-3xl font-cormorant font-bold text-[#004D40]">Gia hạn hoặc Nâng cấp gói</h2>
                <p className="text-[#004D40]/60 mt-3 font-medium">Chọn gói dịch vụ phù hợp để tiếp tục tiếp cận hàng ngàn khách du lịch tại Đà Nẵng.</p>
            </motion.div>

            {/* Các Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {plans.map((plan, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', delay: 0.3 + (index * 0.1) }}
                        whileHover={{ y: -8 }}
                        key={plan.id}
                        className={`relative bg-white/80 backdrop-blur-[10px] rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl p-10 border-2 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col ${plan.isPopular ? 'border-[#FFAB40] shadow-[#FFAB40]/10' : 'border-white/60'}`}
                    >
                        {plan.isPopular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FFAB40] to-[#f29824] text-white text-[11px] font-bold px-5 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-md">
                                <Zap size={14} fill="currentColor" /> Phổ biến nhất
                            </div>
                        )}

                        <h3 className="text-2xl font-cormorant font-bold text-[#004D40]">{plan.name}</h3>
                        <div className="mt-4 flex items-baseline text-[#004D40]">
                            <span className="text-5xl font-black italic tracking-tighter">{plan.price}đ</span>
                            <span className="ml-2 text-lg font-bold text-[#004D40]/50">/{plan.duration}</span>
                        </div>

                        <ul className="mt-8 space-y-5 flex-1">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 className="text-[#FFAB40] shrink-0 mt-0.5" size={20} />
                                    <span className="text-[#004D40]/80 font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`mt-10 w-full py-3.5 rounded-tr-[24px] rounded-bl-[24px] rounded-tl-md rounded-br-md font-bold flex items-center justify-center gap-2 transition-colors shadow-sm ${plan.isPopular ? 'bg-[#004D40] hover:bg-[#00332A] text-white shadow-[#004D40]/20' : 'bg-[#E0F2F1] hover:bg-[#c9ebe7] text-[#004D40]'}`}
                        >
                            <CreditCard size={18} />
                            Thanh toán VNPay
                        </motion.button>
                    </motion.div>
                ))}
            </div>

        </div>
    )
}

export default Subscription