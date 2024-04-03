---
layout: default
nav_order: 13
permalink: javascript-13-next-js-install
title: Next.js. Установка
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Установка next.js с нуля
date: 2024-04-03 13:00:00 +3
last_modified_date: 2024-04-03 13:00:00 +3
tags:
- javascript
- next-js
- questions-and-solutions
---

# Next.js. Установка
{: .no_toc }

<details open markdown="block">
  <summary>
    Содержание
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>
---

Поставим все компоненты next.js с нуля.

> Можно установить и по официальной доке, но там много лишнего, а нам бы хотелось самим разобраться как он устроен

Начнем с docker

## docker

Создадим два базовых контейнера

### nginx

````dockerfile
# docker/nginx/Dockerfile
FROM nginx:1.24

COPY ./nginx/conf.d /etc/nginx/conf.d

WORKDIR /next-js-empty
````

`````text
# docker/conf.d/default.conf
server {
    listen 80;
    charset utf-8;
    root /next-js-empty;
    server_tokens off;

    resolver 127.0.0.11 ipv6=off;

    add_header X-Frame-Options "SAMEORIGIN";

    location /_next/webpack-hmr {
        set $upstream http://node:3000;
        proxy_set_header  Host $host;
        proxy_set_header  Upgrade $http_upgrade;
        proxy_set_header  Connection "Upgrade";
        proxy_pass        $upstream;
        proxy_redirect    off;
    }

    location / {
        set $upstream http://node:3000;
        proxy_set_header  Host $host;
        proxy_pass        $upstream;
        proxy_redirect    off;
    }
}
`````

### node

````dockerfile
# docker/node/Dockerfile
FROM node:20

RUN useradd -m alex && usermod -a -G node alex

RUN npm install -g npm@latest

WORKDIR /next-js-empty

USER node
````

### docker-compose

`docker-compose`, чтобы запускать все это добро

````yaml
# docker-compose.yml
version: "3.9"
services:
  node-cli:
    build:
      context: docker
      dockerfile: node/Dockerfile
    volumes:
      - ./:/next-js-empty
  nginx:
    build:
      context: docker
      dockerfile: nginx/Dockerfile
    ports:
      - "80:80"
    depends_on:
      - node
  node:
    build:
      context: docker
      dockerfile: node/Dockerfile
    environment:
      NODE_ENV: development
    volumes:
      - ./:/next-js-empty
    command: npm run dev
    tty: true
````

Практически все готово для запуска, добавим `Makefile`

## makefile

````makefile
docker-build:
	docker compose build --pull
docker-up:
	docker compose up -d
docker-down:
	docker compose down --remove-orphans
npm-install:
	docker compose run --rm node-cli npm install
npm-be-updated-all:
	docker compose run --rm node-cli npm outdated --depth=9999
````

## Зависимости

````shell
docker compose run --rm node-cli npm install next@latest react@latest react-dom@latest
````

Создаться `package.json` с зависимостями, туда еще добавим скрипты самого next

````json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
````

## Приложение

Создадим два файла

````jsx
// app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

// app/page.jsx
export default function Page() {
    return <h1>Hello</h1>
}
````

## Сборка и запуск

```shell
make docker-build # Собрать
make docker-up # Запустить
make docker-down # Остановить
````

По адресу `127.0.0.1` увидим приветственное сообщение.