import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Star, Filter, Utensils, Bed, Ticket, ChevronRight, SlidersHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AllServices = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState('ALL')

    // Mock Data theo ServiceSchema
    const services = [
        { id: '1', name: "InterContinental Sun Peninsula", type: "HOTEL", price: 4500000, rating: 4.9, area: "Sơn Trà", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" },
        { id: '2', name: "Mì Quảng Bà Mua", type: "RESTAURANT", price: 45000, rating: 4.6, area: "Hải Châu", img: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80" },
        { id: '3', name: "Tour lặn biển Sơn Trà", type: "ACTIVITY", price: 850000, rating: 4.8, area: "Sơn Trà", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80" },
    ]

    const categories = [
        { id: 'ALL', label: 'Tất cả', icon: <Filter size={14} /> },
        { id: 'HOTEL', label: 'Lưu trú', icon: <Bed size={14} /> },
        { id: 'RESTAURANT', label: 'Ẩm thực', icon: <Utensils size={14} /> },
        { id: 'ACTIVITY', label: 'Trải nghiệm', icon: <Ticket size={14} /> },
    ]

    return (
        <div className="bg-[#F5F5F5] min-h-screen font-jakarta pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* TOP BAR: SEARCH & CATEGORIES */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
                    <div>
                        <h1 className="text-5xl font-cormorant font-bold text-[#004D40] mb-4">Khám phá Đà Nẵng</h1>
                        <div className="flex bg-white/50 backdrop-blur-md p-1.5 rounded-tr-2xl rounded-bl-2xl border border-white shadow-sm">
                            {categories.map(cat => (
                                <button
                                    key={cat.id} onClick={() => setCategory(cat.id)}
                                    className={`px-5 py-2.5 rounded-tr-xl rounded-bl-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${category === cat.id ? 'bg-[#004D40] text-white shadow-lg' : 'text-[#004D40]/50 hover:text-[#004D40]'}`}
                                >
                                    {cat.icon} {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-96 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#004D40]/30" size={20} />
                        <input type="text" placeholder="Tìm tên dịch vụ, món ăn..." className="w-full pl-12 pr-4 py-4 bg-white rounded-tr-3xl rounded-bl-3xl border-none shadow-xl outline-none focus:ring-2 focus:ring-[#FFAB40]/50 font-bold text-[#004D40]" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* SIDEBAR FILTER */}
                    <aside className="lg:col-span-3 space-y-8">
                        <div className="bg-white/80 backdrop-blur-md p-8 rounded-tr-[40px] rounded-bl-[40px] shadow-xl border border-white">
                            <h3 className="font-cormorant text-2xl font-bold text-[#004D40] mb-6 flex items-center gap-2">
                                <SlidersHorizontal size={20} className="text-[#FFAB40]" /> Tinh chỉnh
                            </h3>

                            <div className="space-y-8">
                                <div>
                                    <p className="text-[10px] font-black text-[#004D40]/40 uppercase tracking-[0.2em] mb-4">Khu vực</p>
                                    {['Hải Châu', 'Sơn Trà', 'Ngũ Hành Sơn', 'Liên Chiểu'].map(area => (
                                        <label key={area} className="flex items-center gap-3 mb-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-[#E0F2F1] text-[#004D40] focus:ring-[#004D40] accent-[#004D40]" />
                                            <span className="text-sm font-bold text-[#004D40]/70 group-hover:text-[#004D40] transition-colors">{area}</span>
                                        </label>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-[#E0F2F1]">
                                    <p className="text-[10px] font-black text-[#004D40]/40 uppercase tracking-[0.2em] mb-4">Mức giá</p>
                                    <input type="range" className="w-full accent-[#FFAB40]" />
                                    <div className="flex justify-between text-[10px] font-bold text-[#004D40]/50 mt-2 uppercase">
                                        <span>0đ</span>
                                        <span>10Tr+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* SERVICE GRID */}
                    <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((srv, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                                key={srv.id} onClick={() => navigate(`/services/${srv.id}`)}
                                className="bg-white rounded-tr-[40px] rounded-bl-[40px] rounded-tl-xl rounded-br-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer border border-white"
                            >
                                <div className="h-64 relative overflow-hidden">
                                    <img src={srv.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={srv.name} />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                        <Star size={12} className="fill-[#FFAB40] text-[#FFAB40]" />
                                        <span className="text-xs font-black text-[#004D40]">{srv.rating}</span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-[#004D40]/80 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-tr-xl rounded-bl-xl uppercase tracking-widest">
                                        {srv.type}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-1.5 text-[#004D40]/40 mb-2">
                                        <MapPin size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{srv.area}, Đà Nẵng</span>
                                    </div>
                                    <h3 className="text-2xl font-cormorant font-bold text-[#004D40] mb-6 group-hover:text-[#FFAB40] transition-colors line-clamp-1">{srv.name}</h3>
                                    <div className="flex items-end justify-between pt-6 border-t border-[#E0F2F1]">
                                        <div>
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Bắt đầu từ</p>
                                            <p className="text-xl font-black text-[#004D40] italic">
                                                {srv.price === 0 ? 'Miễn phí' : `${srv.price.toLocaleString('vi-VN')} đ`}
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-[#E0F2F1] rounded-tr-2xl rounded-bl-2xl flex items-center justify-center text-[#004D40] group-hover:bg-[#FFAB40] group-hover:text-white transition-all">
                                            <ChevronRight size={24} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllServices