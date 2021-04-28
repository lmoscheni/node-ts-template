/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import chalk from 'chalk';

import config from '../resources/config';

import Logger from './utils/logger';

import modules from './modules';

export class App {
  private expressApplication: Application;
  private router: Router;
  private config: any;
  private morganFormat: string;
  private readonly log = new Logger({});

  constructor() {
    this.expressApplication = express();
    this.router = express.Router();
    this.config = config();
    this.morganFormat = this.config.env === 'development' ? 'dev' : 'combined';

    this.configExpress();
  }

  private configExpress(): void {
    this.expressApplication.use(cors());
    this.expressApplication.use(helmet());
    this.expressApplication.use(express.json());
    this.expressApplication.use(express.urlencoded({ extended: true }));
    this.expressApplication.use(morgan(this.morganFormat));

    modules.forEach((module) => new module(this.router));

    this.expressApplication.use('/api', this.router);
  }

  private showServerConnection(): void {
    this.log.info(
      chalk.bgGreen.black(`Running app on port ${this.config.port}`),
      chalk.green.bold(`http://localhost:${this.config.port}/`)
    );
  }

  private showHealthCheckURL(): void {
    this.log.info(
      chalk.green(
        `Check your app health on http://localhost:${this.config.port}/api/health-check`
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
