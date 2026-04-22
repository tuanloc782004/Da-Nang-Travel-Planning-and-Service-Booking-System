import React, { useState } from 'react'
import { Receipt, ArrowLeft, Download, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Dữ liệu giả lập mô phỏng từ collection: owner_subscriptions + subscription_packages
const mockInvoices = [
    {
        _id: 'SUB_00123',
        packageName: 'Gói Chuyên Nghiệp (1 Năm)',
        startDate: '2026-04-16',
        endDate: '2027-04-16',
        paymentDetails: { amountPaid: 5000000, vnpayTxnRef: 'VNP123456789', paymentStatus: 'PAID', paymentDate: '2026-04-16' },
        status: 'ACTIVE'
    },
    {
        _id: 'SUB_00085',
        packageName: 'Gói Cơ Bản (1 Tháng)',
        startDate: '2026-03-16',
        endDate: '2026-04-16',
        paymentDetails: { amountPaid: 500000, vnpayTxnRef: 'VNP987654321', paymentStatus: 'PAID', paymentDate: '2026-03-16' },
        status: 'EXPIRED'
    },
    {
        _id: 'SUB_00128',
        packageName: 'Gói Chuyên Nghiệp (1 Năm)',
        startDate: null,
        endDate: null,
        paymentDetails: { amountPaid: 5000000, vnpayTxnRef: 'VNP555666777', paymentStatus: 'FAILED', paymentDate: '2026-04-15' },
        status: 'CANCELLED'
    },
    {
        _id: 'SUB_00130',
        packageName: 'Gói Cơ Bản (1 Tháng)',
        startDate: null,
        endDate: null,
        paymentDetails: { amountPaid: 500000, vnpayTxnRef: 'VNP999000111', paymentStatus: 'PENDING', paymentDate: '2026-04-17' },
        status: 'ACTIVE' // Mới tạo, chờ VNPay báo về
    }
]

const Invoices = () => {
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('ALL')

    const filteredInvoices = mockInvoices.filter(invoice => {
        const matchesSearch = invoice._id.toLowerCase().includes(searchTerm.toLowerCase()) || invoice.paymentDetails.vnpayTxnRef.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = filterStatus === 'ALL' || invoice.paymentDetails.paymentStatus === filterStatus
        return matchesSearch && matchesStatus
    })

    const getPaymentBadge = (status) => {
        switch (status) {
            case 'PAID': return <span className="bg-[#E0F2F1] text-[#004D40] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Thành công</span>
            case 'PENDING': return <span className="bg-orange-50 text-[#FFAB40] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Đang xử lý</span>
            case 'FAILED': return <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Thất bại</span>
            default: return status
        }
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'ACTIVE': return <span className="text-white bg-[#004D40] px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">ĐANG DÙNG</span>
            case 'EXPIRED': return <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">HẾT HẠN</span>
            case 'CANCELLED': return <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border border-red-100">ĐÃ HỦY</span>
            default: return status
        }
    }

    // Input Style dùng chung
    const inputStyle = "w-full pl-11 pr-4 py-2.5 bg-white/60 border border-[#E0F2F1] rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md focus:ring-2 focus:ring-[#004D40]/20 outline-none text-sm font-bold text-[#004D40] placeholder-[#004D40]/40 transition-all"

    return (
        <div className="space-y-6 font-jakarta pb-10">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        onClick={() => navigate('/owner/subscription')}
                        className="p-2.5 bg-white/80 backdrop-blur-sm border border-white hover:bg-[#E0F2F1] rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md text-[#004D40] transition-colors shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </motion.button>
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                            className="text-3xl font-cormorant font-bold text-[#004D40]"
                        >
                            Lịch sử giao dịch
                        </motion.h1>
                        <p className="text-[#004D40]/60 font-medium text-sm mt-1">Quản lý hóa đơn mua gói dịch vụ từ hệ thống.</p>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 backdrop-blur-[10px] rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden"
            >

                {/* THANH CÔNG CỤ */}
                <div className="p-5 border-b border-[#004D40]/5 flex flex-col md:flex-row gap-4 justify-between bg-white/40">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#004D40]/40" size={18} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Tìm theo mã Hóa đơn hoặc VNPay..."
                            className={`${inputStyle} font-mono`}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-[#E0F2F1] p-2 rounded-lg text-[#004D40]">
                            <Filter size={18} />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className={`${inputStyle} pl-4 cursor-pointer`}
                        >
                            <option value="ALL">Tất cả thanh toán</option>
                            <option value="PAID">Thành công</option>
                            <option value="PENDING">Đang xử lý</option>
                            <option value="FAILED">Thất bại</option>
                        </select>
                    </div>
                </div>

                {/* Bảng dữ liệu */}
                <div className="overflow-x-auto min-h-[300px]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#004D40]/5 text-[#004D40] text-xs uppercase tracking-wider border-b border-[#004D40]/10">
                                <th className="px-6 py-5 font-bold">Mã Hóa đơn / VNPay</th>
                                <th className="px-6 py-5 font-bold">Gói đăng ký</th>
                                <th className="px-6 py-5 font-bold">Số tiền</th>
                                <th className="px-6 py-5 font-bold">Thời hạn sử dụng</th>
                                <th className="px-6 py-5 font-bold">Thanh toán</th>
                                <th className="px-6 py-5 font-bold text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#004D40]/5">

                            {filteredInvoices.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center">
                                            <Receipt className="text-[#004D40]/20 mb-3" size={48} strokeWidth={1.5} />
                                            <p className="text-[#004D40]/60 font-bold">Không tìm thấy hóa đơn nào phù hợp.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredInvoices.map((invoice, idx) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ backgroundColor: 'rgba(224, 242, 241, 0.4)' }}
                                        key={invoice._id}
                                        className="group transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-bold text-[#004D40] text-sm">{invoice._id}</span>
                                                <span className="text-xs text-[#004D40]/50 font-mono font-medium">Ref: {invoice.paymentDetails.vnpayTxnRef}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-start gap-2">
                                                <span className="text-sm font-bold text-[#004D40]">{invoice.packageName}</span>
                                                {getStatusBadge(invoice.status)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-black italic tracking-tight text-[#004D40]">
                                                    {invoice.paymentDetails.amountPaid.toLocaleString('vi-VN')} đ
                                                </span>
                                                <span className="text-[11px] font-medium text-[#004D40]/50">
                                                    {new Date(invoice.paymentDetails.paymentDate).toLocaleDateString('vi-VN')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-[#004D40]/80">
                                            {invoice.startDate ? (
                                                <>
                                                    {new Date(invoice.startDate).toLocaleDateString('vi-VN')} <br />
                                                    <span className="text-xs text-[#004D40]/40">đến</span> {new Date(invoice.endDate).toLocaleDateString('vi-VN')}
                                                </>
                                            ) : (
                                                <span className="text-[#004D40]/30 italic">--</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getPaymentBadge(invoice.paymentDetails.paymentStatus)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <motion.button
                                                whileHover={{ scale: invoice.paymentDetails.paymentStatus === 'PAID' ? 1.1 : 1 }}
                                                whileTap={{ scale: invoice.paymentDetails.paymentStatus === 'PAID' ? 0.9 : 1 }}
                                                className="p-2 text-[#004D40]/50 hover:text-[#004D40] hover:bg-[#E0F2F1] rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                                                title="Tải biên lai PDF"
                                                disabled={invoice.paymentDetails.paymentStatus !== 'PAID'}
                                            >
                                                <Download size={18} />
                                            </motion.button>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang */}
                <div className="p-5 border-t border-[#004D40]/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/40">
                    <p className="text-sm font-medium text-[#004D40]/70">
                        Hiển thị <span className="font-bold text-[#004D40]">{filteredInvoices.length > 0 ? 1 : 0}</span> đến <span className="font-bold text-[#004D40]">{filteredInvoices.length}</span> của <span className="font-bold text-[#004D40]">{filteredInvoices.length}</span> hóa đơn
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg border border-[#E0F2F1] text-[#004D40]/50 hover:bg-[#E0F2F1] disabled:opacity-50 transition-colors" disabled>
                            <ChevronLeft size={18} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#004D40] text-white text-sm font-bold shadow-md shadow-[#004D40]/20">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E0F2F1] text-[#004D40] hover:bg-[#E0F2F1] text-sm font-bold transition-colors">2</button>
                        <button className="p-2 rounded-lg border border-[#E0F2F1] text-[#004D40] hover:bg-[#E0F2F1] transition-colors">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Invoices