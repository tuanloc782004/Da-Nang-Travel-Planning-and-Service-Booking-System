import React, { useState, useMemo } from 'react'
import { Search, Eye, CheckCircle, XCircle, Inbox, TrendingUp, Filter } from 'lucide-react'
import { motion } from 'framer-motion'

// Dữ liệu giả lập (Năm 2026)
const mockBookings = [
    { id: 'BK1002', guest: 'Lê Văn Tuấn Lộc', phone: '0905123456', service: 'Phòng Deluxe Sea View', checkIn: '2026-04-20', checkOut: '2026-04-22', total: 2400000, payment: 'PAID', status: 'CONFIRMED' },
    { id: 'BK1003', guest: 'Trần Thị Thanh Phương', phone: '0905654321', service: 'Tour lặn ngắm san hô', checkIn: '2026-04-21', checkOut: '2026-04-21', total: 850000, payment: 'UNPAID', status: 'PENDING' },
    { id: 'BK1004', guest: 'Nguyễn Văn A', phone: '0914999888', service: 'Phòng Suite Luxury', checkIn: '2026-04-25', checkOut: '2026-04-28', total: 6300000, payment: 'PAID', status: 'CHECKED_IN' },
    { id: 'BK1005', guest: 'Phạm Minh B', phone: '0988777666', service: 'Nhà hàng Cua Biển', checkIn: '2026-04-20', checkOut: '2026-04-20', total: 500000, payment: 'UNPAID', status: 'CANCELLED' },
]

