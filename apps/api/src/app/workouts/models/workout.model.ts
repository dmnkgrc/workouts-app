import { WorkoutCategoryScalar } from './../../graphql/scalars/workout-category';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { IWorkout, WorkoutCategory } from '@workouts-app/common';

@ObjectType()
export class Workout implements IWorkout {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  startDate: string;

  @Field()
  image: string;

  @Field((type) => WorkoutCategoryScalar)
  category: WorkoutCategory;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field()
  extra: string;
}
