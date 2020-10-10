import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { WorkoutCategory } from '@workouts-app/common';

@Scalar('WorkoutCategory')
export class WorkoutCategoryScalar
  implements CustomScalar<string, WorkoutCategory> {
  description = 'Workout category scalar type';

  parseValue(value: string): WorkoutCategory {
    return value as WorkoutCategory;
  }

  serialize(value: WorkoutCategory): string {
    return value;
  }

  parseLiteral(ast: ValueNode): WorkoutCategory {
    if (ast.kind === Kind.STRING) {
      return ast.value as WorkoutCategory;
    }
    return null;
  }
}
