import { Button, Flex, IconButton, Stack, Text } from '@chakra-ui/core';
import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { LIMIT } from '../config/contstants';

interface PaginationProps {
  onChange: (page: number) => void;
  page: number;
  total: number;
  limit?: number;
  totalPages: number;
  boundaryCount?: number;
  siblingCount?: number;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
}

// Based on Matrial UI Pagination component
export const Pagination = ({
  onChange,
  page,
  total,
  totalPages,
  boundaryCount = 1,
  limit = LIMIT,
  siblingCount = 1,
  hideNextButton = false,
  hidePrevButton = false,
}: PaginationProps) => {
  // Not render anything if the totalPages is too small
  if (totalPages < 2) {
    return null;
  }

  const range = (start: number, end: number): number[] => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(
    Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
    totalPages,
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      totalPages - boundaryCount - siblingCount * 2 - 1,
    ),
    // Greater than startPages
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2,
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : totalPages - 1,
  );

  let startEllipsis: [number | string] | [] = [];
  let endEllipsis: [number | string] | [] = [];
  if (siblingsStart > boundaryCount + 2) {
    startEllipsis = ['start-ellipsis'];
  } else if (boundaryCount + 1 < totalPages - boundaryCount) {
    startEllipsis = [boundaryCount + 1];
  }

  if (siblingsEnd < totalPages - boundaryCount - 1) {
    endEllipsis = ['end-ellipsis'];
  } else if (totalPages - boundaryCount > boundaryCount) {
    endEllipsis = [totalPages - boundaryCount];
  }

  // List of items to render: ['previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next']
  const itemList = [
    ...(hidePrevButton ? [] : ['previous']),
    ...startPages,

    // Start ellipsis
    ...startEllipsis,

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    ...endEllipsis,

    ...endPages,
    ...(hideNextButton ? [] : ['next']),
  ];

  const firstPageElement = (page - 1) * limit + 1;
  const lastPageElement = page * limit;

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      py={4}
      data-test-id="pagination"
    >
      <Text>
        Showing <b>{firstPageElement}</b> to <b>{lastPageElement}</b> of{' '}
        <b>{total}</b> workouts
      </Text>
      <Stack isInline spacing={2} align="center">
        {itemList.map((item) => {
          if (item === 'previous') {
            return (
              <IconButton
                data-test-id="pagination-previous"
                key={item}
                variantColor="brand"
                icon={ChevronLeft}
                aria-label={item}
                onClick={() => onChange(page - 1)}
              />
            );
          } else if (item === 'next') {
            return (
              <IconButton
                key={item}
                data-test-id="pagination-next"
                variantColor="brand"
                icon={ChevronRight}
                aria-label={item}
                onClick={() => onChange(page + 1)}
              />
            );
          } else if (item === 'start-ellipsis' || item === 'end-ellipsis') {
            return <Text key={item}>...</Text>;
          } else if (typeof item === 'number') {
            return (
              <Button
                data-test-id={`pagination-${item}`}
                key={item}
                onClick={() => onChange(item)}
                borderRadius="full"
                isDisabled={item === page}
                variantColor="brand"
                fontSize="xs"
                width={10}
                height={10}
              >
                {item}
              </Button>
            );
          }
          return null;
        })}
      </Stack>
    </Flex>
  );
};
