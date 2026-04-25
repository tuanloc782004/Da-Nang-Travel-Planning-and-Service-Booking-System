import React from 'react'
import { motion } from 'framer-motion'
import { Building2, CreditCard, FileText, Send, ShieldCheck, MapPin, UserCheck } from 'lucide-react'

const BecomePartner = () => {
    const inputLabel = "text-[10px] font-black text-[#004D40]/40 uppercase tracking-[0.2em] ml-1 mb-2 block"
    const inputStyle = "w-full bg-[#F5F5F5] border border-[#E0F2F1] rounded-tr-xl rounded-bl-xl p-4 outline-none focus:ring-2 focus:ring-[#FFAB40]/50 font-bold text-[#004D40] placeholder:text-gray-300 transition-all shadow-inner"

    return (
        <div className="bg-[#F5F5F5] min-h-screen font-jakarta pt-28 pb-20 px-6">
            <div className="max-w-4xl mx-auto">

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className="text-5xl font-cormorant font-bold text-[#004D40]">Hợp tác cùng D-PULSE</h1>
                    <p className="text-[#004D40]/60 mt-4 font-medium text-lg italic">"Đưa nhịp đập kinh doanh của bạn hòa vào dòng chảy du lịch Đà Nẵng."</p>
                </motion.div>

                <div className="bg-white/80 backdrop-blur-xl rounded-tr-[60px] rounded-bl-[60px] rounded-tl-2xl rounded-br-2xl p-10 md:p-16 shadow-2xl border border-white">
                    <form className="space-y-12">

                        {/* SECTION: BUSINESS INFO */}
                        <section>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 bg-[#004D40] text-[#FFAB40] rounded-tr-2xl rounded-bl-2xl flex items-center justify-center shadow-lg"><Building2 size={24} /></div>
                                <div>
                                    <h2 className="text-2xl font-cormorant font-bold text-[#004D40]">Thông tin cơ sở</h2>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hồ sơ pháp nhân doanh nghiệp</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className={inputLabel}>Tên cơ sở kinh doanh</label>
                                    <input type="text" placeholder="VD: D-Pulse Marina Danang" className={inputStyle} />
                                </div>
                                <div>
                                    <label className={inputLabel}>Số điện thoại kinh doanh</label>
                                    <input type="text" placeholder="0905 XXX XXX" className={inputStyle} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={inputLabel}>Địa chỉ trụ sở</label>
                                    <div className="relative">
                                        <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFAB40]" size={18} />
                                        <input type="text" placeholder="Số nhà, đường, phường, quận, Đà Nẵng" className={inputStyle} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SECTION: BANKING INFO */}
                        <section>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 bg-[#004D40] text-[#FFAB40] rounded-tr-2xl rounded-bl-2xl flex items-center justify-center shadow-lg"><CreditCard size={24} /></div>
                                <div>
                                    <h2 className="text-2xl font-cormorant font-bold text-[#004D40]">Tài khoản thụ hưởng</h2>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cấu hình thanh toán VietQR / VNPay</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className={inputLabel}>Ngân hàng</label>
                                    <input type="text" placeholder="VD: Vietcombank" className={inputStyle} />
                                </div>
                                <div>
                                    <label className={inputLabel}>Số tài khoản</label>
                                    <input type="text" placeholder="0123 456 789" className={inputStyle} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={inputLabel}>Chủ tài khoản (In hoa không dấu)</label>
                                    <input type="text" placeholder="LE VAN TUAN LOC" className={inputStyle} />
                                </div>
                            </div>
                        </section>

                        {/* SECTION: UPLOADS */}
                        <section>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 bg-[#004D40] text-[#FFAB40] rounded-tr-2xl rounded-bl-2xl flex items-center justify-center shadow-lg"><FileText size={24} /></div>
                                <div>
                                    <h2 className="text-2xl font-cormorant font-bold text-[#004D40]">Hồ sơ xác minh</h2>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Giấy tờ chứng thực kinh doanh</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="border-2 border-dashed border-[#E0F2F1] rounded-tr-[32px] rounded-bl-[32px] p-10 text-center hover:border-[#FFAB40] transition-colors cursor-pointer group bg-gray-50/50">
                                    <UserCheck className="mx-auto text-[#004D40]/20 group-hover:text-[#FFAB40] mb-4 transition-colors" size={40} />
                                    <p className="text-[10px] font-black text-[#004D40]/60 uppercase tracking-widest">Ảnh CCCD / Passport</p>
                                </div>
                                <div className="border-2 border-dashed border-[#E0F2F1] rounded-tr-[32px] rounded-bl-[32px] p-10 text-center hover:border-[#FFAB40] transition-colors cursor-pointer group bg-gray-50/50">
                                    <ShieldCheck className="mx-auto text-[#004D40]/20 group-hover:text-[#FFAB40] mb-4 transition-colors" size={40} />
                                    <p className="text-[10px] font-black text-[#004D40]/60 uppercase tracking-widest">Giấy phép đăng ký kinh doanh</p>
                                </div>
                            </div>
                        </section>

                        <div className="pt-6">
                            <motion.button
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                className="w-full bg-[#004D40] text-white py-5 rounded-tr-3xl rounded-bl-3xl font-black text-sm uppercase tracking-[0.4em] shadow-2xl shadow-[#004D40]/30 flex items-center justify-center gap-4 hover:bg-[#002B24] transition-all"
                            >
                                <Send size={20} /> Gửi hồ sơ xét duyệt
                            </motion.button>
                            <p className="text-center mt-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-10 leading-relaxed">
                                Hồ sơ sẽ được Quản trị viên phản hồi trong vòng 24h làm việc.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BecomePartner