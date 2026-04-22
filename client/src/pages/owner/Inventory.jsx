import React, { useState, useEffect } from 'react'
import { CalendarDays, Save, Info, ChevronLeft, ChevronRight } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { motion } from 'framer-motion'
import "react-datepicker/dist/react-datepicker.css"

// Dữ liệu giả lập dịch vụ của Owner
const mockServices = [
    { id: '1', name: 'Khách sạn Mường Thanh Luxury' },
    { id: '2', name: 'Nhà hàng Hải sản Cua Biển' },
    { id: '3', name: 'Tour lặn ngắm san hô Sơn Trà' },
]

// Dữ liệu giả lập tồn kho theo ngày (YYYY-MM-DD)
const mockInventoryData = {
    '2026-04-20': { total: 10, available: 5 },
    '2026-04-21': { total: 10, available: 0 }, // Hết chỗ
    '2026-04-22': { total: 10, available: 8 },
    '2026-04-30': { total: 15, available: 2 }, // Lễ
    '2026-05-01': { total: 15, available: 0 }, // Lễ
}

const Inventory = () => {
    const [searchParams] = useSearchParams()
    const [selectedService, setSelectedService] = useState(searchParams.get('serviceId') || '')

    // State quản lý tháng đang xem trên lịch (Mặc định lấy tháng hiện tại)
    const [viewDate, setViewDate] = useState(new Date())

    // State cho Form cập nhật hàng loạt bên trái
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [slots, setSlots] = useState(1)

    // Cập nhật selectedService nếu URL thay đổi (Owner click từ trang Danh sách)
    useEffect(() => {
        const id = searchParams.get('serviceId')
        if (id) setSelectedService(id)
    }, [searchParams])

    // --- LOGIC TẠO LỊCH (CALENDAR) ---
    const currentYear = viewDate.getFullYear()
    const currentMonth = viewDate.getMonth()

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    // Lấy thứ của ngày đầu tiên trong tháng (0: Chủ nhật, 1: Thứ 2...)
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    // Chuyển đổi để Thứ 2 là cột đầu tiên (0), Chủ nhật là cột cuối (6)
    const startingEmptyCells = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

    const handlePrevMonth = () => {
        setViewDate(new Date(currentYear, currentMonth - 1, 1))
    }

    const handleNextMonth = () => {
        setViewDate(new Date(currentYear, currentMonth + 1, 1))
    }

    const handleUpdateInventory = (e) => {
        e.preventDefault()
        alert(`Đã cập nhật ${slots} chỗ từ ${startDate.toLocaleDateString()} đến ${endDate.toLocaleDateString()}`)
    }

    // Input Style dùng chung
    const inputStyle = "w-full px-4 py-2 bg-white/60 border border-[#E0F2F1] rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md focus:ring-2 focus:ring-[#004D40]/20 outline-none text-sm font-bold text-[#004D40] transition-all"

    return (
        <div className="max-w-6xl mx-auto space-y-6 font-jakarta pb-10">

            {/* Header & Chọn dịch vụ */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl font-cormorant font-bold text-[#004D40]"
                    >
                        Lịch Tồn kho
                    </motion.h1>
                    <p className="text-[#004D40]/60 font-medium text-sm mt-1">Chọn dịch vụ để xem và cập nhật số lượng chỗ trống.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full md:w-80 relative"
                >
                    <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className={`${inputStyle} appearance-none pr-10 shadow-sm cursor-pointer`}
                    >
                        <option value="">-- Vui lòng chọn dịch vụ --</option>
                        {mockServices.map(srv => (
                            <option key={srv.id} value={srv.id}>{srv.name}</option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#004D40]/50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </motion.div>
            </div>

            {!selectedService ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/60 backdrop-blur-md border border-white/80 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl p-16 text-center flex flex-col items-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                    <div className="bg-[#E0F2F1] p-5 rounded-tr-3xl rounded-bl-3xl rounded-tl-xl rounded-br-xl mb-5 shadow-inner">
                        <CalendarDays size={56} className="text-[#004D40]" />
                    </div>
                    <h3 className="text-2xl font-cormorant font-bold text-[#004D40]">Chưa chọn dịch vụ</h3>
                    <p className="text-[#004D40]/60 font-medium mt-2 max-w-md">Vui lòng chọn một dịch vụ ở ô tìm kiếm phía trên hoặc truy cập từ trang Danh sách Dịch vụ để bắt đầu cấu hình tồn kho.</p>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* CỘT TRÁI: FORM CẬP NHẬT HÀNG LOẠT (Chiếm 4/12) */}
                    <div className="lg:col-span-4 space-y-6">
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onSubmit={handleUpdateInventory}
                            className="bg-white/80 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 space-y-5"
                        >
                            <h3 className="font-cormorant font-bold text-xl text-[#004D40] flex items-center gap-2 border-b border-[#004D40]/10 pb-3">
                                <CalendarDays size={20} className="text-[#FFAB40]" /> Cập nhật nhanh
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-[#004D40] mb-1.5">Từ ngày</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        className={inputStyle}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#004D40] mb-1.5">Đến ngày</label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#004D40] mb-1.5">Tổng số chỗ (Phòng/Vé)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={slots}
                                    onChange={(e) => setSlots(e.target.value)}
                                    className={inputStyle}
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                type="submit"
                                className="w-full bg-[#004D40] text-white py-3 rounded-tr-[20px] rounded-bl-[20px] rounded-tl-md rounded-br-md font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#004D40]/20 hover:bg-[#00332A]"
                            >
                                <Save size={18} /> Lưu thay đổi
                            </motion.button>
                        </motion.form>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-[#E0F2F1]/50 p-5 rounded-tr-[32px] rounded-bl-[32px] rounded-tl-xl rounded-br-xl border border-[#004D40]/10 flex gap-3 shadow-sm"
                        >
                            <Info className="text-[#FFAB40] shrink-0" size={20} />
                            <p className="text-xs text-[#004D40]/80 font-medium leading-relaxed">
                                Hệ thống sẽ lấy <strong>Tổng số chỗ</strong> bạn nhập ở đây trừ đi số lượng khách đã đặt để tự động tính ra <strong>Số chỗ còn trống</strong> trong lịch.
                            </p>
                        </motion.div>
                    </div>

                    {/* CỘT PHẢI: GIAO DIỆN LỊCH (Chiếm 8/12) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-8 bg-white/80 backdrop-blur-[10px] rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden flex flex-col"
                    >
                        {/* Thanh điều hướng tháng */}
                        <div className="p-5 border-b border-[#004D40]/10 flex items-center justify-between bg-white/40">
                            <motion.button
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                onClick={handlePrevMonth}
                                className="p-2 border border-[#E0F2F1] rounded-lg bg-white text-[#004D40] hover:bg-[#E0F2F1] transition-colors shadow-sm"
                            >
                                <ChevronLeft size={20} />
                            </motion.button>
                            <h2 className="text-2xl font-cormorant font-bold text-[#004D40] tracking-wide">
                                Tháng {currentMonth + 1}, {currentYear}
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                onClick={handleNextMonth}
                                className="p-2 border border-[#E0F2F1] rounded-lg bg-white text-[#004D40] hover:bg-[#E0F2F1] transition-colors shadow-sm"
                            >
                                <ChevronRight size={20} />
                            </motion.button>
                        </div>

                        {/* Lưới Lịch */}
                        <div className="p-5 flex-1 bg-white/20">
                            {/* Tiêu đề Thứ */}
                            <div className="grid grid-cols-7 gap-2 mb-3">
                                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(day => (
                                    <div key={day} className="text-center font-bold text-sm text-[#004D40]/50 py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Các ô ngày */}
                            <div className="grid grid-cols-7 gap-3">
                                {/* Pad các ô trống đầu tháng */}
                                {Array.from({ length: startingEmptyCells }).map((_, i) => (
                                    <div key={`empty-${i}`} className="aspect-square rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm bg-[#E0F2F1]/30 border border-white/50"></div>
                                ))}

                                {/* Render các ngày trong tháng */}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1
                                    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                                    const dayData = mockInventoryData[dateString]

                                    return (
                                        <motion.div
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            key={day}
                                            className={`relative flex flex-col p-2.5 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border-2 transition-all cursor-pointer min-h-[95px] shadow-sm ${dayData?.available === 0
                                                    ? 'border-red-200 bg-red-50'
                                                    : dayData
                                                        ? 'border-[#004D40]/20 bg-[#E0F2F1]'
                                                        : 'border-white bg-white/60 hover:border-[#FFAB40]/50'
                                                }`}
                                        >
                                            <span className={`text-sm font-bold ${dayData?.available === 0 ? 'text-red-700' : 'text-[#004D40]'}`}>{day}</span>

                                            {dayData && (
                                                <div className="mt-auto flex flex-col gap-1">
                                                    <p className={`text-[10px] font-bold ${dayData.available === 0 ? 'text-red-400' : 'text-[#004D40]/50'}`}>Tổng: {dayData.total}</p>
                                                    {dayData.available === 0 ? (
                                                        <span className="text-xs font-bold text-red-600 bg-red-100/50 py-0.5 px-1 -mx-1 rounded text-center">
                                                            Hết chỗ
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs font-bold text-[#004D40] bg-white/50 py-0.5 px-1 -mx-1 rounded text-center shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                                            Trống: <span className="text-[#FFAB40] text-sm">{dayData.available}</span>
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </div>
    )
}

export default Inventory