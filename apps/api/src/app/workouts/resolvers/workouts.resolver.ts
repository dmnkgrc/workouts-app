import { Resolver, Args, Query, Int } from '@nestjs/graphql';
import type { WorkoutCategory } from '@workouts-app/common';

import { WorkoutsService } from '../workouts.service';
import { Workout } from '../models/workout.model';
import { Workouts, WorkoutsArgs } from '../models/workouts.model';

@Resolver('Workout')
export class WorkoutsResolver {
  constructor(private workoutsService: WorkoutsService) {}

  @Query((returns) => Workout, { nullable: true })
  async getWorkout(@Args('id', { type: () => Int }) id: number) {
    return this.workoutsService.findOneById(id);
  }

  @Query((returns) => Workouts)
  async getWorkouts(
    @Args('variables', { nullable: true, type: () => WorkoutsArgs })
    variables?: WorkoutsArgs,
  ) {
    return this.workoutsService.findAll({
      ...variables,
      categories: variables.categories
        ? // definitely not the best solution, but I spent a lot of time on this
          ((variables.categories as unknown) as WorkoutCategory[])
        : undefined,
    });
  }
}
