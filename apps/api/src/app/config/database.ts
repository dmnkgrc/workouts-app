import { config } from 'dotenv';

import { Workout } from '../entities/workout.entity';

config();

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,

  entities: [Workout],
  seeds: ['src/seeds/**/*{.ts,.js}'],
  factories: ['src/factories/**/*{.ts,.js}'],

  migrationsTableName: 'migration',

  migrations: ['src/migration/*.ts'],
  synchronize: true,

  cli: {
    migrationsDir: 'src/migration',
  },

  ssl: false,
};
