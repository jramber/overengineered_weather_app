# syntax=docker/dockerfile:1.4

FROM node:lts
WORKDIR /backend
COPY package.json ./
RUN npm install
COPY . .
ENV PORT=3001
ENV WEB_PORT=80
ENV AWS_IP=13.51.36.139
EXPOSE 3001
CMD ["npm", "run", "start"]
