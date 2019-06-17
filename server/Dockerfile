FROM node:10-alpine

WORKDIR /usr/share/app
COPY . .
RUN npm install

EXPOSE 3000
CMD ["node", "index.js"]
