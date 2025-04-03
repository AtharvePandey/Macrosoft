# Use Node.js as base
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine AS base


WORKDIR /usr/src/app

################################################################################
# Install Dependencies
FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci

################################################################################
# Build the application
FROM deps AS build

COPY . . 
RUN npm run build

################################################################################
# Final Production Stage
FROM base AS final

ENV NODE_ENV production
USER node

# Copy only required files
COPY package.json . 
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "preview"]
