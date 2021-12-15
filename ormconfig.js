require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const options = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: process.env.TYPEORM_PORT,
  logging: ['query', 'error'],
  logger: 'advanced-console',
  entities: ['src/**/*.entity.ts'],
  options: {
    encrypt: false,
    enableArithAbort: false,
  },
  synchronize: false,
};

// Because tedious always use an env var rather than the above config and there
// is bug with the mssql driver that cannot interpret the port to type number
// Thus need to delete those variables
for (const key of Object.keys(process.env)) {
  if (key.startsWith('TYPEORM')) {
    delete process.env[key];
  }
}

module.exports = [
  {
    name: 'default',
    migrations: ['scripts/migrations/*.ts'],
    cli: {
      migrationsDir: 'scripts/migrations',
    },
    ...options,
  },
];
