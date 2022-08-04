# Start from node base image
FROM node:16 AS builder

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

# Run the app
CMD [  "npm", "run", "start:migrate:prod" ]






# RUN yarn build

# FROM node:16

# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/package.json ./
# COPY --from=builder /usr/src/app/yarn.lock ./
# COPY --from=builder /usr/src/app/dist ./dist
# COPY --from=builder /usr/src/app/prisma ./prisma


# # Set the Node environment
# ARG node_env=development
# ENV NODE_ENV $node_env


# EXPOSE 3333

# # Run the app
# CMD [  "npm", "run", "start:migrate:prod" ]
