import React from 'react'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { motion } from 'framer-motion'

const Navbar = () => {
    const { user } = useUser()

    return (
        <header className="h-16 bg-[#F5F5F5]/80 backdrop-blur-[10px] border-b border-white flex items-center justify-between px-6 md:px-8 z-10 shadow-[0_4px_30px_rgba(0,0,0,0.02)] font-jakarta">
            {/* Bên trái */}
            <div>
                <h2 className="text-lg font-bold text-[#004D40] hidden md:block tracking-tight">
                    Chào mừng trở lại, {user?.firstName || 'Partner'}
                </h2>
            </div>

            {/* Bên phải */}
            <div className="flex items-center gap-5">
                <Link
                    to="/"
                    className="text-sm font-bold text-gray-500 hover:text-[#FFAB40] transition-colors"
                >
                    Trang khách hàng
                </Link>

                <div className="w-px h-6 bg-gray-300"></div>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative text-[#004D40] hover:text-[#FFAB40] transition-colors"
                >
                    <Bell size={22} />
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-[#FFAB40] border-2 border-[#F5F5F5]"></span>
                </motion.button>

                <div className="ml-1 flex items-center">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </header>
    )
}

export default Navbar