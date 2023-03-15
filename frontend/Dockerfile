# syntax=docker/dockerfile:1.4

FROM node:lts
WORKDIR /frontend
COPY package.json ./
RUN npm install
COPY . .
ENV VITE_PORT=8080
EXPOSE 8080
CMD ["npm", "run", "dev", "--", "--host"]
