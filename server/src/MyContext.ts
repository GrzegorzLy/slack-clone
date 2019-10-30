import { Request, Response } from 'express';
import User from './modules/user/user.model';
import { IServices } from './services';

export interface MyContext {
  res: Response;
  req: Request;
  user?: User;
  services: IServices;
}
