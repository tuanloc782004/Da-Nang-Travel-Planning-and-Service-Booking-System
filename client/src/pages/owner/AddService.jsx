import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { UploadCloud, MapPin, Save, X, Map as MapIcon, Navigation } from 'lucide-react'
import { motion } from 'framer-motion'

const AddService = () => {
    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: { type: 'HOTEL', lat: 16.047079, lng: 108.206230 } // Mặc định ở Đà Nẵng
    })

    // State quản lý 4 slot hình ảnh
    const [images, setImages] = useState([null, null, null, null])
    const fileInputRef = useRef(null)
    const [activeSlot, setActiveSlot] = useState(null)

    const serviceType = watch('type')

    const getPriceLabel = () => {
        switch (serviceType) {
            case 'HOTEL': return 'Giá phòng / Đêm'
            case 'RESTAURANT': return 'Giá trung bình / Người'
            case 'ACTIVITY': return 'Giá vé / Khách'
            default: return 'Giá cơ bản'
        }
    }

    // Xử lý Upload 4 ảnh chia góc
    const triggerFileInput = (index) => {
        setActiveSlot(index)
        fileInputRef.current.click()
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file && activeSlot !== null) {
            const imageUrl = URL.createObjectURL(file) // Tạo URL tạm thời để preview
            const newImages = [...images]
            newImages[activeSlot] = imageUrl
            setImages(newImages)
        }
    }

    const removeImage = (index, e) => {
        e.stopPropagation() // Ngăn việc click nhầm mở hộp thoại upload
        const newImages = [...images]
        newImages[index] = null
        setImages(newImages)
    }

    // Lấy tọa độ hiện tại (Mô phỏng chức năng lấy vị trí)
    const handleGetCurrentLocation = () => {
        alert("Hệ thống sẽ xin quyền truy cập vị trí trình duyệt và điền Lat/Lng vào ô bên dưới.")
        setValue('lat', 16.060000)
        setValue('lng', 108.220000)
    }

    const onSubmit = (data) => {
        // Ép kiểu array hình ảnh để gửi lên server (loại bỏ các slot null)
        const validImages = images.filter(img => img !== null)
        const finalData = { ...data, images: validImages }
        console.log("Dữ liệu Form gửi lên:", finalData)
        alert("Kiểm tra console để xem cấu trúc dữ liệu!")
    }

    // Input Style tái sử dụng chung
    const inputStyle = "w-full px-4 py-2.5 bg-white/60 border border-[#E0F2F1] rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md focus:ring-2 focus:ring-[#004D40]/20 outline-none text-sm font-bold text-[#004D40] placeholder-[#004D40]/40 transition-all"

    return (
        <div className="max-w-6xl mx-auto space-y-6 font-jakarta pb-10">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl font-cormorant font-bold text-[#004D40]"
                    >
                        Thêm Dịch Vụ Mới
                    </motion.h1>
                    <p className="text-[#004D40]/60 mt-1 font-medium text-sm">Điền thông tin và thả ghim vị trí để đăng tải lên nền tảng.</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit(onSubmit)}
                    className="flex items-center gap-2 bg-[#004D40] hover:bg-[#00332A] text-white px-6 py-2.5 rounded-tr-[20px] rounded-bl-[20px] rounded-tl-md rounded-br-md font-bold transition-colors shadow-lg shadow-[#004D40]/20"
                >
                    <Save size={20} /> Lưu & Gửi duyệt
                </motion.button>
            </div>

            <form className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* CỘT TRÁI (Chiếm 7/12) */}
                <div className="lg:col-span-7 space-y-6">

                    {/* Thông tin chung */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/80 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60"
                    >
                        <h2 className="text-xl font-cormorant font-bold text-[#004D40] border-b border-[#004D40]/10 pb-3 mb-5">Thông tin chung</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-[#004D40] mb-1.5">Tên dịch vụ <span className="text-[#FFAB40]">*</span></label>
                                <input
                                    {...register('name', { required: true })}
                                    type="text"
                                    placeholder="VD: Khách sạn Mường Thanh, Quán nướng Hàn Quốc..."
                                    className={inputStyle}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-[#004D40] mb-1.5">Loại hình <span className="text-[#FFAB40]">*</span></label>
                                    <select
                                        {...register('type')}
                                        className={inputStyle}
                                    >
                                        <option value="HOTEL">Lưu trú (Khách sạn)</option>
                                        <option value="RESTAURANT">Ẩm thực (Nhà hàng)</option>
                                        <option value="ACTIVITY">Trải nghiệm (Tour)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#004D40] mb-1.5">{getPriceLabel()} (VNĐ) <span className="text-[#FFAB40]">*</span></label>
                                    <input
                                        {...register('pricePerUnit', { required: true })}
                                        type="number"
                                        placeholder="0"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#004D40] mb-1.5">Mô tả chi tiết <span className="text-[#FFAB40]">*</span></label>
                                <textarea
                                    {...register('description')}
                                    rows="4"
                                    placeholder="Mô tả điểm nổi bật, dịch vụ cung cấp..."
                                    className={`${inputStyle} resize-none`}
                                ></textarea>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bản đồ & Vị trí */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60"
                    >
                        <div className="flex justify-between items-center border-b border-[#004D40]/10 pb-3 mb-5">
                            <h2 className="text-xl font-cormorant font-bold text-[#004D40]">Vị trí trên bản đồ</h2>
                            <button type="button" onClick={handleGetCurrentLocation} className="text-sm text-[#FFAB40] flex items-center gap-1 hover:text-[#e09635] font-bold transition-colors">
                                <Navigation size={16} /> Lấy vị trí hiện tại
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-[#004D40] mb-1.5">Địa chỉ cụ thể <span className="text-[#FFAB40]">*</span></label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#004D40]/40" size={20} />
                                    <input
                                        {...register('address', { required: true })}
                                        type="text"
                                        placeholder="VD: 123 Nguyễn Văn Linh, Hải Châu, Đà Nẵng"
                                        className={`${inputStyle} pl-12`}
                                    />
                                </div>
                            </div>

                            {/* MOCKUP BẢN ĐỒ */}
                            <div className="w-full h-64 bg-[#E0F2F1]/30 border-2 border-[#004D40]/20 border-dashed rounded-tr-[24px] rounded-bl-[24px] rounded-tl-xl rounded-br-xl flex flex-col items-center justify-center relative overflow-hidden group">
                                <MapIcon size={40} className="text-[#004D40]/30 mb-2" />
                                <p className="text-sm text-[#004D40] font-bold">Khu vực hiển thị Bản đồ (Map API)</p>
                                <p className="text-xs text-[#004D40]/60 font-medium mt-1">Click để thả ghim vị trí dịch vụ của bạn</p>
                                <button type="button" className="mt-4 px-4 py-1.5 bg-white border border-[#E0F2F1] shadow-sm rounded-tr-lg rounded-bl-lg rounded-tl-sm rounded-br-sm text-xs font-bold text-[#004D40] group-hover:border-[#FFAB40] group-hover:text-[#FFAB40] transition-colors">
                                    Mô phỏng thả ghim
                                </button>
                            </div>

                            {/* Tọa độ hiển thị */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#004D40]/70 mb-1.5">Kinh độ (Longitude)</label>
                                    <input {...register('lng')} type="text" readOnly className="w-full px-3 py-2 bg-black/5 border border-[#E0F2F1] rounded-md text-sm text-[#004D40] font-medium outline-none cursor-not-allowed" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#004D40]/70 mb-1.5">Vĩ độ (Latitude)</label>
                                    <input {...register('lat')} type="text" readOnly className="w-full px-3 py-2 bg-black/5 border border-[#E0F2F1] rounded-md text-sm text-[#004D40] font-medium outline-none cursor-not-allowed" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* CỘT PHẢI (Chiếm 5/12) */}
                <div className="lg:col-span-5 space-y-6">

                    {/* Box Upload 4 Hình ảnh */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/80 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60"
                    >
                        <div className="flex justify-between items-center border-b border-[#004D40]/10 pb-3 mb-5">
                            <h2 className="text-xl font-cormorant font-bold text-[#004D40]">Album Hình ảnh</h2>
                            <span className="text-xs font-bold bg-[#E0F2F1] text-[#004D40] px-3 py-1 rounded-full">Tối đa 4 ảnh</span>
                        </div>

                        {/* Input file ẩn */}
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                        />

                        {/* Grid 4 Ảnh (2x2) */}
                        <div className="grid grid-cols-2 gap-4">
                            {images.map((imgSrc, index) => (
                                <div
                                    key={index}
                                    onClick={() => !imgSrc && triggerFileInput(index)}
                                    className={`relative aspect-square rounded-tr-[24px] rounded-bl-[24px] rounded-tl-xl rounded-br-xl border-2 overflow-hidden flex flex-col items-center justify-center transition-all ${imgSrc ? 'border-transparent shadow-sm' : 'border-dashed border-[#004D40]/20 bg-white/50 hover:bg-[#E0F2F1]/50 hover:border-[#FFAB40] cursor-pointer'
                                        }`}
                                >
                                    {imgSrc ? (
                                        <>
                                            <img src={imgSrc} alt={`upload-${index}`} className="w-full h-full object-cover" />
                                            {/* Nút xóa ảnh */}
                                            <button
                                                type="button"
                                                onClick={(e) => removeImage(index, e)}
                                                className="absolute top-2 right-2 bg-white/90 hover:bg-red-500 hover:text-white p-1.5 rounded-full text-[#004D40] transition-colors shadow-sm"
                                            >
                                                <X size={14} strokeWidth={3} />
                                            </button>
                                            {/* Đánh dấu ảnh bìa cho slot đầu tiên */}
                                            {index === 0 && (
                                                <div className="absolute bottom-0 left-0 right-0 bg-[#004D40]/80 backdrop-blur-sm text-[#FFAB40] text-[10px] text-center py-1.5 font-bold uppercase tracking-widest">
                                                    ẢNH BÌA
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <UploadCloud className="text-[#004D40]/30 mb-2" size={28} />
                                            <span className="text-xs text-[#004D40]/60 font-bold">Tải ảnh {index + 1}</span>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Box Tiện ích */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/80 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60"
                    >
                        <h2 className="text-xl font-cormorant font-bold text-[#004D40] border-b border-[#004D40]/10 pb-3 mb-5">Tiện ích cung cấp</h2>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                            {['Wifi miễn phí', 'Hồ bơi ngoài trời', 'Bãi đậu xe', 'Bữa sáng Buffet', 'View biển', 'Spa & Massage', 'Đưa đón sân bay', 'Lễ tân 24/7'].map((feature, i) => (
                                <label key={i} className="flex items-start gap-2.5 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        value={feature}
                                        {...register('features')}
                                        className="w-4 h-4 mt-0.5 text-[#004D40] border-[#E0F2F1] rounded focus:ring-[#004D40] cursor-pointer"
                                    />
                                    <span className="text-sm font-bold text-[#004D40]/80 group-hover:text-[#004D40] transition-colors">{feature}</span>
                                </label>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </form>
        </div>
    )
}

export default AddService