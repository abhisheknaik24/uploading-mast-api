import { Schema, model } from 'mongoose';
import { ICategory } from '../types/types';

const categorySchema: Schema<ICategory> = new Schema<ICategory>(
  {
    category: { type: String, maxLength: 255, required: true, unique: true },
    name: { type: String, maxLength: 255, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category = model<ICategory>('Categories', categorySchema);

export default Category;
