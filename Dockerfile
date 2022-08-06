# Start from node base image
FROM node:16-alpine AS setup

ENV cmd=prisma:deploy

# Set the current working directory inside the container
WORKDIR /usr/src/app

COPY package.json yarn.lock decorate-angular-cli.js ./
COPY prisma ./prisma/

# Install dependencies
RUN yarn global add @angular/cli
RUN yarn

# Copy sources to the working directory
COPY . .

# Set the Node environment
ARG node_env=development
ENV NODE_ENV $node_env

RUN apk --no-cache add curl

# install git
RUN apk add --no-cache git

# Run the npm command
CMD [ "sh", "-c", "npm run ${cmd}" ]
