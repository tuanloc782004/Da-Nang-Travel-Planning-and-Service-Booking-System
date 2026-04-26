import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: [true, 'Clerk ID là bắt buộc'],
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email là bắt buộc'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email không hợp lệ']
    },
    fullName: {
      type: String,
      required: [true, 'Tên người dùng là bắt buộc'],
      trim: true,
    },
    role: {
      type: String,      enum: ['USER', 'OWNER', 'ADMIN'],
      default: 'USER',
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'BLOCKED'],
      default: 'ACTIVE',
    },
    preferences: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;