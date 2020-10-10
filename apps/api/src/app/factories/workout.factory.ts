import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { format } from 'date-fns';
import { WorkoutCategory } from '@workouts-app/common';

import { Workout } from '../entities/workout.entity';
import { readFileSync } from 'fs';
import { join } from 'path';

const extraPollution = readFileSync(
  join(__dirname, '..', '..', 'column-pollution.txt'),
  {
    encoding: 'utf8',
    flag: 'r',
  },
);

define(Workout, (faker: typeof Faker) => {
  const name = faker.random.words(3);
  const description = faker.lorem.paragraph();
  const category = faker.random.arrayElement([
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
  ]) as WorkoutCategory;
  const startDate = faker.date.future(1);
  const image = faker.image.sports(970, 546);
  const workout = new Workout();
  workout.name = name;
  workout.description = description;
  workout.category = category;
  workout.startDate = startDate.toString();
  workout.image = image;
  workout.extra = extraPollution;

  return workout;
});
