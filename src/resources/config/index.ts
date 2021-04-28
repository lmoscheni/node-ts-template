// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => ({
  port: process.env.PORT,
  basePath: process.env.BASE_PATH,
  env: process.env.NODE_ENV
});
