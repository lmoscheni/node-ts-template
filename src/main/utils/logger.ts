/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request } from 'express';
import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger
} from 'winston';

import config from '../../resources/config';

const { combine, timestamp, label, printf } = format;

const customFormat = printf(
  ({ level, message, label, timestamp, requestId }) => {
    return `${timestamp} ${requestId} ${level.toUpperCase()} ${
      label || ''
    }: ${message}`;
  }
);

interface LoggerConfig {
  className?: string;
  req?: Request;
}

export default class Logger {
  private readonly instance: WinstonLogger;
  private request?: Request;
  private config = config();

  constructor(loggerConfig: LoggerConfig) {
    this.request = loggerConfig.req;

    const loggerTransports: any = [
      new transports.File({ filename: 'combined.log' })
    ];

    if (this.config.env === 'development') {
      loggerTransports.push(new transports.Console());
    }
    this.instance = createLogger({
      level: 'info',
      // format: format.logstash(),
      format: combine(
        timestamp(),
        label({ label: loggerConfig.className }),
        customFormat
      ),
      defaultMeta: { service: 'user-service' },
      transports: loggerTransports
    });
  }

  info(message: string, data?: any): void {
    this.instance.info(message, data);
  }
  debug(message: string, data?: any): void {
    this.instance.debug(message, data);
  }
  warn(message: string, data?: any): void {
    this.instance.warn(message, data);
  }
  error(message: string, data?: any): void {
    this.instance.warn(message, data);
  }
}
