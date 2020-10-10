import { Injectable } from '@nestjs/common';
import { IWorkout, WorkoutCategory } from '@workouts-app/common';
import { add } from 'date-fns';
import { Workout } from '../entities/workout.entity';
import { Repository, In, Between, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Workouts } from './models/workouts.model';

interface FindAllOptions {
  page?: number;
  limit?: number;
  categories?: WorkoutCategory[];
  startMonth?: string;
}

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private workoutsRepository: Repository<Workout>,
  ) {}

  async findAll({
    page = 1,
    limit = 20,
    categories,
    startMonth,
  }: FindAllOptions = {}): Promise<Workouts> {
    if (page < 0 || limit < 0) {
      return {
        total: 0,
        totalPages: 0,
        page: 1,
        workouts: [],
      };
    }

    let filters = {};
    if (categories?.length > 0) {
      filters = {
        ...filters,
        category: In(categories),
      };
    }
    if (startMonth) {
      const start = new Date(`${startMonth}-01`);
      const end = add(start, { months: 1 });
      filters = {
        ...filters,
        startDate: Between(start, end),
      };
    }

    const options: FindManyOptions<Workout> = {
      skip: page - 1,
      take: limit,
      order: {
        startDate: 'ASC',
      },
      where: {
        ...filters,
      },
    };

    const [workouts, total] = await this.workoutsRepository.findAndCount(
      options,
    );

    const totalPages = Math.ceil(total / limit);

    const nextPage = totalPages === page ? undefined : page + 1;
    const previousPage = page === 1 ? undefined : page - 1;

    return {
      page,
      workouts,
      total,
      totalPages,
      nextPage,
      previousPage,
    };
  }

  findOneById(id: number): Promise<IWorkout> {
    return this.workoutsRepository.findOne(id);
  }
}
