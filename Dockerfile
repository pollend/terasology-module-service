FROM node:10

WORKDIR /meta-server

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm" , "run", "dev" ]
