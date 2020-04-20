# Getting started

## 1. Install Yarn
- [https://yarnpkg.com/lang/en/docs/install]()

## 2. Install dependencies
```bash
yarn install
```

## 3. Run local server for development (API pointing to AWS Staging)
```bash
yarn serve
```

Hopefully it's going to start a local node server at [https://localhost:8080/]()

# Commands

## - Run local server pointing to staging database
```bash
yarn serve
```

## - Run local server pointing to local API
```bash
yarn serve-local-api
```

## - Run linter
```bash
yarn lint
```

## - Run unit tests
```bash
yarn test:unit
```

## - Run e2e tests
```bash
yarn test:e2e
```

# CI / CD (AWS Development)

Every push triggers the CircleCI workflow, it runs unit tests and if successful, deploys to staging or production.

```bash
git push -u origin <branch_name>
```

# Staging Application URL

[https://dev-app.painel.com.br]()

# Below is the docs of the framework we use

## [Vue Black Dashboard PRO](https://github.com/creativetimofficial/ct-vue-black-bootstrap-dashboard-pro) [![version][version-badge]][CHANGELOG] [![license][license-badge]][LICENSE]

> Admin dashboard based on black dashboard UI template + vue-router

This project is a vue version of [Black Dashboard PRO](https://demos.creative-tim.com/marketplace/black-dashboard-pro/examples/dashboard.html)
designed for vue js. The dashboard includes Bootstrap 4, vue-router, chart.js, google-maps and several other plugins/components.

Check the [Live Demo here](http://demos.creative-tim.com/vue-black-dashboard-pro).

## [Documentation](http://demos.creative-tim.com/vue-black-dashboard-pro/documentation)

