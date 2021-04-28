import { NextFunction, Request, Response } from 'express';

import APIException from './models/APIException';

export default function handleError(
  err: APIException,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  req.context.logger.error('handleError', err);

  const { statusCode, ...others } = err;

  res.status(statusCode).send({ ...others });

  next();
}
