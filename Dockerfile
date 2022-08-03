# Start from node base image
FROM node:16-alpine

# Set the current working directory inside the container
WORKDIR /usr/src/app

# Copy sources to the working directory
COPY . .

RUN chmod +x ./wait-for-postgres.sh

# Copy package.json, yarn.lock files and download deps
# COPY package.json yarn.lock decorate-angular-cli.js ./
RUN yarn global add @angular/cli
RUN yarn

RUN npx prisma generate

RUN apk add postgresql-client

RUN sh ./wait-for-postgres.sh npx prisma migrate deploy

RUN npx prisma db seed --preview-feature

# Set the Node environment
ARG node_env=development
ENV NODE_ENV $node_env


# Run the app
# CMD ["ng", "run", "all:serve"]
CMD   nx run-many --target=serve --projects=api,meal-time
