/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Document, Model, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { toJSON, paginate } from '../plugins/index';
import { roles } from '../../config/roles';

interface UserDocument extends Document {
  name: string;
  username: string;
  avatar?: string;
  background?: string;
  dob: Date;
  description?: string;
  gender: boolean;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
  playlists: Schema.Types.ObjectId[];

  // Phương thức kiểm tra mật khẩu
  isPasswordMatch(password: string): Promise<boolean>;
}

// Định nghĩa kiểu cho UserModel
interface UserModel extends Model<UserDocument> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<any>;
  isEmailTaken(email: string, excludeUserId?: string): Promise<boolean>;
}

// Định nghĩa schema cho người dùng
const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    avatar: { type: String },
    background: { type: String },
    dob: { type: Date, required: true },
    description: { type: String },
    gender: { type: Boolean, default: false },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true,
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    isEmailVerified: { type: Boolean, default: false },
    playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist', required: false }],
  },
  {
    timestamps: true,
  }
);

// Thêm plugin toJSON và paginate
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (this: Model<UserDocument>, email: string, excludeUserId?: string) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (this: UserDocument, password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
