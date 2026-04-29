const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Lọc log ra terminal để debug
    console.error(`[❌ ERROR] ${err.statusCode} - ${err.message}`);

    // Định dạng JSON trả về cho Frontend
    const errorResponse = {
        success: false,
        status: err.status,
        message: err.message,
    };

    // Nếu đang ở môi trường dev, trả về cả stack trace để dễ dò lỗi dòng nào
    // Khi deploy thực tế lên production, môi trường sẽ tự giấu stack trace đi
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }

    res.status(err.statusCode).json(errorResponse);
};

export default errorHandler;