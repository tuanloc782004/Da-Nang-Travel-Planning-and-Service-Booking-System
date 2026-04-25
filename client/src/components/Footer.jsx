import React from 'react'
import { Link } from 'react-router-dom'
import { Map, Phone, Mail } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-[#004D40] text-[#E0F2F1] font-jakarta relative pt-20 pb-10 px-6 overflow-hidden">
            {/* Đường cắt chéo tạo điểm nhấn D-PULSE */}
            <div className="absolute top-0 left-0 w-full h-10 bg-[#F5F5F5] rounded-br-[60px] md:rounded-br-[100px] z-10"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-20">
                {/* Logo & Intro */}
                <div className="md:col-span-1">
                    <span className="font-cormorant font-bold text-3xl tracking-tight text-white">D-PULSE</span>
                    <p className="mt-4 text-sm text-[#E0F2F1]/70 leading-relaxed font-medium">
                        Nền tảng trải nghiệm du lịch cá nhân hóa. Nhịp đập của Biển và Đá Cẩm Thạch Đà Nẵng.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Khám phá</h4>
                    <ul className="space-y-3 text-sm font-medium text-[#E0F2F1]/70">
                        <li><Link to="/rooms" className="hover:text-[#FFAB40] transition-colors">Khách sạn & Lưu trú</Link></li>
                        <li><Link to="/rooms" className="hover:text-[#FFAB40] transition-colors">Ẩm thực địa phương</Link></li>
                        <li><Link to="/rooms" className="hover:text-[#FFAB40] transition-colors">Hoạt động trải nghiệm</Link></li>
                        <li><Link to="/ai-planner" className="hover:text-[#FFAB40] flex items-center gap-1.5 transition-colors">Lịch trình AI <span className="bg-[#FFAB40] text-white text-[9px] px-1.5 py-0.5 rounded">MỚI</span></Link></li>
                    </ul>
                </div>

                {/* Dành cho Đối tác */}
                <div>
                    <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Đối tác</h4>
                    <ul className="space-y-3 text-sm font-medium text-[#E0F2F1]/70">
                        <li><Link to="/owner" className="hover:text-[#FFAB40] transition-colors">Đăng ký kinh doanh</Link></li>
                        <li><Link to="/owner" className="hover:text-[#FFAB40] transition-colors">Kênh Quản lý (Owner)</Link></li>
                        <li><Link to="#" className="hover:text-[#FFAB40] transition-colors">Chính sách nền tảng</Link></li>
                    </ul>
                </div>

                {/* Liên hệ */}
                <div>
                    <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Liên hệ</h4>
                    <ul className="space-y-4 text-sm font-medium text-[#E0F2F1]/70">
                        <li className="flex items-start gap-3">
                            <Map className="text-[#FFAB40] shrink-0" size={18} />
                            <span>Đại học Bách Khoa, Đà Nẵng</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="text-[#FFAB40]" size={18} />
                            <span>0905.XXX.XXX</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="text-[#FFAB40]" size={18} />
                            <span>hello@dpulse.vn</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#E0F2F1]/50 font-bold uppercase tracking-widest relative z-20">
                <p>© {new Date().getFullYear()} D-PULSE DANANG. All rights reserved.</p>
                <div className="flex gap-4 font-bold">
                    <a href="#" className="hover:text-white transition-colors">FACEBOOK</a>
                    <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer