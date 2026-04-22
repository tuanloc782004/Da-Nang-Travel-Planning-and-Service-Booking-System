import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Trash2, Share2, Sparkles, ChevronRight } from 'lucide-react'

const MyItineraries = () => {
    // Mock dữ liệu TripSchema
    const trips = [
        {
            id: 'trip_01',
            title: 'Kỳ nghỉ Hè rực rỡ Đà Nẵng',
            startDate: '20/06/2026',
            endDate: '22/06/2026',
            itinerary: [
                { time: '09:00', task: 'Đón sân bay & Check-in', loc: 'Sala Danang Beach', type: 'hotel' },
                { time: '12:00', task: 'Ăn trưa đặc sản Mì Quảng', loc: 'Mì Quảng Bà Mua', type: 'food' },
                { time: '15:00', task: 'Khám phá Ngũ Hành Sơn', loc: 'Hòn Thủy Sơn', type: 'activity' }
            ]
        }
    ]

    return (
        <div className="bg-[#F5F5F5] min-h-screen font-jakarta pt-28 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-[#E0F2F1] text-[#004D40] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                            <Sparkles size={12} /> Personal AI Plans
                        </div>
                        <h1 className="text-5xl font-cormorant font-bold text-[#004D40]">Lịch trình của tôi</h1>
                    </div>
                    <button className="bg-[#004D40] text-white px-8 py-3 rounded-tr-2xl rounded-bl-2xl font-bold shadow-xl hover:bg-[#002B24] transition-all">
                        Tạo lịch trình mới
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* DANH SÁCH BÊN TRÁI */}
                    <div className="lg:col-span-4 space-y-6">
                        {trips.map(trip => (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                key={trip.id}
                                className="bg-white p-6 rounded-tr-[40px] rounded-bl-[40px] shadow-xl border-2 border-[#004D40] cursor-pointer"
                            >
                                <h3 className="font-cormorant font-bold text-2xl text-[#004D40] mb-2">{trip.title}</h3>
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    <Calendar size={14} className="text-[#FFAB40]" /> {trip.startDate} - {trip.endDate}
                                </div>
                                <div className="mt-6 flex justify-between items-center">
                                    <span className="text-[10px] font-black bg-[#E0F2F1] text-[#004D40] px-3 py-1 rounded-lg uppercase">3 Hoạt động</span>
                                    <div className="flex gap-2">
                                        <button className="p-2 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                        <button className="p-2 hover:text-[#FFAB40] transition-colors"><Share2 size={16} /></button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CHI TIẾT TIMELINE BÊN PHẢI */}
                    <div className="lg:col-span-8 bg-white/60 backdrop-blur-md rounded-tr-[60px] rounded-bl-[60px] p-8 md:p-12 shadow-2xl border border-white relative">
                        <div className="relative border-l-2 border-dashed border-[#004D40]/20 ml-6 space-y-12">
                            {trips[0].itinerary.map((item, idx) => (
                                <div key={idx} className="relative pl-12">
                                    {/* Dot nảy Pulse */}
                                    <div className="absolute -left-[11px] top-0 w-5 h-5 bg-[#FFAB40] rounded-full border-4 border-white shadow-lg animate-pulse"></div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.2 }}
                                        className="bg-white p-6 rounded-tr-3xl rounded-bl-3xl shadow-sm border border-white group hover:shadow-xl transition-all"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-[#F5F5F5] rounded-tr-xl rounded-bl-xl flex items-center justify-center text-[#004D40] shrink-0">
                                                    <Clock size={20} />
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-black text-[#FFAB40] tracking-widest uppercase">{item.time}</span>
                                                    <h4 className="text-xl font-bold text-[#004D40] mt-1">{item.task}</h4>
                                                    <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-2 font-medium">
                                                        <MapPin size={14} className="text-[#004D40]/30" /> {item.loc}
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="self-end md:self-center text-[#004D40]/20 group-hover:text-[#FFAB40] transition-colors">
                                                <ChevronRight size={24} />
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyItineraries