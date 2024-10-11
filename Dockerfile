FROM node:20-alpine

RUN npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm i
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

EXPOSE 8082

RUN adduser -D smachado
USER smachado

CMD ["npm","run","start"]