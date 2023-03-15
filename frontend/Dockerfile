# syntax=docker/dockerfile:1.4

FROM node:lts
WORKDIR /frontend
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
