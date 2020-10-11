export const categories = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'] as const;

export type WorkoutCategory = typeof categories[number];

// asserts that a string is a category
export const isCategory = (value: string): value is WorkoutCategory => {
  return categories.includes(value as WorkoutCategory);
};

// asserts that a string array is a string of categories
export const isCategoryArray = (
  value: string[] | Readonly<string[]>,
): value is WorkoutCategory[] => {
  return value.every((category) =>
    categories.includes(category as WorkoutCategory),
  );
};

export interface IWorkout {
  id: number;
  name: string;
  description: string;
  category: WorkoutCategory;
  image: string;
  extra: string;
  startDate: string;
  createdAt: string;
  updatedAt: string;
}

// type for multiple paginated workouts
export interface IPaginatedWorkouts {
  total: number;
  previousPage?: number;
  nextPage?: number;
  totalPages: number;
  page: number;
  workouts: IWorkout[];
}
