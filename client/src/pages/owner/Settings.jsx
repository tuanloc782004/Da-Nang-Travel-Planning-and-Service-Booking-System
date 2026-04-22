import React, { useState, useEffect } from 'react'
import { Save, Building2, CreditCard, User, QrCode, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

const Settings = () => {
    const [formData, setFormData] = useState({
        bankId: '',
        accountNumber: '',
        accountHolderName: ''
    })

    const [banks, setBanks] = useState([])
    const [qrPreview, setQrPreview] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isVerified, setIsVerified] = useState(false)

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const response = await fetch('https://api.vietqr.io/v2/banks')
                const result = await response.json()
                if (result.code === '00') {
                    setBanks(result.data)
                }
            } catch (error) {
                console.error("Lỗi khi tải danh sách ngân hàng:", error)
            }
        }
        fetchBanks()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target

        // VALIDATE SỐ TÀI KHOẢN: Chỉ giữ lại số
        if (name === 'accountNumber') {
            const onlyNumbers = value.replace(/\D/g, '')
            setFormData({ ...formData, [name]: onlyNumbers })
            setIsVerified(false)
            return
        }

        // VALIDATE TÊN CHỦ TÀI KHOẢN: Ép hoa, bỏ dấu, bỏ số & ký tự đặc biệt
        if (name === 'accountHolderName') {
            let formattedName = value.toUpperCase()

            // Khử dấu tiếng Việt chuẩn Unicode
            formattedName = formattedName
                .normalize("NFD") // Tách chữ và dấu
                .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu
                .replace(/Đ/g, "D") // Chuyển chữ Đ thành D

            // Xóa mọi thứ KHÔNG phải là chữ cái (A-Z) và khoảng trắng
            formattedName = formattedName.replace(/[^A-Z\s]/g, '')

            setFormData({ ...formData, [name]: formattedName })
            setIsVerified(false)
            return
        }

        if (name === 'bankId') {
            setIsVerified(false)
        }

        setFormData({ ...formData, [name]: value })
    }

    useEffect(() => {
        if (formData.bankId && formData.accountNumber.length >= 6 && formData.accountHolderName) {
            const url = `https://img.vietqr.io/image/${formData.bankId}-${formData.accountNumber}-compact2.png?accountName=${encodeURIComponent(formData.accountHolderName)}`
            setQrPreview(url)
        } else {
            setQrPreview('')
            setIsVerified(false)
        }
    }, [formData.bankId, formData.accountNumber, formData.accountHolderName])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.accountNumber.length < 6) {
            alert("Số tài khoản không hợp lệ (Quá ngắn)!")
            return
        }

        setIsLoading(true)
        setTimeout(() => {
            console.log("Dữ liệu an toàn lưu vào DB:", formData)
            alert("Đã lưu thông tin tài khoản thành công!")
            setIsLoading(false)
        }, 1000)
    }

    // Input Style dùng chung cho D-PULSE
    const inputStyle = "w-full pl-11 pr-4 py-3 bg-white/60 border border-[#E0F2F1] rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md focus:ring-2 focus:ring-[#004D40]/20 outline-none text-sm font-bold text-[#004D40] placeholder-[#004D40]/30 transition-all"

    return (
        <div className="max-w-5xl mx-auto space-y-8 font-jakarta pb-10">
            <div>
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-cormorant font-bold text-[#004D40]"
                >
                    Cài đặt Thanh toán
                </motion.h1>
                <p className="text-[#004D40]/60 mt-1 font-medium text-sm">Cấu hình tài khoản ngân hàng để nhận tiền trực tiếp từ khách đặt phòng.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* CỘT TRÁI: Form nhập thông tin */}
                <div className="md:col-span-2">
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        onSubmit={handleSubmit}
                        className="bg-white/80 backdrop-blur-[10px] rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden"
                    >
                        <div className="p-8 space-y-6">

                            <div>
                                <label className="block text-sm font-bold text-[#004D40] mb-2">Ngân hàng thụ hưởng <span className="text-[#FFAB40]">*</span></label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#004D40]/40" size={18} />
                                    <select
                                        name="bankId"
                                        value={formData.bankId}
                                        onChange={handleChange}
                                        className={`${inputStyle} appearance-none cursor-pointer pr-10`}
                                        required
                                    >
                                        <option value="">-- Chọn ngân hàng --</option>
                                        {banks.map(bank => (
                                            <option key={bank.bin} value={bank.bin}>{bank.shortName} - {bank.name}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#004D40]/50">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#004D40] mb-2">Số tài khoản <span className="text-[#FFAB40]">*</span></label>
                                <div className="relative">
                                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[#004D40]/40" size={18} />
                                    <input
                                        type="text"
                                        name="accountNumber"
                                        value={formData.accountNumber}
                                        onChange={handleChange}
                                        placeholder="Chỉ nhập số..."
                                        className={`${inputStyle} font-mono tracking-wider`}
                                        required
                                    />
                                </div>
                                {formData.accountNumber.length > 0 && formData.accountNumber.length < 6 && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold text-red-500 mt-2 flex items-center gap-1.5">
                                        <AlertTriangle size={14} /> Số tài khoản quá ngắn
                                    </motion.p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#004D40] mb-2">Tên chủ tài khoản <span className="text-[#FFAB40]">*</span></label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#004D40]/40" size={18} />
                                    <input
                                        type="text"
                                        name="accountHolderName"
                                        value={formData.accountHolderName}
                                        onChange={handleChange}
                                        placeholder="VD: LE VAN TUAN LOC"
                                        className={`${inputStyle} font-mono tracking-wider uppercase`}
                                        required
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Footer Form */}
                        <div className="bg-white/40 px-8 py-5 border-t border-[#004D40]/5 flex justify-between items-center">
                            <p className="text-xs font-semibold text-[#004D40]/50 italic">* Vui lòng xác nhận QR Code bên cạnh trước khi lưu.</p>

                            <motion.button
                                whileHover={{ scale: (isLoading || !isVerified) ? 1 : 1.05 }}
                                whileTap={{ scale: (isLoading || !isVerified) ? 1 : 0.95 }}
                                type="submit"
                                disabled={isLoading || !isVerified}
                                className="flex items-center gap-2 bg-[#004D40] text-white px-7 py-3 rounded-tr-[20px] rounded-bl-[20px] rounded-tl-md rounded-br-md font-bold transition-all shadow-lg shadow-[#004D40]/20 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed hover:bg-[#00332A]"
                            >
                                <Save size={18} /> {isLoading ? 'Đang lưu...' : 'Lưu tài khoản'}
                            </motion.button>
                        </div>
                    </motion.form>
                </div>

                {/* CỘT PHẢI: Preview QR Code & Checkbox */}
                <div className="md:col-span-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-[10px] rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 flex flex-col items-center justify-center text-center h-full min-h-[380px]"
                    >
                        {qrPreview ? (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                                <h3 className="font-cormorant font-bold text-xl text-[#004D40] mb-5">Mã QR Thanh toán</h3>
                                <div className="p-3 bg-white border border-[#E0F2F1] shadow-sm rounded-tr-2xl rounded-bl-2xl rounded-tl-lg rounded-br-lg">
                                    <img src={qrPreview} alt="VietQR Preview" className="w-44 h-44 object-contain" />
                                </div>

                                <div className="mt-8 bg-[#E0F2F1]/50 p-4 rounded-tr-2xl rounded-bl-2xl rounded-tl-lg rounded-br-lg border border-[#004D40]/10 text-left w-full transition-colors hover:bg-[#E0F2F1]">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={isVerified}
                                            onChange={(e) => setIsVerified(e.target.checked)}
                                            className="mt-1 w-4 h-4 text-[#004D40] border-[#004D40]/30 rounded focus:ring-[#004D40] cursor-pointer accent-[#FFAB40]"
                                        />
                                        <span className="text-xs text-[#004D40] font-semibold leading-relaxed group-hover:text-[#00332A] transition-colors">
                                            Tôi đã dùng App Ngân hàng quét thử mã QR này và xác nhận thông tin thụ hưởng là hoàn toàn chính xác.
                                        </span>
                                    </label>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <QrCode className="text-[#004D40]/20 mb-5" size={56} strokeWidth={1.5} />
                                <h3 className="font-cormorant font-bold text-xl text-[#004D40] mb-2">Chưa có mã QR</h3>
                                <p className="text-sm font-medium text-[#004D40]/50 leading-relaxed px-4">
                                    Vui lòng điền đầy đủ thông tin bên trái để hệ thống tạo mã QR kiểm tra.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Settings