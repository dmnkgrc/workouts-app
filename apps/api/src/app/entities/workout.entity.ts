import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';
import type { IWorkout, WorkoutCategory } from '@workouts-app/common';

/**
 * Entity Schema for Languages.
 *
 * @class
 */
@Entity({
  name: 'workouts',
})
export class Workout implements IWorkout {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ type: 'varchar' })
  category: WorkoutCategory;
  @Column()
  image: string;
  @Column({
    type: 'timestamp',
  })
  startDate: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
  // Column used for pollution
  @Column()
  extra: string;
}
