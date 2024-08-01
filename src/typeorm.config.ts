import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const typeOrmModuleOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  poolSize: parseInt(process.env.DATABASE_CONNECTION_POOL_SIZE, 10) || 100,
  extra: {
    idleTimeoutMillis:
      parseInt(process.env.DATABASE_CONNECTION_IDLE_TIMEOUT_MS, 10) || 12000,
  },
  applicationName: 'zklink-intent-url',
  migrationsRun: false,
  synchronize: false,
  logging: false,
  subscribers: [],
  migrations: ['dist/migrations/*.js'],
};

const typeOrmCliDataSource = new DataSource({
  ...typeOrmModuleOptions,
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['src/migrations/*.ts'],
});

export default typeOrmCliDataSource;
