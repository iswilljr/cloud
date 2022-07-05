# CLOUD SETUP

This is a guide to setting up the home cloud environment

## Getting started

Setup the home cloud api running the following commands

```bash
yarn install:api
yarn build
yarn setup
```

for more information see the [api docs](https://github.com/iswilljr/cloud-api#docs)

the next step is to setup the home cloud, options:

- Github
- Deno

with the github interface you can setup the cloud running the following commands

```bash
yarn install:github
yarn build
```

with the deno interface you can setup the cloud running the following commands

```bash
yarn install:deno
yarn build
```

## Scritps

available scripts:

- `install:api`: clone the api repo and install the dependencies
- `install:github`: clone the github home cloud repo and install the dependencies
- `install:deno`: clone the deno home cloud repo and install the dependencies
- `setup:api`: setup the environment variables for the api
- `build:api`: build the cloud api
- `build:github`: build the github home cloud
- `build:deno`: build the deno home cloud
- `start:api`: start the api server
- `start:github`: start the github home cloud server
- `start:deno`: start the deno home cloud server
