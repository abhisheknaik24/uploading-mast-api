import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  picture?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOtp extends Document {
  user: Types.ObjectId;
  otp: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory extends Document {
  category: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISong extends Document {
  categories: Types.ObjectId[];
  title: string;
  desc: string;
  author?: string;
  thumbnail?: string;
  audio: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILibrary extends Document {
  user: Types.ObjectId;
  song: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}
