# Getting started

This guide works has been tested on: `Windows 10`, `Windows 11`, `MacOS`, `Arch`

These are the steps to setup the backend to run the application.

## Pre-requisite

To get started, you need to have the following programs installed:

- [Docker](https://docs.docker.com/get-docker/) - In order to more easily setup the environment.
- [Go tools](https://go.dev/doc/install) - To use go.
- Make. You can install it using [Chocolatey](https://chocolatey.org/install) `choco install make` - To use the `make` command.
- [Node](https://nodejs.org/en/download/) - To run the application.

## Installation

To install the node_modules use:

```
yarn
```

Or

```
yarn install
```

## Generate enviorment variables

```
yarn gen:env
```

Press enter to use default value, using all defaults _should_ work on all systems

## Start application

```
yarn start
```