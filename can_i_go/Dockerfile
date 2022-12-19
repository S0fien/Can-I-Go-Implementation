FROM node:16.15.1

WORKDIR /can_i_go
COPY package.json .
RUN npm install
COPY . .
CMD npm start
