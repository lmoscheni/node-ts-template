/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request } from 'express';
import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger
} from 'winston';
import util from 'util';

import config from '../../resources/config';

const { combine, timestamp, printf } = format;

const customFormat = printf(({ level, message, timestamp, requestId }) => {
  return `${timestamp} [${
    requestId || 'requestId'
  }] ${level.toUpperCase()}: ${message}`;
});

export default class Logger {
  private readonly instance: WinstonLogger;
  private request?: Request;
  private config = config();

  constructor(req?: Request) {
    this.request = req;
    this.instance = this.createLogger();

    if (this.request?.id) {
      this.instance = this.instance.child({
        requestId: this.request.id
      });
    }
  }

  private createLogger(): WinstonLogger {
    const loggerTransports: any = [
      new transports.File({ filename: 'combined.log' })
    ];

    if (this.config.env === 'development') {
      loggerTransports.push(new transports.Console());
    }

    return createLogger({
      level: 'info',
      format: combine(timestamp(), customFormat),
      transports: loggerTransports
    });
  }

  info(message: string, data?: any): void {
    this.instance.info(
      `${message}${data ? ' | ' : ''} ${data ? util.inspect(data) : ''}`
    );
  }
  debug(message: string, data?: any): void {
    this.instance.debug(
      `${message}${data ? ' | ' : ''}${data ? util.inspect(data) : ''}`
    );
  }
  warn(message: string, data?: any): void {
    this.instance.warn(
      `${message}${data ? ' | ' : ''}${data ? util.inspect(data) : ''}`
    );
  }
  error(message: string, data?: any): void {
    this.instance.warn(
      `${message}${data ? ' | ' : ''}${data ? util.inspect(data) : ''}`
    );
  }
}
