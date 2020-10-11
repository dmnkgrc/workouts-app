import * as React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import { ArrowLeft } from 'react-feather';
import { NavLink, NavLinkProps } from 'react-router-dom';

import styled from '../config/theme';

const StyledBackLink = styled(NavLink)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  &:hover {
    color: ${theme.colors.gray[500]};
  }
  &:active {
    color: ${theme.colors.gray[400]};
  }
`,
);

interface BackLinkProps extends NavLinkProps {
  text: string;
}

export const BackLink = ({ text, ...props }: BackLinkProps) => (
  <StyledBackLink {...props}>
    <ArrowLeft />
    <Text ml={1}>{text}</Text>
  </StyledBackLink>
);
