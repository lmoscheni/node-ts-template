export default interface HealthCheckResponse {
  status: 'UP' | 'DOWN';
  appName: string;
  version: string;
  author: string;
  [key: string]: string;
}
