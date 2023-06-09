import { Schema, model } from 'mongoose';
import { IUser } from '../types/types';

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    firstName: { type: String, maxLength: 255 },
    lastName: { type: String, maxLength: 255 },
    email: { type: String, maxLength: 255, required: true, unique: true },
    password: { type: String, maxLength: 255 },
    picture: { type: String, maxLength: 255 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = model<IUser>('Users', userSchema);

export default User;
