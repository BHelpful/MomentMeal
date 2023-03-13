# Getting started

This guide works has been tested on: `Windows 10`, `Windows 11`, `MacOS`, `Arch`

These are the steps to setup the backend to run the application.

## Pre-requisite

To get started, you need to have the following programs installed:

- [Docker](https://docs.docker.com/get-docker/) - In order to more easily setup the environment e.g., database.
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
cp .env.example .env
```

## Start application

First time setting up the database or if you want to reset the database, run:

```
yarn db:reset
```

Start the application (frontend and backend) using:

```
yarn start
```
