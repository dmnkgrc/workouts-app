import { Box, Flex } from '@chakra-ui/core';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Logo } from './components/Logo';
import { Loading } from './components/Loading';
import { StyledNavLink } from './components/StyledNavLink';

const HomePage = React.lazy(() => import('./pages/Home'));
const WorkoutPage = React.lazy(() => import('./pages/Workout'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Box width="100%" height="100%">
          <Flex
            as="header"
            py={4}
            px={6}
            background="white"
            width="100%"
            alignItems="center"
          >
            <Box color="brand.500" height="100%" width={32}>
              <Logo />
            </Box>
            <StyledNavLink activeClassName="active" to="/" exact>
              Home
            </StyledNavLink>
          </Flex>
          <Box as="main" maxW="4xl" width="100%" mx="auto">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/workouts/:id" component={WorkoutPage} />
            </Switch>
          </Box>
        </Box>
      </Suspense>
    </Router>
  );
}

export default App;
