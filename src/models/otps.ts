import { Schema, model } from 'mongoose';
import { IOtp } from '../types/types';

const otpSchema: Schema<IOtp> = new Schema<IOtp>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    otp: { type: Number, minlength: 6, maxlength: 6, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Otp = model<IOtp>('Otps', otpSchema);

export default Otp;
