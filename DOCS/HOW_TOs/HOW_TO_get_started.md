# Getting started

This guide works has been tested on: `Windows 10`, `Windows 11`, `MacOS`, `Arch`

These are the steps to setup the backend to run the application.

## Pre-requisite

To get started, you need to have the following programs installed:

- [Docker](https://docs.docker.com/get-docker/) - In order to more easily setup the environment.
- Make. You can install it using [Chocolatey](https://chocolatey.org/install) `choco install make` - To use the `make` command.
- [Node](https://nodejs.org/en/download/) v. 16.10.0 or above - To run the application.

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

Start database (this you can keep running in the background in docker):

**NOTE** ATM. you need to run the following command in bash since `COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1` is not supported in powershell

```
make db
```

Start the application

```
yarn start
```
