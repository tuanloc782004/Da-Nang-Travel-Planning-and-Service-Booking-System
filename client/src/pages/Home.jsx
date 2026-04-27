import React, { useState} from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Utensils, Bed, Ticket, ArrowRight, Star, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useUser } from "@clerk/clerk-react";
import LoginPrompt from "../components/LoginPrompt";

const Home = ( { dbUser } ) => {
    const navigate = useNavigate()
    const { isSignedIn } = useUser();
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const handleAIPlannerClick = () => {
        if (!isSignedIn) {
            setShowLoginPrompt(true);
        }   else {
            navigate("/ai-planner");
        }
    };

    // Mock dữ liệu đa dạng theo Database Schema
    const trendingServices = [
        { id: '1', name: "InterContinental Sun Peninsula", type: "HOTEL", rating: 4.9, price: "4.500.000", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" },
        { id: '2', name: "Hải sản Năm Đảnh", type: "RESTAURANT", rating: 4.7, price: "300.000", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" },
        { id: '3', name: "Ký ức Hội An Show", type: "ACTIVITY", rating: 4.8, price: "600.000", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80" },
    ]

    const serviceTypes = [
        { id: 'HOTEL', label: 'Lưu trú', icon: <Bed size={18} />, color: 'bg-blue-500' },
        { id: 'RESTAURANT', label: 'Ẩm thực', icon: <Utensils size={18} />, color: 'bg-orange-500' },
        { id: 'ACTIVITY', label: 'Hoạt động', icon: <Ticket size={18} />, color: 'bg-teal-500' },
    ]

    return (
        <div className="bg-[#F5F5F5] min-h-screen font-jakarta">

            {isSignedIn && dbUser && (
                <div className="absolute top-24 left-6 z-30 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white text-xs font-bold">
                    Chào mừng trở lại, {dbUser.fullName || "bạn đồng hành"}! ✨
                </div>
            )}

            {/* HERO PULSE SECTION */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover" alt="Danang" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#004D40]/70 via-[#004D40]/30 to-[#F5F5F5]"></div>
                </div>

                <div className="relative z-10 w-full max-w-5xl px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-cormorant font-bold text-white mb-6 tracking-tight"
                    >
                        Nhịp đập <span className="text-[#FFAB40] italic font-medium text-4xl md:text-7xl">miền Di sản</span>
                    </motion.h1>

                    {/* D-PULSE UNIVERSAL SEARCH BAR */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                        className="bg-white/10 backdrop-blur-xl p-2 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl border border-white/20 shadow-2xl max-w-4xl mx-auto mt-12"
                    >
                        <div className="bg-white rounded-tr-[32px] rounded-bl-[32px] rounded-tl-xl rounded-br-xl p-2 flex flex-col md:flex-row gap-2">
                            {/* Chọn loại dịch vụ */}
                            <div className="flex-1 px-6 py-3 border-r border-gray-100 flex flex-col items-start justify-center">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Bạn tìm gì?</p>
                                <select className="w-full bg-transparent font-bold text-[#004D40] outline-none appearance-none cursor-pointer">
                                    <option value="ALL">Tất cả dịch vụ</option>
                                    <option value="HOTEL">Khách sạn & Homestay</option>
                                    <option value="RESTAURANT">Nhà hàng & Đặc sản</option>
                                    <option value="ACTIVITY">Tour & Trải nghiệm</option>
                                </select>
                            </div>

                            {/* Địa điểm */}
                            <div className="flex-1 px-6 py-3 border-r border-gray-100 flex flex-col items-start justify-center">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Ở đâu?</p>
                                <div className="flex items-center gap-2 w-full">
                                    <MapPin size={14} className="text-[#FFAB40]" />
                                    <input type="text" placeholder="Khu vực Đà Nẵng..." className="w-full bg-transparent font-bold text-[#004D40] outline-none placeholder-gray-300" />
                                </div>
                            </div>

                            {/* Nút Tìm kiếm */}
                            <motion.button
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/services')}
                                className="bg-[#004D40] text-white px-10 py-4 rounded-tr-[28px] rounded-bl-[28px] rounded-tl-lg rounded-br-lg font-bold flex items-center justify-center gap-2 hover:bg-[#00332A] transition-all shadow-lg"
                            >
                                <Search size={20} /> KHÁM PHÁ
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CATEGORY QUICK LINKS */}
            <section className="py-10 px-6 max-w-7xl mx-auto -mt-16 relative z-20">
                <div className="grid grid-cols-3 gap-4 md:gap-8">
                    {serviceTypes.map((type, idx) => (
                        <motion.div
                            key={type.id} whileHover={{ y: -5 }}
                            className="bg-white p-6 rounded-tr-[30px] rounded-bl-[30px] rounded-tl-xl rounded-br-xl shadow-xl flex flex-col items-center justify-center gap-3 cursor-pointer group border border-white"
                        >
                            <div className={`${type.color} text-white p-4 rounded-tr-2xl rounded-bl-2xl shadow-lg group-hover:rotate-12 transition-transform`}>
                                {type.icon}
                            </div>
                            <span className="font-bold text-[#004D40] text-sm uppercase tracking-widest">{type.label}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* AI CALL TO ACTION */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="bg-[#004D40] rounded-tr-[60px] rounded-bl-[60px] p-10 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 shadow-2xl border border-white/10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFAB40]/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-[#FFAB40]/20 text-[#FFAB40] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                            <Sparkles size={14} /> AI Trip Planner
                        </div>
                        <h2 className="text-4xl md:text-6xl font-cormorant font-bold text-white leading-tight">
                            Lên lịch trình riêng <br /><span className="text-[#FFAB40] italic">cho trái tim bạn.</span>
                        </h2>
                        <p className="text-[#E0F2F1]/70 mt-6 font-medium max-w-lg">
                            Để Gemini AI của D-Pulse sắp xếp kỳ nghỉ hoàn hảo tại Đà Nẵng dựa trên ngân sách và sở thích của bạn.
                        </p>
                        <button
                            onClick={handleAIPlannerClick}
                            className="mt-10 bg-[#FFAB40] text-white px-8 py-4 rounded-tr-2xl rounded-bl-2xl font-bold flex items-center gap-3 hover:bg-[#e09635] transition-all shadow-lg shadow-[#FFAB40]/20 uppercase text-sm tracking-widest"
                        >
                            Bắt đầu ngay <ArrowRight size={18} />
                        </button>
                    </div>
                    <div className="flex-1 w-full max-w-md bg-white/5 backdrop-blur-md rounded-tr-[40px] rounded-bl-[40px] p-8 border border-white/10">
                        {/* Preview nhỏ của Timeline */}
                        <div className="space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex gap-4 items-center opacity-60">
                                    <div className="w-10 h-10 rounded-full bg-[#FFAB40]/20 border border-[#FFAB40]/30 flex items-center justify-center text-[#FFAB40] font-bold text-xs">{i}</div>
                                    <div className="h-2 w-full bg-white/10 rounded-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* Login Prompt Modal */}
            <LoginPrompt
                isOpen={showLoginPrompt}
                onClose={() => setShowLoginPrompt(false)}
                message="Đăng nhập để sử dụng AI Trip Planner và tạo lịch trình du lịch thông minh cho riêng bạn!"
            />
        </div>
    )
}

export default Home