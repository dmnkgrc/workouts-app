import { NavLink } from 'react-router-dom';

import styled from '../config/theme';

export const StyledNavLink = styled(NavLink)(
  ({ theme }) => `
  font-weight: 600;
  &:hover,
  &.active {
    color: ${theme.colors.brand[500]};
  }
`,
);
