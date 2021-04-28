# Development & Start up
First at all, you need a `.env` file to run this project, you can use the file example for dev located on `src/resources/config/env/development.env`, to do this you need copy this file into root directory with name `.env`.
You can do this running the next command:
```
cp src/resources/config/env/development.env ./.env
```

## Running server for development
To run the app in development mode, you need tu run
```
npm run server:dev
```
In this mode you have hot-reloading with nodemon.

## Running server as production mode
To run the app in development mode, you need tu run
```
npm start
```

## Running tests
```
npm test
```

## Running tests with coverage
```
npm run test:coverage
```