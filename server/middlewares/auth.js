import clerkClient from '../utils/clerkClient.js';
import User from '../models/User.js';

export const verifyClerkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    // Verify token with Clerk
    const session = await clerkClient.sessions.verifySession(
      req.headers['x-clerk-session-id'], 
      token
    );

    if (!session) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }

    // Get user from Clerk
    const clerkUser = await clerkClient.users.getUser(session.userId);

    // Find or create user in our DB
    let user = await User.findOne({ clerkId: clerkUser.id });

    if (!user) {
      user = await User.create({
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        fullName: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
      });
    }

    // Check if user is blocked
    if (user.status === 'BLOCKED') {
      return res.status(403).json({ 
        success: false, 
        message: 'Your account has been blocked' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ 
      success: false, 
      message: 'Authentication failed' 
    });
  }
};