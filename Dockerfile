FROM node:18 as builder

# Create app directory
WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app
USER node

# Install app dependencies
COPY --chown=node:node . .

RUN npm ci
RUN npm run build

FROM node:18 as prod

WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app
USER node
# Bundle app source
COPY --from=builder --chown=node:node /usr/src/app/dist ./dist
COPY --from=builder --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=node:node /usr/src/app/package*.json ./

CMD [ "npm", "run", "start" ]