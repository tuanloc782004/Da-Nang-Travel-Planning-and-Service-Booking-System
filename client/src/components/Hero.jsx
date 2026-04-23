import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center text-white
      bg-[url('/src/assets/heroImage.png')] bg-cover bg-center"
    >
      {/* Overlay cho bg đẹp hơn */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-4">
        
        {/* TEXT SIÊU TO */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-10">
          Lên kế hoạch du lịch
        </h1>

        {/* SEARCH BAR */}
        <form
          className="
          w-full max-w-3xl
           bg-white/10
          border border-white/20
          rounded-full
          flex items-center gap-3
          px-5 py-1
          shadow-lg
        "
        >
          <img src={assets.searchIcon} alt="" className="h-5 opacity-80" />

          <input
            type="text"
            placeholder="Bạn muốn đi đâu?"
            className="
              w-full bg-transparent outline-none
              placeholder-white/70 text-white
            "
          />

          <button
            className="
           bg-white text-black px-5 py-2 rounded-full
              font-medium hover:bg-gray-200 transition
            "
          >
            Tìm kiếm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;