const Bookings = () => {
    const [filter, setFilter] = useState('ALL')
    const [searchTerm, setSearchTerm] = useState('')

    // Helper: Định dạng tiền tệ VND
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case 'CONFIRMED': return 'bg-[#004D40] text-white border-transparent'
            case 'PENDING': return 'bg-[#FFAB40] text-white border-transparent'
            case 'CHECKED_IN': return 'bg-teal-600 text-white border-transparent'
            case 'CANCELLED': return 'bg-red-50 text-red-600 border-red-200'
            default: return 'bg-gray-50 text-gray-700 border-gray-200'
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case 'CONFIRMED': return 'Đã xác nhận'
            case 'PENDING': return 'Chờ duyệt'
            case 'CHECKED_IN': return 'Đã nhận phòng'
            case 'CANCELLED': return 'Đã hủy'
            default: return status
        }
    }

    // Logic lọc dữ liệu
    const filteredBookings = useMemo(() => {
        return mockBookings.filter(booking => {
            const matchesFilter = filter === 'ALL' || booking.status === filter;
            const matchesSearch = booking.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.id.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [filter, searchTerm]);

    // Các thẻ thống kê (Bento style)
    const stats = [
        { key: 'PENDING', label: 'Chờ duyệt', color: 'text-[#FFAB40]', bg: 'bg-orange-50' },
        { key: 'CONFIRMED', label: 'Đã xác nhận', color: 'text-[#004D40]', bg: 'bg-[#E0F2F1]' },
        { key: 'CHECKED_IN', label: 'Đang sử dụng', color: 'text-teal-600', bg: 'bg-teal-50' },
        { key: 'CANCELLED', label: 'Đã hủy', color: 'text-red-500', bg: 'bg-red-50' },
    ]

    return (
        <div className="space-y-8 font-jakarta pb-10">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-cormorant font-bold text-[#004D40] flex items-center gap-3"
                >
                    Quản lý Đơn hàng
                </motion.h1>
                <motion.span
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-sm text-[#004D40] font-bold bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white shadow-sm"
                >
                    Tổng cộng: <span className="text-[#FFAB40] text-lg">{mockBookings.length}</span> đơn
                </motion.span>
            </div>

            {/* Thống kê nhanh (Bento Cards) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {stats.map((s, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', delay: idx * 0.1 }}
                        whileHover={{ y: -4 }}
                        key={s.key}
                        className="bg-white/80 backdrop-blur-[10px] p-5 rounded-tr-[28px] rounded-bl-[28px] rounded-tl-xl rounded-br-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 flex flex-col justify-between"
                    >
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
                        <div className="flex items-end justify-between mt-3">
                            <p className={`text-4xl font-black italic tracking-tighter ${s.color}`}>
                                {mockBookings.filter(b => b.status === s.key).length}
                            </p>
                            <div className={`w-8 h-8 rounded-tr-lg rounded-bl-lg rounded-tl-sm rounded-br-sm ${s.bg}`}></div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Toolbar: Search & Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 backdrop-blur-[10px] rounded-tr-[32px] rounded-bl-[32px] rounded-tl-xl rounded-br-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden"
            >
                <div className="p-5 border-b border-[#004D40]/10 flex flex-col lg:flex-row justify-between items-center gap-4 bg-white/40">
                    <div className="relative w-full lg:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#004D40]/40" size={20} />
                        <input
                            type="text"
                            placeholder="Tìm tên khách hoặc mã đơn..."
                            className="w-full pl-12 pr-4 py-2.5 bg-white/60 border border-[#E0F2F1] rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md focus:ring-2 focus:ring-[#004D40]/20 outline-none text-sm font-bold text-[#004D40] placeholder-[#004D40]/40 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center bg-[#E0F2F1]/50 p-1.5 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md overflow-x-auto max-w-full">
                        {['ALL', 'PENDING', 'CONFIRMED', 'CHECKED_IN', 'CANCELLED'].map((item) => (
                            <button
                                key={item}
                                onClick={() => setFilter(item)}
                                className={`px-4 py-2 rounded-tr-lg rounded-bl-lg rounded-tl-sm rounded-br-sm text-[13px] font-bold whitespace-nowrap transition-all ${filter === item
                                        ? 'bg-[#004D40] text-white shadow-md'
                                        : 'text-[#004D40]/60 hover:text-[#004D40] hover:bg-white/50'
                                    }`}
                            >
                                {item === 'ALL' ? 'Tất cả' : getStatusText(item)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto min-h-[300px]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#004D40]/5 text-[#004D40] text-[11px] uppercase tracking-widest border-b border-[#004D40]/10">
                                <th className="px-6 py-5 font-bold">Khách hàng</th>
                                <th className="px-6 py-5 font-bold">Dịch vụ & Giá</th>
                                <th className="px-6 py-5 font-bold">Thời gian</th>
                                <th className="px-6 py-5 font-bold text-center">Trạng thái</th>
                                <th className="px-6 py-5 font-bold text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#004D40]/5">
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((booking, idx) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ backgroundColor: 'rgba(224, 242, 241, 0.4)' }}
                                        key={booking.id}
                                        className="group transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#FFAB40]">#{booking.id}</span>
                                                <span className="font-bold text-[#004D40] text-base mt-0.5">{booking.guest}</span>
                                                <span className="text-xs font-medium text-gray-500 mt-1">{booking.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-[#004D40]/80 font-bold text-sm">{booking.service}</span>
                                                <span className="text-[#004D40] font-black mt-1">{formatCurrency(booking.total)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="bg-[#E0F2F1] text-[#004D40] px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">In</span>
                                                    <span className="text-sm font-semibold">{booking.checkIn}</span>
                                                </div>
                                                {booking.checkIn !== booking.checkOut && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="bg-[#E0F2F1] text-[#004D40] px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">Out</span>
                                                        <span className="text-sm font-semibold">{booking.checkOut}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-center gap-2">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusStyle(booking.status)}`}>
                                                    {getStatusText(booking.status)}
                                                </span>
                                                <span className={`text-[10px] font-black uppercase tracking-wider ${booking.payment === 'PAID' ? 'text-teal-600' : 'text-red-500'}`}>
                                                    ● {booking.payment === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 text-[#004D40]/60 hover:text-[#004D40] hover:bg-[#E0F2F1] rounded-lg transition-colors" title="Chi tiết"><Eye size={18} /></motion.button>
                                                {booking.status === 'PENDING' && (
                                                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="Xác nhận"><CheckCircle size={18} /></motion.button>
                                                )}
                                                {(booking.status === 'CONFIRMED' || booking.status === 'PENDING') && (
                                                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hủy đơn"><XCircle size={18} /></motion.button>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Inbox size={48} className="text-[#004D40]/20" strokeWidth={1.5} />
                                            <p className="text-[#004D40]/60 font-bold">Không tìm thấy đơn hàng nào khớp với yêu cầu.</p>
                                            <button
                                                onClick={() => { setFilter('ALL'); setSearchTerm(''); }}
                                                className="mt-2 px-4 py-2 bg-[#E0F2F1] text-[#004D40] rounded-lg text-sm font-bold hover:bg-[#004D40] hover:text-white transition-colors"
                                            >
                                                Đặt lại bộ lọc
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    )
}

export default Bookings;