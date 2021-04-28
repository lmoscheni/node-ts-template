import HealthCheckFacade from '../../../main/modules/HealtCheck/healthCheckFacade';

import pkg from '../../../../package.json';

describe('HealthCheckFacade Test Suit', () => {
  test('HealthCheckFacade::healthCheck', () => {
    const facade = new HealthCheckFacade();
    expect(facade.healthCheck()).toEqual({
      status: 'UP',
      appName: pkg.name,
      version: pkg.version,
      author: pkg.author
    });
  });
});
