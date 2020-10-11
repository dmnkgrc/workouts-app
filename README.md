# Workouts APP

This project uses [NX](https://nx.dev). The main benefit is that it allows to easily share code an maintain multiple applications in a monorepo. For this task it is a
good idea given that it simplifies having the NestJS backend and the React frontend on the same repo.
It also uses [Chakra UI](https://chakra-ui.com/) as a component library. It is a good idea to use Chakra for this application, because it allows to build accessible apps fast.

A small summary of the folder structure:

- apps/workouts-app-e2e: contains the E2E tests for the frontend. I prefered to use e2e tests for this application, given the size of the task and the fact that there are not too many flows to test. Nevertheless, there are unit tests for the backend logic.

- apps/api: contains the NestJS application

- apps/api/src/column-pollution.txt: the file with the random content to pollute each row of the workouts table

- apps/workouts-app: contains the React frontend application code

## Getting started

- Install dependencies

```bash
yarn install
```

- Start dev database (make sure port 5432 is  available). The code is available in `scripts/start-db.sh`

```bash
yarn start:dev:db
```

- Seed the database

```base
yarn seed:run
```

## Running the project

You can run both the API and the frontend with

```bash
yarn nx run-many --target=serve --projects=workouts-app,api --parallel --maxParallel=2
```

or separately using

```bash
# start the API
yarn start api
# start the frontend
yarn start
```

The API runs in port `4200` by default and the frontend in port `3000`

## Testing

### API unit tests

To run unit tests for the API you need to run:

```bash
yarn test api
```

### E2E tests

To run the E2E tests for the frontend you need to run

```bash
yarn e2e workouts-app-e2e
```

This will automatically run the frontend and the E2E, by defaults it runts them once and reports the results in the terminal. If you want to keep cypress running and wait for changes, you can run:

```bash
yarn e2e workouts-app-e2e --watch
```

## Building

You can build both the API and the frontend with

```bash
yarn nx run-many --target=build --projects=workouts-app,api --parallel --maxParallel=2
```

or separately using

```bash
# build the API
yarn build api
# build the frontend
yarn build
```

The outputs will be available in:

- `dist/apps/api`

- `dist/apps/workouts-app`
