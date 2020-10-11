import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import databaseConfig from './config/database';
import { join } from 'path';
import { WorkoutsModule } from './workouts/workouts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig as TypeOrmModuleOptions),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/api/src/app/schema.gql'),
    }),
    WorkoutsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
