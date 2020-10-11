import * as React from 'react';
import { ImageProps, Image, Spinner, Flex, FlexProps } from '@chakra-ui/core';

interface ImageWithLoadingProps extends ImageProps {
  loaderHeight?: FlexProps['height'];
}

// Component that shows a spinner until an image has been loaded
// to improve the UX
export const ImageWithLoading = ({
  loaderHeight = '100%',
  ...props
}: ImageWithLoadingProps) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <>
      {!loaded && (
        <Flex
          alignItems="center"
          justifyContent="center"
          height={loaderHeight}
          py={2}
        >
          <Spinner size="md" color="brand.500" />
        </Flex>
      )}
      <Image
        {...props}
        visibility={loaded ? 'visible' : 'hidden'}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};
