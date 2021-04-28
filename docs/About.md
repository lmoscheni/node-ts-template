# node-ts-template
This repository is an template repository to build new express projects whit a lot of config out of the box.

## Things out of the box
- TypeScript
- ESLint & Prettier
- Jest
- Nodemon
- Winston, Morgan and a Custom Logger builded from Winston.
- API Error Handler
- Request Context (logger related to request by id) and Request Id for more trazability.
- Code organization by modules
- Code implemented with classes and manual and basic Dependency Injection (if you want can replace this by [inversify](https://inversify.io/))
- Github Actions: Test & Coverage on push and PRs to master.
- dotenv files are supported by default.
- PM2 (PRODUCTION PROCESS MANAGER FOR NODE.JS) to producion enviroments.