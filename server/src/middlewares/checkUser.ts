import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/functions/response';
import { USER_NOT_AUTHENTICATED } from '../constants/messages';
import { USER } from '../constants/constants';

export const checkUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req.headers[USER];

  if (!user) {
    return sendResponse({ res, status: 401, message: USER_NOT_AUTHENTICATED });
  }

  next();
};
