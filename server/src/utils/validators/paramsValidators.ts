import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../functions/response';
import {
  ID_PARAM_IS_REQUIRED,
  ID_PARAM_MUST_BE_VALID_NUMBER,
} from '../../constants/messages';

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!id) {
    return sendResponse({ res, status: 400, message: ID_PARAM_IS_REQUIRED });
  }

  if (isNaN(+id)) {
    return sendResponse({
      res,
      status: 400,
      message: ID_PARAM_MUST_BE_VALID_NUMBER,
    });
  }

  next();
};
