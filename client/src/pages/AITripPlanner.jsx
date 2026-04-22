import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, Bot, User, Map as MapIcon, Clock, Calendar, Compass } from 'lucide-react'

const AITripPlanner = () => {
    const [messages, setMessages] = useState([
        { id: 1, role: 'ai', text: 'Chào Lộc! Mình là D-PULSE AI. Bạn dự định ghé thăm Đà Nẵng trong bao nhiêu ngày và ngân sách dự kiến của bạn là bao nhiêu?' }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const chatEndRef = useRef(null)

    const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    useEffect(() => { scrollToBottom() }, [messages, isTyping])

    const handleSend = (e) => {
        e.preventDefault()
        if (!input.trim()) return

        setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: input }])
        setInput('')
        setIsTyping(true)

        // Giả lập Gemini AI phản hồi
        setTimeout(() => {
            setIsTyping(false)
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'ai',
                text: 'Ghi nhận! Mình đang phân tích các địa điểm phù hợp với sở thích "Khám phá di sản" và "Ẩm thực biển" của bạn...'
            }])
        }, 1500)
    }

    return (
        <div className="h-screen bg-[#F5F5F5] pt-20 flex flex-col md:flex-row overflow-hidden font-jakarta">
            {/* BÊN TRÁI: KHUNG CHAT HỘI THOẠI */}
            <div className="w-full md:w-[400px] lg:w-[500px] bg-white border-r border-[#004D40]/5 flex flex-col shadow-2xl z-10">
                <div className="p-6 border-b border-[#004D40]/5 flex items-center gap-4 bg-[#004D40] text-white">
                    <div className="w-10 h-10 bg-[#FFAB40] rounded-tr-xl rounded-bl-xl flex items-center justify-center shadow-lg">
                        <Sparkles size={20} className="text-[#004D40]" />
                    </div>
                    <div>
                        <h2 className="font-cormorant font-bold text-xl tracking-tight">D-PULSE AI</h2>
                        <p className="text-[10px] font-bold text-[#FFAB40] uppercase tracking-widest">Trợ lý du lịch thông minh</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                key={msg.id}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[85%] p-4 shadow-sm text-sm font-medium leading-relaxed ${msg.role === 'user'
                                        ? 'bg-[#004D40] text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm'
                                        : 'bg-[#E0F2F1] text-[#004D40] rounded-tl-sm rounded-tr-2xl rounded-bl-2xl rounded-br-2xl'
                                    }`}>
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 px-4 py-3 rounded-2xl flex gap-1">
                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-[#004D40] rounded-full" />
                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#004D40] rounded-full" />
                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#004D40] rounded-full" />
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                    <div ref={chatEndRef} />
                </div>

                <div className="p-4 bg-white border-t border-[#004D40]/5">
                    <form onSubmit={handleSend} className="relative flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Nhập yêu cầu của bạn..."
                            className="w-full bg-[#F5F5F5] border border-[#E0F2F1] rounded-full py-4 pl-6 pr-14 outline-none focus:ring-2 focus:ring-[#FFAB40]/50 font-bold text-[#004D40] placeholder:text-gray-300"
                        />
                        <button type="submit" className="absolute right-2 w-10 h-10 bg-[#004D40] text-[#FFAB40] rounded-full flex items-center justify-center hover:bg-[#002B24] transition-all shadow-md">
                            <Send size={18} strokeWidth={2.5} />
                        </button>
                    </form>
                </div>
            </div>

            {/* BÊN PHẢI: PREVIEW LỊCH TRÌNH (EMPTY STATE) */}
            <div className="flex-1 bg-[#F5F5F5] relative overflow-hidden flex flex-col items-center justify-center p-12 text-center">
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="max-w-md"
                >
                    <div className="w-24 h-24 bg-[#E0F2F1] rounded-tr-[40px] rounded-bl-[40px] flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <Compass size={40} className="text-[#004D40] animate-spin-slow" />
                    </div>
                    <h3 className="font-cormorant text-3xl font-bold text-[#004D40] mb-4">Sẵn sàng kiến tạo hành trình</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Hãy trò chuyện với AI ở bên trái. Lịch trình chi tiết của bạn sẽ xuất hiện tại đây sau khi chúng mình hiểu rõ mong muốn của bạn.
                    </p>
                </motion.div>

                {/* Lớp nền Texture Noise */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            </div>
        </div>
    )
}

export default AITripPlanner