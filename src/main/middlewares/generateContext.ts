import { NextFunction, Request, Response } from 'express';

import Logger from '../utils/logger';

export default function generateContext(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  req.context = {
    logger: new Logger(req)
  };

  next();
}
