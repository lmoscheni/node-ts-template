import { NextFunction, Request, Response } from 'express';

import { v4 as uuid } from 'uuid';

export default function generateRequestId(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  req.id = uuid();

  next();
}
