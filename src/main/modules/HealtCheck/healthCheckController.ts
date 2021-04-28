import { Request, Response, Router } from 'express';

import HealthCheckFacade from './healthCheckFacade';

export default class HealthCheckController {
  private facade: HealthCheckFacade;

  constructor(router: Router) {
    this.facade = new HealthCheckFacade();
    this.configureRoutes(router);
  }

  private configureRoutes(router: Router) {
    const controllerRouter = Router();
    controllerRouter.get('/health-check', this.healthCheck.bind(this));

    router.use(controllerRouter);
  }

  healthCheck(req: Request, res: Response): void {
    res.send(this.facade.healthCheck());
  }
}
