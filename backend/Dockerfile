# syntax=docker/dockerfile:1.4

FROM node:lts
WORKDIR /backend
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
