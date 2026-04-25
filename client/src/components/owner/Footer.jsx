import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-white/60 backdrop-blur-[10px] border-t border-white/50 py-4 px-6 md:px-8 mt-auto shrink-0 font-jakarta">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-500">
                <p>© {new Date().getFullYear()} D-PULSE. Kênh Đối Tác.</p>
                <div className="flex gap-5 font-medium">
                    <a href="#" className="hover:text-[#004D40] transition-colors">Trung tâm hỗ trợ</a>
                    <a href="#" className="hover:text-[#004D40] transition-colors">Chính sách</a>
                    <a href="#" className="hover:text-[#004D40] transition-colors">Điều khoản</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer