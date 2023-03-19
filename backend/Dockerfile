# syntax=docker/dockerfile:1.4

FROM node:lts
WORKDIR /backend
# COPY package.json ./
COPY . .
ENV PORT=3001
ENV CERT_PATH=/etc/letsencrypt/live/
ENV DOMAIN=overengineeredweatherapp.cloud/
ENV CERT=fullchain.pem
ENV KEY=privkey.pem
RUN npm install
RUN npm run build
# ENV WEB_PORT=80
# ENV AWS_IP=13.51.36.139
EXPOSE 3001
CMD ["npm", "run", "start"]
