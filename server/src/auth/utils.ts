import { sign, verify } from 'jsonwebtoken';
import { Response, Request } from 'express';
import { skip } from 'graphql-resolvers';
import User from 'src/modules/user';
import { MyContext } from 'src/MyContext';

export const createAccessToken = (user: User) =>
  sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
  });

export const createRefreshToken = (user: User) =>
  sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  });

export const verifyAccessToken = (token: string) => verify(token, process.env.ACCESS_TOKEN_SECRET!);
export const verifyRefreshToken = (token: string) => verify(token, process.env.REFRESH_TOKEN_SECRET!);

export const sendRefreshToken = (res: Response, token: string) =>
  res.cookie('jid', token, { httpOnly: true, path: '/refresh_token' });

export const tradeTokenForUser = (req: Request) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return null;
  }
  try {
    const token = authorization.split(' ')[1];
    const payload = verifyAccessToken(token) as IPayload;
    return { id: payload.userId };
  } catch (err) {
    return null;
  }
};

export const isAuthenticated = (_: any, __: any, { user } : MyContext) => user ? skip : new Error('Not authenticated')

interface IPayload {
  userId: number;
}
