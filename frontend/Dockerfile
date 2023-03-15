# syntax=docker/dockerfile:1.4

FROM node:lts
WORKDIR /frontend
COPY package.json ./
RUN npm install
COPY . .
ENV VITE_PORT=8080
ENV VITE_API_PORT=8080
ENV VITE_HOST=13.49.125.30
EXPOSE 8080
CMD ["npm", "run", "dev", "--", "--host"]
