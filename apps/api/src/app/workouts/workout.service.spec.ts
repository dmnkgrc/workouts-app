import { Test } from '@nestjs/testing';
import { WorkoutCategory } from '@workouts-app/common';

import { WorkoutsService } from './workouts.service';
import { WorkoutsModule } from './workouts.module';
import databaseConfig from '../config/database';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * WorkoutsService
 * For simplicity on this task, we test against the db
 * since we are not modifying it, but ideally this should
 * either use a test db or mocks
 */
describe('WorkoutsService', () => {
  let workoutsService: WorkoutsService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      imports: [
        TypeOrmModule.forRoot(databaseConfig as TypeOrmModuleOptions),
        WorkoutsModule,
      ],
    }).compile();

    workoutsService = moduleRef.get<WorkoutsService>(WorkoutsService);
  });

  describe('findAll', () => {
    it('should return the first page of workouts', async () => {
      const data = await workoutsService.findAll();
      expect(data.workouts.length).toBe(20);
      expect(data.page).toBe(1);
      expect(data.nextPage).toBe(2);
      expect(data.previousPage).toBeUndefined();
    });

    it('should return the specified page of workouts', async () => {
      let data = await workoutsService.findAll({ page: 2 });
      expect(data.workouts.length).toBe(20);
      expect(data.page).toEqual(2);
      expect(data.previousPage).toEqual(1);
      const lastPage = 1000 / 20;
      data = await workoutsService.findAll({ page: lastPage });
      expect(data.page).toEqual(lastPage);
      expect(data.nextPage).toBeUndefined();
      expect(data.previousPage).toEqual(lastPage - 1);
    });

    it('should return the specified number of workouts', async () => {
      const { workouts } = await workoutsService.findAll({ limit: 10 });
      expect(workouts.length).toBe(10);
    });

    it('should return them sorted by startDate (nearest first)', async () => {
      const { workouts } = await workoutsService.findAll({ limit: 10 });
      const isSorted = workouts.every((workout, index, arr) => {
        if (index === 0) {
          return true;
        }
        return (
          new Date(arr[index - 1].startDate) <= new Date(workout.startDate)
        );
      });
      expect(isSorted).toBeTruthy();
    });

    it('should be able to filter by category', async () => {
      const categories = ['c1', 'c4'] as WorkoutCategory[];
      const data = await workoutsService.findAll({ limit: 10, categories });
      const isValid = data.workouts.every(workout => {
        return categories.includes(workout.category);
      });
      expect(isValid).toBeTruthy();
      expect(data.total).toBeLessThan(1000);
    });

    it('should be able to filter by start month', async () => {
      const startMonth = '2020-12';
      const data = await workoutsService.findAll({ limit: 10, startMonth });
      const expectedStart = new Date('2020-12-01');
      const expectedEnd = new Date('2020-12-31');
      const isValid = data.workouts.every(workout => {
        const startDate = new Date(workout.startDate);
        return expectedStart <= startDate && expectedEnd >= startDate;
      });
      expect(isValid).toBeTruthy();
      expect(data.total).toBeLessThan(1000);
    });

    it('should return an empty array if limit or page are invalid', async () => {
      let data = await workoutsService.findAll({ limit: -1 });
      expect(data.workouts.length).toBe(0);
      expect(data.total).toBe(0);
      expect(data.totalPages).toBe(0);
      data = await workoutsService.findAll({ page: -1 });
      expect(data.workouts.length).toBe(0);
      expect(data.total).toBe(0);
      expect(data.totalPages).toBe(0);
    });

    it('should return an empty array if the categories does not contain valid values', async () => {
      const data = await workoutsService.findAll({
        // necessary for TypeScript to allow it
        categories: (['bad'] as unknown) as WorkoutCategory[],
      });
      expect(data.workouts.length).toBe(0);
      expect(data.total).toBe(0);
      expect(data.totalPages).toBe(0);
    });
  });
  describe('findOneById', () => {
    it('should return the right workout', async () => {
      const workout = await workoutsService.findOneById(1);
      expect(workout.id).toBe(1);
    });

    it('should return undefined if no workout was found', async () => {
      const workout = await workoutsService.findOneById(1000000);
      expect(workout).toBeUndefined();
    });
  });
});
