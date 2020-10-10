import * as React from 'react';
import { Spinner, Flex } from '@chakra-ui/core';

export const Loading = () => (
  <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
    <Spinner size="xl" color="brand.500" />
  </Flex>
);
