FROM node:13 as compilacion


ARG TAG=latest

WORKDIR /usr/src/


# DEPENDENCIAS
COPY ./src/package.json .
RUN npm install


# CODIGO FUENTE
COPY ./src/app.js .
COPY ./src/apps .


# VARIABLES PREDEFINIDAS
ENV VERSION=${TAG}

ENV NODE_PORT=7000


# EJECUCION
EXPOSE ${NODE_PORT}

CMD npm run prod