import * as React from 'react';
import { Flex, Text, CloseButton } from '@chakra-ui/core';

interface SelectedFilterProps {
  // value of the filter
  value?: string;
  // text to display for the filter
  text: string;
  // action to perform on clicking the close button
  onClick: (value: string | undefined) => void;
}

export const SelectedFilter = ({
  value,
  text,
  onClick,
}: SelectedFilterProps) => (
  <Flex
    backgroundColor="white"
    borderRadius="full"
    m={1}
    border="1px solid"
    borderColor="brand.500"
    py={1}
    px={3}
    display="inline-flex"
    alignItems="center"
    color="brand.500"
    key={value}
    data-test-id="selected-filter"
  >
    <Text fontWeight="600" fontSize="sm" textTransform="capitalize">
      {text}
    </Text>

    <CloseButton
      onClick={() => onClick(value)}
      size="sm"
      mb="-2px"
      ml={2}
      _hover={{ backgroundColor: 'brand.200' }}
    />
  </Flex>
);
