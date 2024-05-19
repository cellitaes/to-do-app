import { NextFunction, Response, Request, Express } from 'express';
import HttpError from '../models/httpError';
import { UNKNOWN_ERROR } from '../constants/messages';

export const errorMiddleware = (app: Express) => {
  app.use((error: HttpError, _: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({
      ok: false,
      message: error.message || UNKNOWN_ERROR,
    });
  });
};
