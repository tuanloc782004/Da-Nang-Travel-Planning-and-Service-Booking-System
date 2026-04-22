import React, { useState } from 'react'
import { Plus, Edit, Trash2, Search, CalendarDays, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Dữ liệu giả lập
const mockServices = [
    { id: '1', name: 'Khách sạn Mường Thanh Luxury', type: 'HOTEL', price: 1200000, status: 'APPROVED', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=150&h=150&fit=crop' },
    { id: '2', name: 'Nhà hàng Hải sản Cua Biển', type: 'RESTAURANT', price: 500000, status: 'APPROVED', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150&h=150&fit=crop' },
    { id: '3', name: 'Tour lặn ngắm san hô Sơn Trà', type: 'ACTIVITY', price: 850000, status: 'PENDING', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=150&h=150&fit=crop' },
    { id: '4', name: 'Homestay Cây Thông', type: 'HOTEL', price: 450000, status: 'REJECTED', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=150&h=150&fit=crop' },
    { id: '5', name: 'Villa Biển Mỹ Khê', type: 'HOTEL', price: 3500000, status: 'HIDDEN', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=150&h=150&fit=crop' },
]

const ListService = () => {
    const navigate = useNavigate()

    // States cho Bộ lọc
    const [filterType, setFilterType] = useState('ALL')
    const [filterStatus, setFilterStatus] = useState('ALL')

    // Helpers mang màu sắc của D-PULSE
    const getTypeLabel = (type) => {
        switch (type) {
            case 'HOTEL': return <span className="text-[#004D40] font-bold">Khách sạn</span>
            case 'RESTAURANT': return <span className="text-[#FFAB40] font-bold">Nhà hàng</span>
            case 'ACTIVITY': return <span className="text-teal-600 font-bold">Hoạt động</span>
            default: return type
        }
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'APPROVED': return <span className="bg-[#004D40] text-white px-3 py-1 rounded-full text-[11px] font-bold tracking-wide">ĐẠT DUYỆT</span>
            case 'PENDING': return <span className="bg-[#FFAB40] text-white px-3 py-1 rounded-full text-[11px] font-bold tracking-wide">CHỜ DUYỆT</span>
            case 'REJECTED': return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border border-red-200">TỪ CHỐI</span>
            case 'HIDDEN': return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border border-gray-200">ĐÃ ẨN</span>
            default: return status
        }
    }

    // Xử lý lọc dữ liệu
    const filteredServices = mockServices.filter(item => {
        const matchType = filterType === 'ALL' || item.type === filterType;
        const matchStatus = filterStatus === 'ALL' || item.status === filterStatus;
        return matchType && matchStatus;
    })

    return (
        <div className="space-y-6 font-jakarta pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-cormorant font-bold text-[#004D40]"
                >
                    Quản lý dịch vụ
                </motion.h1>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/owner/add-service')}
                    className="flex items-center gap-2 bg-[#004D40] hover:bg-[#00332A] text-white px-5 py-2.5 rounded-tr-[20px] rounded-bl-[20px] rounded-tl-md rounded-br-md font-bold transition-colors shadow-lg shadow-[#004D40]/20"
                >
                    <Plus size={20} /> Thêm dịch vụ mới
                </motion.button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 backdrop-blur-[10px] rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden"
            >
                {/* Bộ lọc & Tìm kiếm */}
                <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between bg-white/40">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#004D40]/50" size={20} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm dịch vụ..."
                            className="w-full pl-12 pr-4 py-2.5 bg-white/60 border border-[#E0F2F1] rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md focus:ring-2 focus:ring-[#004D40]/20 outline-none text-sm font-medium text-[#004D40] placeholder-[#004D40]/40 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-[#E0F2F1] p-2 rounded-lg text-[#004D40]">
                            <Filter size={18} />
                        </div>
                        <select
                            className="bg-white/60 border border-[#E0F2F1] rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#004D40]/20 font-bold text-[#004D40] cursor-pointer transition-all"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="ALL">Tất cả phân loại</option>
                            <option value="HOTEL">Khách sạn/Lưu trú</option>
                            <option value="RESTAURANT">Nhà hàng/Ẩm thực</option>
                            <option value="ACTIVITY">Hoạt động/Tour</option>
                        </select>
                        <select
                            className="bg-white/60 border border-[#E0F2F1] rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#004D40]/20 font-bold text-[#004D40] cursor-pointer transition-all"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="ALL">Tất cả trạng thái</option>
                            <option value="APPROVED">Đang hoạt động</option>
                            <option value="PENDING">Chờ duyệt</option>
                            <option value="HIDDEN">Đã ẩn</option>
                        </select>
                    </div>
                </div>

                {/* Bảng dữ liệu */}
                <div className="overflow-x-auto min-h-[300px]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#004D40]/5 text-[#004D40] text-xs uppercase tracking-wider border-b border-[#004D40]/10">
                                <th className="px-6 py-5 font-bold">Dịch vụ</th>
                                <th className="px-6 py-5 font-bold">Phân loại</th>
                                <th className="px-6 py-5 font-bold">Giá cơ bản</th>
                                <th className="px-6 py-5 font-bold">Trạng thái</th>
                                <th className="px-6 py-5 font-bold text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100/50">
                            {filteredServices.length > 0 ? (
                                filteredServices.map((service, index) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ backgroundColor: 'rgba(224, 242, 241, 0.4)' }}
                                        key={service.id}
                                        className="group transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img src={service.image} alt={service.name} className="w-14 h-14 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md object-cover border border-white shadow-sm" />
                                                <p className="font-bold text-[#004D40] group-hover:text-[#FFAB40] transition-colors">{service.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm">{getTypeLabel(service.type)}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-[#004D40]">
                                            {service.price.toLocaleString('vi-VN')} đ
                                        </td>
                                        <td className="px-6 py-4">{getStatusBadge(service.status)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2 text-gray-400">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                    onClick={() => navigate(`/owner/inventory?serviceId=${service.id}`)}
                                                    className="p-2 text-[#004D40] hover:bg-[#E0F2F1] rounded-lg transition-colors"
                                                    title="Lịch tồn kho"
                                                >
                                                    <CalendarDays size={18} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                    className="p-2 text-[#FFAB40] hover:bg-orange-50 rounded-lg transition-colors" title="Sửa thông tin"
                                                >
                                                    <Edit size={18} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Xóa dịch vụ"
                                                >
                                                    <Trash2 size={18} />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <Search className="text-gray-300 mb-3" size={40} />
                                            <p className="text-[#004D40]/60 font-medium">Không tìm thấy dịch vụ nào phù hợp với bộ lọc.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang */}
                <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/40">
                    <p className="text-sm font-medium text-[#004D40]/70">
                        Hiển thị <span className="font-bold text-[#004D40]">{filteredServices.length > 0 ? 1 : 0}</span> đến <span className="font-bold text-[#004D40]">{filteredServices.length}</span> của <span className="font-bold text-[#004D40]">{filteredServices.length}</span> dịch vụ
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

export default ListService