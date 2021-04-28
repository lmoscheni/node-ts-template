import { Router } from 'express';

import HealthCheckController from './healthCheckController';

export default class HealthCheckModule {
  private controller: HealthCheckController;

  constructor(router: Router) {
    this.controller = new HealthCheckController(router);
  }
}
