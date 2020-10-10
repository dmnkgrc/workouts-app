import styled from '@emotion/styled';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { Theme } from '../config/theme';

interface StyledNavLinkProps extends NavLinkProps {
  theme: Theme;
}

export const StyledNavLink = styled(NavLink)<StyledNavLinkProps>(
  ({ theme }) => `
  font-weight: 600;
  &:hover,
  &.active {
    color: ${theme.colors.brand[500]};
  }
`,
);
