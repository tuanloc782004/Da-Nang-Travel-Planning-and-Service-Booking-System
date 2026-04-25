import User from '../models/User.js';
import clerkClient from '../utils/clerkClient.js';

// @desc    Get current user info
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Sync user from Clerk (create if not exists)
// @route   POST /api/auth/sync
// @access  Public (but requires Clerk token)
export const syncUser = async (req, res) => {
  try {
    const { clerkId } = req.body;

    if (!clerkId) {
      return res.status(400).json({ 
        success: false, 
        message: 'clerkId is required' 
      });
    }

    // Get user from Clerk
    const clerkUser = await clerkClient.users.getUser(clerkId);

    // Check if user exists in our DB
    let user = await User.findOne({ clerkId });

    if (!user) {
      // Create new user
      user = await User.create({
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        fullName: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
      });
    }

    res.status(201).json({
      success: true,
      data: user,
      message: 'User synced successfully',
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};