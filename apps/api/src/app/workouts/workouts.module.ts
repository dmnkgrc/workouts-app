import { WorkoutCategoryScalar } from './../graphql/scalars/workout-category';
import { WorkoutsService } from './workouts.service';
import { WorkoutsResolver } from './resolvers/workouts.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from '../entities/workout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout])],
  exports: [TypeOrmModule],
  providers: [WorkoutsService, WorkoutsResolver, WorkoutCategoryScalar],
})
export class WorkoutsModule {}
