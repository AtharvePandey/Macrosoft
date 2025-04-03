# Use Node.js as base
ARG NODE_VERSION=23.7.0
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

################################################################################
# Install Dependencies
FROM base as deps

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

################################################################################
# Build the application
FROM deps as build

COPY . . 
RUN npm run build

################################################################################
# Final Production Stage
FROM base as final

ENV NODE_ENV production
USER node

# Copy only required files
COPY package.json . 
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "preview"]
