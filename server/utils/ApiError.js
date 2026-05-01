class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;

        // Nếu lỗi đầu 4 (400, 401, 404) thì là 'fail' (lỗi từ client)
        // Nếu lỗi đầu 5 (500) thì là 'error' (lỗi từ server)
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        // Đánh dấu đây là lỗi do mình chủ động kiểm soát (Operational Error)
        // Phân biệt với các lỗi vặt do crash code (Programming Error)
        this.isOperational = true;

        // Bắt lại dấu vết lỗi (Stack trace) để dễ debug
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;