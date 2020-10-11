import * as React from 'react';
import { Box, BoxProps, Flex, Text } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { IWorkout } from '@workouts-app/common';
import { format } from 'date-fns';
import LazyLoad from 'react-lazyload';

import { Theme } from '../config/theme';
import { ImageWithLoading } from './ImageWithLoading';

interface StyledWorkoutListElementProps extends BoxProps {
  theme: Theme;
}
const StyledWorkoutListElement = styled(Box)<StyledWorkoutListElementProps>(
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
  workout: IWorkout;
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
        {format(new Date(Number(workout.startDate)), 'dd MMM yyyy')}
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
