import * as dotenv from 'dotenv';
import { App } from './main/app';

dotenv.config();

const app = new App();

app.run();
