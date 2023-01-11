import { env } from 'process';

export const jwtConstants = {
  secret: String(env.JWT_SECRET_KEY),
};
