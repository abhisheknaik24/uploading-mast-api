import { Request } from 'express';
import { IUser } from 'types';

declare module 'express' {
  export interface Request {
    user?: IUser;
  }
}
