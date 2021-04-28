/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Router, Request } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import chalk from 'chalk';

import config from '../resources/config';

import modules from './modules';

import generateRequestId from './middlewares/generateRequestId';
import generateContext from './middlewares/generateContext';
import handleError from './middlewares/errorHandler';

import Logger from './utils/logger';

// setting morgan to read request ID
morgan.token('id', function getId(req: Request) {
  return req.id;
});

export class App {
  private expressApplication: Application;
  private router: Router;
  private config: any;
  private morganFormat: string;
  private readonly log = new Logger();

  constructor() {
    this.expressApplication = express();
    this.router = express.Router();
    this.config = config();
    this.morganFormat =
      ':date[iso] [:id] [:method] [:status] [:response-time] :url';

    this.configExpress();
  }

  private configExpress(): void {
    this.expressApplication.use(cors());
    this.expressApplication.use(helmet());
    this.expressApplication.use(express.json());
    this.expressApplication.use(express.urlencoded({ extended: true }));
    this.expressApplication.use(morgan(this.morganFormat));
    this.expressApplication.use(generateRequestId);
    this.expressApplication.use(generateContext);

    modules.forEach((module) => new module(this.router));

    this.expressApplication.use('/api', this.router);
    this.expressApplication.use(handleError);
  }

  private showServerConnection(): void {
    const message = `${chalk.bgGreen.black(
      `Running app on port ${this.config.port}`
    )} ${chalk.green.bold(
      `http://${this.config.basePath}:${this.config.port}/`
    )}`;
    this.log.info(message);
  }

  private showHealthCheckURL(): void {
    this.log.info(
      chalk.green(
        `Check your app health on http://${this.config.basePath}:${this.config.port}/api/health-check`
      )
    );
  }

  public run(): void {
    this.expressApplication.listen(this.config.port, () => {
      this.showServerConnection();
      this.showHealthCheckURL();
    });
  }
}
