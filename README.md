## Description

Middleware to integrate Microsoft Power Automate with Tyntec Conversation API.

## Prerequisites

- Node@16
- Yarn
- Docker + Docker Compose

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## Release

To release new version just push into `main`. To release beta push into `beta` branch. `@semantic-release/commit-analyzer` is used to decide how to increment version and compose CHANGELOG.

## Deploy

For deploying app you can use prepared Docker.

```bash
# for local development
$ docker-compose up
```

For production deploy use `--target production`.

## License

Nest is [MIT licensed](LICENSE).
