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

## Configuration

Before you run an app create relevant config file:

- Local development `.env.development.local` (`.env.sample` can be used as a template)
- Production `.env`

| Property            | Type   | Optional | Description                                                           |
| ------------------- | ------ | -------- | --------------------------------------------------------------------- |
| TYNTEC_BASE_URL     | string | No       | Base URL of Tyntec Conversation API.                                  |
| WEBHOOK_DELETE_PATH | string | No       | Path that will be returned as location header after creating webhook. |

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

## API Docs

Swagger documentation of middlewares API is located on `/docs` endpoint.

## License

Nest is [MIT licensed](LICENSE).
