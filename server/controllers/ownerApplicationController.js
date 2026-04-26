import OwnerApplication from '../models/OwnerApplication.js';
import User from '../models/User.js';
import clerkClient from '../utils/clerkClient.js';

// @desc    Submit owner application
// @route   POST /api/owner-applications
// @access  Private
export const submitApplication = async (req, res) => {
  try {
    const { businessName, businessAddress, phoneNumber, bankAccount, documents } = req.body;

    // Check if user already has a pending/approved application
    const existingApp = await OwnerApplication.findOne({
      userId: req.user._id,
      status: { $in: ['PENDING', 'APPROVED'] },
    });

    if (existingApp) {
      return res.status(400).json({
        success: false,
        message: 'You already have a pending or approved application',
      });
    }

    const application = await OwnerApplication.create({
      userId: req.user._id,
      businessName,
      businessAddress,
      phoneNumber,
      bankAccount,
      documents,
    });

    res.status(201).json({
      success: true,
      data: application,
      message: 'Application submitted successfully',
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get all applications (Admin only)
// @route   GET /api/owner-applications
// @access  Private/Admin
export const getAllApplications = async (req, res) => {
  try {
    const { status } = req.query;
    
    const filter = status ? { status } : {};
    
    const applications = await OwnerApplication.find(filter)
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Review application (Admin only)
// @route   PATCH /api/owner-applications/:id
// @access  Private/Admin
export const reviewApplication = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const application = await OwnerApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    application.status = status;
    application.adminNotes = adminNotes;
    application.reviewedAt = Date.now();

    await application.save();

    // If approved, update user role to OWNER
    if (status === 'APPROVED') {
      // 1. Cập nhật Role trong MongoDB của bạn
      const updatedUser = await User.findByIdAndUpdate(
        application.userId, 
        { role: 'OWNER' },
        { new: true } // Trả về user sau khi đã update
      );

      // 2. Cập nhật Metadata sang Clerk để Frontend nhận diện ngay lập tức
      if (updatedUser && updatedUser.clerkId) {
        await clerkClient.users.updateUserMetadata(updatedUser.clerkId, {
          publicMetadata: {
            role: 'OWNER'
          }
        });
        console.log(`🚀 Đã đồng bộ role OWNER cho user: ${updatedUser.email}`);
      }
    }

    res.json({
      success: true,
      data: application,
      message: `Application ${status.toLowerCase()} successfully`,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get my application status
// @route   GET /api/owner-applications/my-status
// @access  Private
export const getMyApplicationStatus = async (req, res) => {
  try {
    const application = await OwnerApplication.findOne({ 
      userId: req.user._id 
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};