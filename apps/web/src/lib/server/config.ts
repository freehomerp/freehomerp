import { env } from '$env/dynamic/private';

type DBConfigSQLite3 = {
  type: 'sqlite3';
  filename: string;
};

type DBConfigPostgres = {
  type: 'postgres';
  filename?: never;
//     host: string;
//     port: number;
//     username: string;
//     password: string;
//     name: string;
};

type DBConfig = DBConfigSQLite3 | DBConfigPostgres;

type ServerConfig = {
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
  // switch (env.DB_TYPE) {
  //   case 'sqlite3':
  //     return
  // }


  // let type = env.NODE_ENV == 'production' ? 'postgres' : 'sqlite3';
  // if (env.DB_TYPE === 'postgres' || env.DB_TYPE === 'sqlite3') {
  //   type = env.DB_TYPE;
  // }

  // switch (type) {
  //   case 'sqlite3':
  //     return { type: 'sqlite3', filename: ':memory:' };
  // }
  // console.log(type);
  // const filename = ':memory:';
  // switch (env.DB_TYPE) {
  //   case 'postgres':
  //     break;
  // }
  // return { type, filename };
//   return { type: 'sqlite3', filename: ':memory:' };
}

console.log(configDatabase());

export default {
  database: configDatabase(),
  // database: {
    // type: env.NODE_ENV == 'sqlite3' ?
//     host: env.DB_HOST ?? 'localhost',
//     port: Number(env.CONFIG_DB_PORT ?? 5432),
//     username: env.DB_USERNAME,
//     password: env.DB_PASSWORD,
//     name: env.DB_NAME ?? 'freehomerp',
  // },
  env: env.NODE_ENV == 'production' ? 'production' : 'development',
  session: {
    cookie: env.SESSION_COOKIE ?? 'sessionid',
    domain: env.SESSION_DOMAIN ?? 'localhost',
    maxAge: Number(env.SESSION_MAX_AGE ?? 1800 /* 30 mins */),
  },
} satisfies ServerConfig;
