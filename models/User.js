import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 20,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
