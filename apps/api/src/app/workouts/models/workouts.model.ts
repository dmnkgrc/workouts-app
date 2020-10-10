import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IPaginatedWorkouts } from '@workouts-app/common';

import { WorkoutCategoryScalar } from '../../graphql/scalars/workout-category';
import { Workout } from './workout.model';

@InputType()
export class WorkoutsArgs {
  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  page?: number;

  @Field({ nullable: true })
  startMonth?: string;

  @Field(type => [WorkoutCategoryScalar], { nullable: true })
  categories?: WorkoutCategoryScalar[];
}

@ObjectType()
export class Workouts implements IPaginatedWorkouts {
  @Field(type => [Workout])
  workouts: Workout[];

  @Field()
  total: number;

  @Field({ nullable: true })
  nextPage?: number;

  @Field({ nullable: true })
  previousPage?: number;

  @Field()
  totalPages: number;

  @Field()
  page: number;
}
