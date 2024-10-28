import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const typeOrmModuleOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || ''),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  poolSize: parseInt(process.env.DATABASE_CONNECTION_POOL_SIZE || '100', 10),
  extra: {
    idleTimeoutMillis: parseInt(
      process.env.DATABASE_CONNECTION_IDLE_TIMEOUT_MS || '12000',
      10,
    ),
  },
  applicationName: 'zklink-intent-url',
  migrationsRun: false,
  synchronize: false,
  logging: false,
  maxQueryExecutionTime: 1500,
  subscribers: [],
  migrations: ['dist/migrations/*.js'],
};

const typeOrmCliDataSource = new DataSource({
  ...typeOrmModuleOptions,
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['src/migrations/*.ts'],
});

export default typeOrmCliDataSource;
