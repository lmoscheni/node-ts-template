import HealthCheckResponse from './models/HealthCheckResponse';

import pkg from '../../../../package.json';

export default class HealthCheckFacade {
  healthCheck(): HealthCheckResponse {
    return {
      status: 'UP',
      appName: pkg.name,
      version: pkg.version,
      author: pkg.author
    };
  }
}
