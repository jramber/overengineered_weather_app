# syntax=docker/dockerfile:1.4

FROM node:lts
WORKDIR /frontend
COPY package.json ./
RUN npm install
COPY . .
ENV VITE_PORT=8080
ENV VITE_API_PORT=3000
ENV VITE_AWS_IP=13.50.111.21
EXPOSE 8080
CMD ["npm", "run", "dev", "--", "--host"]
