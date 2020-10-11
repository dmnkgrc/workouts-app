import * as React from 'react';
import { Alert, Box, Flex, Heading, Text } from '@chakra-ui/core';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { IWorkout } from '@workouts-app/common';

import { GET_WORKOUT } from '../../queries/workouts';
import { Loading } from '../../components/Loading';
import { ImageWithLoading } from '../../components/ImageWithLoading';
import { BackLink } from '../../components/BackLink';
import { formatDate } from '../../utils/date';

const WorkoutPage = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<{
    getWorkout: IWorkout;
  }>(GET_WORKOUT, {
    variables: {
      id: Number(id),
    },
  });

  if (loading) return <Loading />;
  if (error || !data)
    return (
      <Alert data-test-id="alert-error" status="error">
        There was an error processing your request. Please try again later
      </Alert>
    );
  const workout = data.getWorkout;
  // Different error when the workout is not found
  if (!workout) {
    return (
      <Alert data-test-id="alert-error" status="error">
        Workout not found
      </Alert>
    );
  }
  return (
    <Box width="100%" maxW="2xl">
      <Box py={4}>
        <BackLink text="Back to Workouts" to="/" />
      </Box>
      <Heading data-test-id="workout-page-title">{workout.name}</Heading>
      <Box py={2} data-test-id="workout-page-image">
        <ImageWithLoading
          loaderHeight={64}
          src={`${workout.image}?q=${workout.id}`}
          alt={workout.name}
        />
      </Box>
      <Box backgroundColor="white" p={4} borderRadius="md" boxShadow="sm">
        <Flex justifyContent="space-between">
          <Text
            fontWeight="600"
            textTransform="capitalize"
            data-test-id="workout-page-category"
          >
            {workout.category}
          </Text>
          <Text
            color="gray.400"
            fontWeight="xs"
            data-test-id="workout-page-start-date"
          >
            {formatDate(Number(workout.startDate))}
          </Text>
        </Flex>
        <Text data-test-id="workout-page-description">
          {workout.description}
        </Text>
      </Box>
    </Box>
  );
};

export default WorkoutPage;
