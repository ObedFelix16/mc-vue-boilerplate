# mc-vue-boilerplate

An opinionated architecture and dev environment for mr.código projects using Vue.js as their main frontend framework.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you have the following installed:

- [Node](https://nodejs.org/) - The server framework used
- [Yarn](https://yarnpkg.com/) - The JavaScript package manager used
- [Git](https://git-scm.com/) - The version control system

### Installing

Open the terminal of your preference.

Change directory:

```sh
 cd C:\Development\Projects\Web
```

Clone the project to your computer:

```sh
git clone https://mrcodigorepo.visualstudio.com/mc-vue-boilerplate/_git/mc-vue-boilerplate "mc-vue-boilerplate"
```

Change directory to the newly-cloned folder:

```sh
cd "mc-vue-boilerplate"
```

Install project dependencies (may take a few minutes):

```sh
yarn install
```

Start the application:

```sh
yarn serve
```

## Architecture

- [.vscode](docs/vscode.md)
- [docs](docs/docs.md)
- [public](docs/public.md)
- [scripts](docs/scripts.md)
- [src](docs/src.md)
  - [assets](docs/assets.md)
  - [components](docs/components.md)
    - [base](docs/basecomponents.md)
  - [enums](docs/enums.md)
  - [locales](docs/locales.md)
  - [router](docs/router.md)
  - [services](docs/services.md)
    - [client](docs/client.md)
  - [setup](docs/setup.md)
  - [store](docs/store.md)
  - [types](docs/types.md)
  - [utils](docs/utils.md)
  - [views](docs/views.md)
- [tests](docs/tests.md)

## Running the tests

### Unit testing

```sh
yarn test:unit
```

### E2E testing

```sh
yarn test:e2e
```

## Linting & code style

For linting and code style we use:

- [ESLint](https://eslint.org/) - A pluggable linting utility for JavaScript
- [Prettier](https://prettier.io/) - An opinionated code formatter.

```sh
yarn lint
```

## Deployment

TODO: Add deployment information.

## Built With

- [Vue](https://vuejs.org/) - The JavaScript framework used
- [Vue CLI](https://github.com/vuejs/vue-cli/) - CLI used to generate the Vue development skeleton
- [TypeScript](https://www.typescriptlang.org/) - JavaScript typed superset
- [Jest](https://facebook.github.io/jest/) - JavaScript unit testing framework
- [Cypress](https://www.cypress.io/) - JavaScript end to end testing framework
- [Yarn](https://yarnpkg.com/) - Package manager
- [Webpack](https://webpack.js.org/) - Module bundler
- [ESLint](https://eslint.org/) - Plugabble linting utility for JavaScript
- [Prettier](https://prettier.io/) - Opinionated code formatter
- [FontAwesome](https://fontawesome.com/) - Icon set and toolkit

## Contributing

Please read [contributing.md](./github/contributing.md) for details on our code of conduct, and the process for submitting pull requests to this project.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://mrcodigorepo.visualstudio.com/_git/mc-vue-boilerplate/tags).

## Authors

- **Ricardo Ruiz** - _Initial work_ - <mailto:ricardo@mrcodigo.com>

## License

This project is proprietary and confidential - see the [LICENSE.md](LICENSE.md) file for details.
