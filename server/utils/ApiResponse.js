class ApiResponse {
    /**
     * Cấu trúc chuẩn cho một API Response thành công
     * @param {Object} res - Đối tượng response của Express
     * @param {Number} statusCode - Mã trạng thái HTTP (200, 201...)
     * @param {String} message - Thông báo trả về
     * @param {Any} data - Dữ liệu chính
     * @param {Object} extra - Các trường phụ (như pagination: page, total...)
     */
    static send(res, statusCode, message, data = null, extra = {}) {
        const responsePayload = {
            success: true,
            message,
            ...(data !== null && { data }), // Chỉ thêm data nếu có
            ...extra // Rải các field phân trang vào đây
        };

        return res.status(statusCode).json(responsePayload);
    }
}

export default ApiResponse;