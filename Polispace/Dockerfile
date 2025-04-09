#changed this because it was saying 'vulnerablility sldhflshjf'
FROM node:23-slim

# this thing is like our shell's directory in the container
WORKDIR /app

# install dependencies separately to leverage Docker caching (from lecture)
COPY package.json package-lock.json ./
RUN npm install

# copy the rest of the application (from lecture)
COPY . .

# port our app runs on
EXPOSE 5173

# idk what this does (from lecture)
ENV HOST 0.0.0.0

# our scripts in the json , note apparently we need another container to have the build scripts and stuff
CMD ["npm", "run", "dev"]
