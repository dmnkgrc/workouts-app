import * as React from 'react';
import { useQuery } from '@apollo/client';
import { Alert, Heading, Text, Flex, Box, Grid } from '@chakra-ui/core';
import { add, format } from 'date-fns';
import {
  categories as categoriesOptions,
  isCategory,
} from '@workouts-app/common';
import { IPaginatedWorkouts, WorkoutCategory } from '@workouts-app/common';

import { GET_WORKOUTS } from '../../queries/workouts';
import { Loading } from '../../components/Loading';
import { FilterMenu } from '../../components/FilterMenu';
import { SelectedFilter } from '../../components/SelectedFilter';
import { Pagination } from '../../components/Pagination';
import { LIMIT } from '../../config/contstants';
import { useHistory } from 'react-router-dom';
import { WorkoutListElement } from '../../components/WorkoutsListElement';

const HomePage = () => {
  const history = useHistory();
  const [page, setPage] = React.useState(1);
  const [categories, setCategories] = React.useState<
    WorkoutCategory[] | undefined
  >();

  // Generate the list of months based on the current date
  const monthOptions = React.useMemo(() => {
    const options: { value: string; label: string }[] = [];
    let i = 0;
    const now = new Date();
    while (i < 12) {
      const date = add(now, { months: i });
      const value = format(date, 'yyyy-MM');
      const label = format(date, 'MMMM yyyy');
      options.push({ label, value });
      i++;
    }
    return options;
  }, []);
  const [startMonth, setStartMonth] = React.useState<string | undefined>();

  React.useEffect(
    function onFilterChange() {
      // reset page on filter change
      setPage(1);
    },
    [categories, startMonth],
  );

  const { loading, error, data } = useQuery<{
    getWorkouts: IPaginatedWorkouts;
  }>(GET_WORKOUTS, {
    variables: {
      variables: {
        limit: LIMIT,
        page,
        startMonth,
        categories,
      },
    },
  });

  // Toggle categories on click
  const handleCategoryClick = (category?: string) => {
    const newCategories = new Set(categories);
    if (category && isCategory(category)) {
      if (newCategories.has(category)) {
        newCategories.delete(category);
      } else {
        newCategories.add(category);
      }
      setCategories(Array.from(newCategories));
    }
  };

  if (loading) return <Loading />;
  if (error || !data)
    return (
      <Alert status="error">
        There was an error processing your request. Please try again later
      </Alert>
    );

  const paginationData = data.getWorkouts;
  return (
    <Box>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexDirection={['column', 'column', 'row']}
        py={4}
      >
        <Flex alignItems="center" data-test-id="home-title">
          <Heading pr={2} fontSize="2xl">
            All workouts
          </Heading>
          <Text fontWeight="400" fontSize="lg">
            ({paginationData.total})
          </Text>
        </Flex>
        <Flex pt={[2, 2, 0]}>
          <FilterMenu
            onClick={handleCategoryClick}
            text="Categories"
            selected={categories}
            options={categoriesOptions.map((c) => ({ label: c, value: c }))}
          />
          <FilterMenu
            onClick={setStartMonth}
            selected={startMonth}
            options={monthOptions}
            text="Start Month"
          />
        </Flex>
      </Flex>
      <Flex flexWrap="wrap" pb={2}>
        {startMonth && (
          <SelectedFilter
            text={format(new Date(`${startMonth}-01`), 'MMMM yyyy')}
            value={undefined}
            onClick={setStartMonth}
          />
        )}
        {categories &&
          categories.length > 0 &&
          categories.map((category) => (
            <SelectedFilter
              key={category}
              text={category}
              value={category}
              onClick={handleCategoryClick}
            />
          ))}
      </Flex>
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
        gap={6}
        px={[4, 8, 0]}
        pb={2}
        as="ul"
      >
        {paginationData.workouts.map((workout) => {
          return (
            <WorkoutListElement
              key={workout.id}
              workout={workout}
              onClick={() => history.push(`/workouts/${workout.id}`)}
            />
          );
        })}
      </Grid>
      <Pagination
        {...{
          hidePrevButton: !paginationData.previousPage,
          hideNextButton: !paginationData.nextPage,
          totalPages: paginationData.totalPages,
          total: paginationData.total,
          page,
          onChange: setPage,
        }}
      />
    </Box>
  );
};

export default HomePage;
