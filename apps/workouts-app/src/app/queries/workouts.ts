import { gql } from '@apollo/client';

export const GET_WORKOUT = gql`
  query Workout($id: Int!) {
    getWorkout(id: $id) {
      id
      name
      description
      image
      startDate
      category
      extra
    }
  }
`;

export const GET_WORKOUTS = gql`
  query Workouts($variables: WorkoutsArgs!) {
    getWorkouts(variables: $variables) {
      total
      totalPages
      page
      nextPage
      previousPage
      workouts {
        id
        name
        description
        image
        startDate
        category
        extra
      }
    }
  }
`;
