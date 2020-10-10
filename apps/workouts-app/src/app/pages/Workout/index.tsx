import * as React from 'react';
import { Alert, Box, Flex, Heading, Text } from '@chakra-ui/core';
import { NavLink, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { IWorkout } from '@workouts-app/common';
import { ArrowLeft } from 'react-feather';

import { GET_WORKOUT } from '../../queries/workouts';
import { Loading } from '../../components/Loading';

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
      <Alert status="error">
        There was an error processing your request. Please try again later
      </Alert>
    );
  const workout = data.getWorkout;
  return (
    <Box>
      <Box py={4}>
        <Flex as={NavLink} {...{ to: '/' }} alignItems="center">
          <ArrowLeft />
          <Text>Back to Workouts</Text>
        </Flex>
      </Box>
      <Heading>{workout.name}</Heading>
    </Box>
  );
};

export default WorkoutPage;
