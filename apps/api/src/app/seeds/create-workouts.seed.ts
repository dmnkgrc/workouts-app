import { Seeder, Factory } from 'typeorm-seeding';
import { Workout } from '../entities/workout.entity';

export default class CreateWorkouts implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Workout)({ roles: [] }).createMany(1000);
  }
}
