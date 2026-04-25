import mongoose from 'mongoose';

const OwnerApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    businessAddress: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    bankAccount: {
      bankName: String,
      accountNumber: String,
      accountHolderName: String,
    },
    documents: [String], // URLs to uploaded documents
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
    adminNotes: String,
    reviewedAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('OwnerApplication', OwnerApplicationSchema);