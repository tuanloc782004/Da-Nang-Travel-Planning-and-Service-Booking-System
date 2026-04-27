import React from "react";

function Footer() {
  return (
    <footer className="mt-10 border-t border-white/50 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 bg-[#F5F5F5]/80 backdrop-blur-[10px] rounded-xl px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.01)]">
      <p>
        © 2026 <span className="font-bold text-[#004D40]">D-PULSE</span>. All
        rights reserved.
      </p>
      <div className="flex gap-6 mt-4 md:mt-0 font-medium">
        <a href="#" className="hover:text-[#004D40] transition-colors">
          Hỗ trợ
        </a>
        <a href="#" className="hover:text-[#004D40] transition-colors">
          Điều khoản
        </a>
        <a href="#" className="hover:text-[#004D40] transition-colors">
          Chính sách bảo mật
        </a>
      </div>
    </footer>
  );
}

export default Footer;
