import { env } from '$env/dynamic/private';

type DBConfigSQLite3 = {
  type: 'sqlite3';
  filename: string;
};

type DBConfig = DBConfigSQLite3;

export type ServerConfig = {
  database: DBConfig;
  env: 'development' | 'production';
  session: {
    cookie: string;
    domain: string;
    maxAge: number;
  };
};

function configSqlite3(): DBConfigSQLite3 {
  const filename = env.DB_FILE ?? ':memory:';
  return { type: 'sqlite3', filename };
}

function configDatabase(): DBConfig {
  return configSqlite3();
}

export default {
  database: configDatabase(),
  env: env.NODE_ENV == 'production' ? 'production' : 'development',
  session: {
    cookie: env.SESSION_COOKIE ?? 'sessionid',
    domain: env.SESSION_DOMAIN ?? 'localhost',
    maxAge: Number(env.SESSION_MAX_AGE ?? 1800 /* 30 mins */),
  },
} satisfies ServerConfig;
