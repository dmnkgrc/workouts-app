import * as React from 'react';
import { Box, BoxProps, Flex, Text } from '@chakra-ui/core';
import { IWorkout } from '@workouts-app/common';
import LazyLoad from 'react-lazyload';

import styled from '../config/theme';
import { ImageWithLoading } from './ImageWithLoading';
import { formatDate } from '../utils/date';

const StyledWorkoutListElement = styled(Box)(
  ({ theme }) => `
  background: white;
  border-radius: ${theme.radii.md};
  box-shadow: ${theme.shadows.sm};
  list-style-type: none;
  cursor: pointer;
  &:hover {
    box-shadow: ${theme.shadows.xl};
  }
`,
);

export const WorkoutListElement = ({
  workout,
  onClick,
}: {
  // the workout
  workout: IWorkout;
  // action to perform on clicking the lement
  onClick: BoxProps['onClick'];
}) => (
  <StyledWorkoutListElement
    as="li"
    onClick={onClick}
    data-test-id="workouts-list-element"
  >
    <Flex
      justifyContent="center"
      borderTopLeftRadius="md"
      borderTopRightRadius="md"
      overflow="hidden"
    >
      <LazyLoad
        height={120}
        once
        placeholder={<Box width="100%" height={32} />}
      >
        <ImageWithLoading
          src={`${workout.image}?q=${workout.id}`}
          alt={workout.name}
        />
      </LazyLoad>
    </Flex>
    <Flex
      justifyContent="space-between"
      fontSize="sm"
      alignItems="center"
      p={2}
    >
      <Text textAlign="center" fontWeight="600" textTransform="capitalize">
        {workout.category}
      </Text>
      <Text color="gray.400" fontWeight="xs">
        {formatDate(Number(workout.startDate))}
      </Text>
    </Flex>
    <Box px={2}>
      <Text
        color="brand.500"
        fontWeight="600"
        data-test-id="workouts-list-element-name"
      >
        {workout.name}
      </Text>
      <Text fontSize="sm" fontWeight="500">
        {workout.description.substr(0, 100) + '...'}
      </Text>
    </Box>
  </StyledWorkoutListElement>
);
