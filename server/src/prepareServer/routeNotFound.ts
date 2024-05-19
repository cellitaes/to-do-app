import { Express } from 'express';

import HttpError from '../models/httpError';
import { ROUTE_NOT_FOUND } from '../constants/messages';
import HttpStatus from '../enums/httpStatus.enum';

export const routeNotFoundMiddleware = (app: Express) => {
  app.use(() => {
    const error = new HttpError(ROUTE_NOT_FOUND, HttpStatus.NOT_FOUND);
    throw error;
  });
};
