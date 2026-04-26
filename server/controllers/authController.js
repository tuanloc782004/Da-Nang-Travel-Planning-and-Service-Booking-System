import User from '../models/User.js';

export const syncUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user, 
      message: 'Người dùng đã được đồng bộ thành công',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};