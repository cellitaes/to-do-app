import { Response } from 'express';
import HttpStatus from '../../enums/httpStatus.enum';
import { SUCCESS } from '../../constants/messages';

type SendResponseParams = {
  res: Response;
  status?: HttpStatus;
  message?: string;
  payload?: Record<string, any>;
};

export const sendResponse = ({
  res,
  status = 200,
  message = SUCCESS,
  payload = {},
}: SendResponseParams): void => {
  res.status(status).json({ msg: message, data: payload });
};
