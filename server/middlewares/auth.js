import clerkClient from '../utils/clerkClient.js';
import User from '../models/User.js';

export const verifyClerkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Missing or invalid token format' });
    }

    const token = authHeader.split(' ')[1].trim();

    const decoded = await clerkClient.verifyToken(token);

    const clerkId = decoded.sub;

    // 3. Tìm hoặc tạo User trong MongoDB
    let user = await User.findOne({ clerkId });

    if (!user) {
      // Nếu chưa có user trong DB, lấy thông tin chi tiết từ Clerk để tạo mới
      const clerkUser = await clerkClient.users.getUser(clerkId);
      
      user = await User.create({
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        fullName: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
        role: 'USER', // Mặc định khi mới tạo
      });
      console.log(`✨ Đã tạo user mới trong MongoDB: ${user.email}`);
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Clerk Verification Error:', error.message);
    res.status(401).json({ 
      success: false, 
      message: 'Authentication failed',
      error: error.message 
    });
  }
};