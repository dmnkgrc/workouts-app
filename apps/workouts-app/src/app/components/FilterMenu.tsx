import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from '@chakra-ui/core';
import * as React from 'react';
import { ChevronDown } from 'react-feather';

interface FilterMenuOption {
  label: string;
  value: string;
}

export interface FilterMenuProps {
  options: FilterMenuOption[];
  onClick: (value: string) => void;
  selected?: string[] | string;
  text: string;
}

const isSelected = (value: string, selected?: string | string[]) => {
  if (Array.isArray(selected)) {
    return selected.includes(value);
  }
  return value === selected;
};

const selectedProps = {
  backgroundColor: 'brand.500',
  color: 'white',
  _focus: {
    backgroundColor: 'brand.500',
    color: 'white',
  },
  _hover: {
    backgroundColor: 'brand.500',
    color: 'white',
  },
};

export const FilterMenu = ({
  options,
  onClick,
  text,
  selected,
}: FilterMenuProps) => (
  <Menu closeOnSelect={false}>
    <MenuButton
      px={4}
      py={2}
      transition="all 0.3s"
      background="white"
      mr={2}
      rounded="md"
      borderWidth="1px"
      color="brand.500"
      display="inline-flex"
      _hover={{ borderColor: 'brand.500' }}
      _expanded={{ bg: 'brand.500', color: 'white' }}
      _focus={{ outline: 0, boxShadow: 'outline' }}
    >
      {text} <ChevronDown />
    </MenuButton>
    <MenuList>
      <MenuOptionGroup defaultValue={selected} type="checkbox">
        {options.map(({ label, value }) => {
          const props = isSelected(value, selected) ? selectedProps : {};
          return (
            <MenuItemOption
              key={value}
              value={value}
              textTransform="capitalize"
              onClick={() => onClick(value)}
              {...props}
              _focus={{
                backgroundColor: 'brand.500',
                color: 'white',
                borderColor: 'brand.500',
                outline: 'none',
              }}
            >
              {label}
            </MenuItemOption>
          );
        })}
      </MenuOptionGroup>
    </MenuList>
  </Menu>
);
