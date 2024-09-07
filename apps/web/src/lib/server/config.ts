import { env } from '$env/dynamic/private';

export type ServerConfig = {
  env: 'development' | 'production';
  session: {
    cookie: string;
    domain: string;
    max_age: number;
  };
};

export default {
  env: env.NODE_ENV == 'production' ? 'production' : 'development',
  session: {
    cookie: env.SESSION_COOKIE ?? 'sessionid',
    domain: env.SESSION_DOMAIN ?? 'localhost',
    max_age: Number(env.SESSION_MAX_AGE ?? 1800 /* 30 mins */),
  },
} satisfies ServerConfig;
