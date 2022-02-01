# Getting started

This guide works has been tested on: `Windows 10`, `Windows 11`, `MacOS`, `Arch`

These are the steps to setup the backend to run the application.

## Pre-requisite

To get started, you need to have the following programs installed:
- [MongoDB](https://docs.mongodb.com/drivers/node/current/quick-start/)
- Node (Read the link to install MongoDB for guide to install Node)
  - [Yarn package manager](https://yarnpkg.com/getting-started/install)

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
Press enter to use default value, using all defaults *should* work on all systems

## Start application

```
yarn start:applicationName
```
Here is a list of available applications:

Instance(s)                   | applicationName
---                           | ---
`Mealplanr`, `Mealplanr API`  | mealplanr
