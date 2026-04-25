import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Receipt, ChevronRight, CreditCard, Clock, MapPin, AlertCircle } from 'lucide-react'

const MyBookings = () => {
    // Dữ liệu mô phỏng theo BookingSchema & ServiceSchema
    const [bookings] = useState([
        {
            id: 'BK-7702',
            serviceName: 'InterContinental Danang Sun Peninsula',
            type: 'HOTEL',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
            dateRange: '22/04/2026 - 24/04/2026',
            total: 9000000,
            status: 'CONFIRMED',
            payment: 'PAID'
        },
        {
            id: 'BK-7785',
            serviceName: 'Tour lặn biển Bán đảo Sơn Trà',
            type: 'ACTIVITY',
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
            dateRange: '25/04/2026',
            total: 850000,
            status: 'PENDING',
            payment: 'UNPAID'
        }
    ])

    return (
        <div className="bg-[#F5F5F5] min-h-screen font-jakarta pt-28 pb-20 px-6">
            <div className="max-w-5xl mx-auto">

                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <h1 className="text-5xl font-cormorant font-bold text-[#004D40]">Chuyến đi của bạn</h1>
                    <p className="text-[#004D40]/60 font-medium mt-3 text-lg">Theo dõi lịch trình và quản lý các dịch vụ bạn đã đặt tại Đà Nẵng.</p>
                </motion.div>

                <div className="space-y-8">
                    {bookings.map((booking, idx) => (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                            key={booking.id}
                            className="bg-white/80 backdrop-blur-md rounded-tr-[40px] rounded-bl-[40px] rounded-tl-xl rounded-br-xl shadow-xl border border-white flex flex-col md:flex-row overflow-hidden group"
                        >
                            {/* Thumbnail */}
                            <div className="md:w-72 h-48 md:h-auto overflow-hidden relative">
                                <img src={booking.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Service" />
                                <div className="absolute top-4 left-4 bg-[#004D40]/90 backdrop-blur-md text-[#FFAB40] text-[9px] font-black px-3 py-1 rounded-tr-lg rounded-bl-lg uppercase tracking-widest">
                                    {booking.type}
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex-1 p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start gap-4 mb-2">
                                        <h3 className="text-2xl font-cormorant font-bold text-[#004D40] leading-tight group-hover:text-[#FFAB40] transition-colors">{booking.serviceName}</h3>
                                        <span className={`shrink-0 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${booking.status === 'CONFIRMED' ? 'bg-[#E0F2F1] text-[#004D40] border-[#004D40]/10' : 'bg-orange-50 text-[#FFAB40] border-[#FFAB40]/10'
                                            }`}>
                                            {booking.status === 'CONFIRMED' ? 'Đã xác nhận' : 'Đang xử lý'}
                                        </span>
                                    </div>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Mã đơn hàng: #{booking.id}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mt-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#F5F5F5] rounded-tr-xl rounded-bl-xl flex items-center justify-center text-[#004D40] shadow-inner"><CalendarDays size={18} /></div>
                                        <div>
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Ngày thực hiện</p>
                                            <p className="text-sm font-bold text-[#004D40]">{booking.dateRange}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#F5F5F5] rounded-tr-xl rounded-bl-xl flex items-center justify-center text-[#004D40] shadow-inner"><Receipt size={18} /></div>
                                        <div>
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Tổng chi phí</p>
                                            <p className="text-sm font-black text-[#004D40] italic">{booking.total.toLocaleString('vi-VN')} đ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Actions */}
                            <div className="bg-[#E0F2F1]/30 p-8 md:w-64 border-t md:border-t-0 md:border-l border-white flex flex-col justify-center items-center gap-4">
                                {booking.payment === 'UNPAID' ? (
                                    <>
                                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span> Chờ thanh toán
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                            className="w-full bg-[#FFAB40] text-white py-3.5 rounded-tr-2xl rounded-bl-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#FFAB40]/30"
                                        >
                                            Thanh toán ngay
                                        </motion.button>
                                        <button className="text-[10px] font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest">Hủy yêu cầu</button>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-[10px] font-black text-[#004D40] uppercase tracking-widest mb-1 flex items-center gap-2">
                                            <CreditCard size={14} className="text-[#FFAB40]" /> Giao dịch hoàn tất
                                        </p>
                                        <button className="w-full bg-white border border-[#004D40]/10 text-[#004D40] hover:bg-[#004D40] hover:text-white py-3.5 rounded-tr-2xl rounded-bl-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                                            Chi tiết đơn <ChevronRight size={14} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyBookings