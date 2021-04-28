// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express';

declare global {
  namespace Express {
    export interface Request {
      id: string;
      context: RequestContext;
    }
  }
}
// declare namespace Express {
//   export interface Request {
//     id: string;
//     context: RequestContext;
//   }
// }

// declare module 'express-serve-static-core' {
//   interface Request {
//     id: string;
//     context: RequestContext;
//   }
// }
