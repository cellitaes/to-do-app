import { Express } from 'express';

import HttpError from '../models/httpError';

export const routeNotFoundMiddleware = (app: Express) => {
  app.use(() => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });
};
