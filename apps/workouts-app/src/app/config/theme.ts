import { theme as baseTheme } from '@chakra-ui/core';
import styled, { CreateStyled } from '@emotion/styled';

export const theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    brand: {
      50: '#FFF9F7',
      100: '#FFF2F0',
      200: '#FFDFD9',
      300: '#FFCCC2',
      400: '#FFA594',
      500: '#FF7F66',
      600: '#E6725C',
      700: '#994C3D',
      800: '#73392E',
      900: '#4D261F',
    },
  },
};

export type Theme = typeof theme;
export default styled as CreateStyled<Theme>;
