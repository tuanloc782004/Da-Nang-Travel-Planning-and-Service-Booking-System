import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserButton, useUser, SignInButton } from '@clerk/react'
import { Sparkles, Map, CalendarDays, ClipboardList, Store, LayoutDashboard } from 'lucide-react'

const Navbar = () => {
    const { user, isSignedIn } = useUser()
    const navigate = useNavigate()
    const userRole = user?.publicMetadata?.role || 'USER'

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 py-3 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between font-jakarta">

                <Link to="/" className="font-cormorant font-bold text-2xl text-[#004D40] tracking-tighter">
                    D-PULSE <span className="text-xs font-jakarta font-black text-[#FFAB40] ml-1">ĐÀ NẴNG</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-[#004D40]/70">
                    <Link to="/services" className="hover:text-[#004D40] flex items-center gap-1.5"><Map size={16} /> Khám phá</Link>
                    <Link to="/ai-planner" className="text-[#FFAB40] flex items-center gap-1.5"><Sparkles size={16} /> Lịch trình AI</Link>
                </nav>

                <div className="flex items-center gap-4">
                    {isSignedIn ? (
                        <div className="flex items-center gap-4">
                            {userRole === 'USER' && (
                                <Link to="/become-partner" className="hidden md:flex items-center gap-2 text-xs font-black uppercase text-[#004D40] border border-[#004D40]/10 px-4 py-2 rounded-tr-xl rounded-bl-xl hover:bg-[#004D40] hover:text-white transition-all">
                                    <Store size={14} /> Đối tác
                                </Link>
                            )}
                            {userRole === 'OWNER' && (
                                <Link to="/owner" className="bg-[#004D40] text-[#FFAB40] px-4 py-2 rounded-tr-xl rounded-bl-xl text-[10px] font-black tracking-widest shadow-lg flex items-center gap-2">
                                    <LayoutDashboard size={14} /> KÊNH QUẢN LÝ
                                </Link>
                            )}

                            {/* CUSTOM CLERK USER BUTTON */}
                            <UserButton afterSignOutUrl="/">
                                <UserButton.MenuItems>
                                    <UserButton.Link
                                        label="Lịch trình của tôi"
                                        labelIcon={<CalendarDays size={16} />}
                                        href="/my-itineraries"
                                    />
                                    <UserButton.Link
                                        label="Đơn hàng của tôi"
                                        labelIcon={<ClipboardList size={16} />}
                                        href="/my-bookings"
                                    />
                                </UserButton.MenuItems>
                            </UserButton>
                        </div>
                    ) : (
                        <SignInButton mode="modal">
                            <button className="bg-[#FFAB40] text-white px-6 py-2 rounded-tr-xl rounded-bl-xl font-bold text-sm shadow-lg shadow-[#FFAB40]/20">Đăng nhập</button>
                        </SignInButton>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar