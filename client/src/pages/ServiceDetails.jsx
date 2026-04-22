import React from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import {
    MapPin, Star, Share2, Heart, Wifi, Coffee, Clock,
    Calendar, Users, Info, CheckCircle2, Camera, ShieldCheck
} from 'lucide-react'

const ServiceDetails = () => {
    const { id } = useParams()

    // Giả lập dữ liệu thích ứng (Adaptive Data)
    const srv = {
        name: "InterContinental Danang Sun Peninsula Resort",
        type: "HOTEL",
        rating: 4.9,
        reviews: 1240,
        address: "Bán đảo Sơn Trà, Thọ Quang, Đà Nẵng",
        price: 4500000,
        desc: "Một kiệt tác kiến trúc của Bill Bensley, nơi di sản văn hóa Việt Nam hòa quyện cùng sự sang trọng bậc nhất. Tận hưởng view biển Đông tuyệt mỹ từ mọi góc nhìn.",
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["Wifi tốc độ cao", "Hồ bơi vô cực", "Bãi biển riêng", "Bữa sáng Buffet"]
    }

    return (
        <div className="bg-[#F5F5F5] min-h-screen font-jakarta pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-[#004D40] text-[#FFAB40] px-4 py-1 rounded-tr-xl rounded-bl-xl text-[10px] font-black tracking-widest uppercase">
                                {srv.type}
                            </span>
                            <div className="flex items-center gap-1 text-[#FFAB40]">
                                <Star size={14} className="fill-[#FFAB40]" />
                                <span className="text-sm font-black text-[#004D40]">{srv.rating} ({srv.reviews} đánh giá)</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-cormorant font-bold text-[#004D40] leading-tight max-w-4xl">{srv.name}</h1>
                        <p className="flex items-center gap-2 text-[#004D40]/50 mt-4 font-bold text-sm uppercase tracking-widest">
                            <MapPin size={16} className="text-[#FFAB40]" /> {srv.address}
                        </p>
                    </motion.div>

                    <div className="flex gap-3">
                        <button className="p-4 bg-white rounded-tr-2xl rounded-bl-2xl shadow-sm text-[#004D40] hover:text-[#FFAB40] transition-all border border-white"><Share2 size={20} /></button>
                        <button className="p-4 bg-white rounded-tr-2xl rounded-bl-2xl shadow-sm text-[#004D40] hover:text-red-500 transition-all border border-white"><Heart size={20} /></button>
                    </div>
                </div>

                {/* BENTO GALLERY */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[550px] mb-16"
                >
                    <div className="md:col-span-2 h-full rounded-tr-[60px] rounded-bl-[60px] rounded-tl-2xl rounded-br-2xl overflow-hidden shadow-2xl border-4 border-white">
                        <img src={srv.images[0]} className="w-full h-full object-cover" alt="Main" />
                    </div>
                    <div className="md:col-span-1 grid grid-rows-2 gap-4 h-full">
                        <div className="rounded-tr-2xl rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl overflow-hidden border-2 border-white shadow-lg">
                            <img src={srv.images[1]} className="w-full h-full object-cover" alt="Sub 1" />
                        </div>
                        <div className="rounded-tr-[40px] rounded-bl-2xl rounded-tl-2xl rounded-br-2xl overflow-hidden border-2 border-white shadow-lg">
                            <img src={srv.images[2]} className="w-full h-full object-cover" alt="Sub 2" />
                        </div>
                    </div>
                    <div className="md:col-span-1 h-full rounded-tr-2xl rounded-bl-2xl rounded-tl-[40px] rounded-br-[40px] overflow-hidden border-2 border-white shadow-lg relative group">
                        <img src={srv.images[3]} className="w-full h-full object-cover" alt="Sub 3" />
                        <div className="absolute inset-0 bg-[#004D40]/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center text-white cursor-pointer">
                            <Camera size={32} strokeWidth={1.5} />
                            <span className="text-[10px] font-black uppercase tracking-widest mt-2">Xem 24 ảnh khác</span>
                        </div>
                    </div>
                </motion.div>

                {/* CONTENT AREA */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* INFO LEFT */}
                    <div className="lg:col-span-8 space-y-12">
                        <section>
                            <h2 className="text-3xl font-cormorant font-bold text-[#004D40] mb-6 flex items-center gap-4">
                                <span className="w-12 h-px bg-[#FFAB40]"></span> Giới thiệu
                            </h2>
                            <p className="text-xl font-medium text-[#004D40]/70 leading-relaxed italic text-justify">"{srv.desc}"</p>
                        </section>

                        <section className="bg-white p-12 rounded-tr-[50px] rounded-bl-[50px] rounded-tl-3xl rounded-br-3xl border border-white shadow-xl">
                            <h2 className="text-2xl font-cormorant font-bold text-[#004D40] mb-10 text-center uppercase tracking-widest">Tiện ích đặc quyền</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                                {srv.amenities.map((item, i) => (
                                    <div key={i} className="flex flex-col items-center gap-3 group">
                                        <div className="w-16 h-16 bg-[#F5F5F5] rounded-tr-2xl rounded-bl-2xl flex items-center justify-center text-[#004D40] group-hover:bg-[#FFAB40] group-hover:text-white transition-all shadow-inner">
                                            {i % 4 === 0 ? <Wifi size={24} /> : i % 4 === 1 ? <Clock size={24} /> : i % 4 === 2 ? <Coffee size={24} /> : <ShieldCheck size={24} />}
                                        </div>
                                        <span className="text-[10px] font-black text-[#004D40]/60 uppercase tracking-widest">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* BOOKING RIGHT (STICKY) */}
                    <aside className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="sticky top-28 bg-white/80 backdrop-blur-xl p-8 rounded-tr-[50px] rounded-bl-[50px] rounded-tl-2xl rounded-br-2xl border border-white shadow-2xl"
                        >
                            <div className="flex justify-between items-end mb-8 pb-6 border-b border-[#E0F2F1]">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Giá cơ sở</p>
                                    <h3 className="text-3xl font-black text-[#004D40] italic">{srv.price.toLocaleString('vi-VN')} đ</h3>
                                </div>
                                <p className="text-xs font-bold text-[#004D40]/50 mb-1">{srv.type === 'HOTEL' ? '/ đêm' : '/ khách'}</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-[#004D40]/40 uppercase tracking-widest mb-2 block">Thời gian</label>
                                    <div className="relative">
                                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFAB40]" size={18} />
                                        <input type="text" placeholder="Chọn ngày..." className="w-full bg-[#F5F5F5] border border-[#E0F2F1] rounded-tr-xl rounded-bl-xl p-4 outline-none focus:ring-2 focus:ring-[#FFAB40]/50 font-bold text-[#004D40]" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-[#004D40]/40 uppercase tracking-widest mb-2 block">Số lượng</label>
                                    <div className="relative">
                                        <Users className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFAB40]" size={18} />
                                        <input type="number" defaultValue="1" min="1" className="w-full bg-[#F5F5F5] border border-[#E0F2F1] rounded-tr-xl rounded-bl-xl p-4 outline-none focus:ring-2 focus:ring-[#FFAB40]/50 font-bold text-[#004D40]" />
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                className="w-full bg-[#004D40] text-white py-5 rounded-tr-[24px] rounded-bl-[24px] rounded-tl-md rounded-br-md font-black text-sm uppercase tracking-[0.3em] mt-10 shadow-xl shadow-[#004D40]/20 flex items-center justify-center gap-3 hover:bg-[#002B24]"
                            >
                                <CheckCircle2 size={18} /> Đặt dịch vụ
                            </motion.button>

                            <div className="mt-8 flex items-center gap-3 bg-[#E0F2F1]/50 p-4 rounded-2xl border border-[#004D40]/5">
                                <Info size={16} className="text-[#004D40] shrink-0" />
                                <p className="text-[9px] font-black text-[#004D40]/60 uppercase leading-relaxed tracking-widest">
                                    Xác nhận tức thì qua AI & Bảo hiểm hành trình từ D-Pulse.
                                </p>
                            </div>
                        </motion.div>
                    </aside>

                </div>
            </div>
        </div>
    )
}

export default ServiceDetails