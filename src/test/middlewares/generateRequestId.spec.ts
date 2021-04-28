import { Request, Response } from 'express';
import generateRequestId from '../../main/middlewares/generateRequestId';

describe('generateRequestId Test Suit', () => {
  test('Recive a request and adding id', () => {
    const req = {} as Request;
    const res = {} as Response;

    generateRequestId(req, res, (error: unknown) => {
      expect(error).toBeFalsy();
      expect(req.id).toBeTruthy();
    });
  });
});
