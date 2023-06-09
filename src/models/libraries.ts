import { Schema, model } from 'mongoose';
import { ILibrary } from '../types/types';

const librarySchema: Schema<ILibrary> = new Schema<ILibrary>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    song: { type: Schema.Types.ObjectId, ref: 'Songs', required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Library = model<ILibrary>('Libraries', librarySchema);

export default Library;
