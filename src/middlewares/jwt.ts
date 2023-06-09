import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/users';
import { IUser } from '../types/types';

const generateJWTToken = (user: IUser): string => {
  const token: string = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN as string,
    }
  );

  return token;
};

const verifyJWTToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Authorization token is missing!',
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as
      | { email: string }
      | undefined;

    if (!decodedToken || !decodedToken.email) {
      return res.status(400).json({
        success: false,
        message: 'Invalid authorization token!',
      });
    }

    const user = (await User.findOne({
      email: decodedToken.email,
      isActive: true,
    })) as IUser;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User is missing!',
      });
    }

    req.user = user;

    return next();
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: String(error),
    });
  }
};

export { generateJWTToken, verifyJWTToken };
