/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';

export default class APIException extends Error {
  statusCode: number;
  name: string;
  message: string;
  data: any;
  stack: string;

  constructor(error: Error | any, req: Request, data: any) {
    super();
    this.statusCode = error.statusCode || error.code || error.status || 500;
    this.name = this.constructor.name;
    this.message = error.message || 'Unknown error';
    this.data = {
      ...req.query,
      ...req.body,
      ...data
    };
    this.stack = error.stack || '';
  }
}
