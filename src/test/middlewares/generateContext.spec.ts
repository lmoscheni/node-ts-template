import { Request, Response } from 'express';
import generateContext from '../../main/middlewares/generateContext';

describe('generateContext Test Suit', () => {
  test('Recive a request and adding Context', () => {
    const req = {} as Request;
    const res = {} as Response;

    generateContext(req, res, (error: unknown) => {
      expect(error).toBeFalsy();
      expect(req.context).toBeTruthy();
      expect(req.context.logger).toBeTruthy();
    });
  });
});
