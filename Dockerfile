FROM node:20-alpine AS client

WORKDIR /app
COPY ./client .
RUN npm i
RUN npm run build

FROM node:20-alpine AS backend

WORKDIR /app
COPY ./server .
RUN npm i
RUN npm run build

FROM node:20-alpine AS server

WORKDIR /app
COPY --from=backend /app/ ./server
COPY --from=backend /app/.env ./server/dist
COPY --from=client /app/.next ./server/client/.next
COPY --from=client /app/public ./server/client/public
COPY --from=client /app/.env ./server/client/.env

RUN rm -rf ./server/src
EXPOSE 5000
CMD ["node", "server/dist/main.js"]