export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Kiểm tra đăng nhập trước (Dùng 401)
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Vui lòng đăng nhập để tiếp tục' 
      });
    }

    // 2. Kiểm tra quyền (Dùng 403)
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Bạn không có quyền thực hiện hành động này' 
      });
    }

    next();
  };
};