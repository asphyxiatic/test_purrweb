import * as dotenv from 'dotenv';
import { cleanEnv, str } from 'envalid';

dotenv.config();

export const config = cleanEnv(process.env, {
  DB_URL: str(),
});
