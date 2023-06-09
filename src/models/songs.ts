import { Schema, model } from 'mongoose';
import { ISong } from '../types/types';

const songSchema: Schema<ISong> = new Schema<ISong>(
  {
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        required: true,
      },
    ],
    title: { type: String, maxLength: 255, required: true },
    desc: { type: String, maxLength: 255, required: true },
    author: { type: String, maxLength: 255 },
    thumbnail: { type: String, maxLength: 255 },
    audio: { type: String, maxLength: 255, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Song = model<ISong>('Songs', songSchema);

export default Song;
