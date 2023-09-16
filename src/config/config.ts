import * as dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

dotenv.config();

export const config = cleanEnv(process.env, {
  APP_PORT: num({ default: 3000 }),
  DB_URL: str(),
  JWT_ACCESS_SECRET_KEY: str(),
});
