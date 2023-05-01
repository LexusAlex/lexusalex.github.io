---
layout: default
nav_order: 56
permalink: 56-mkcert
title: Установка и использование mkcert
parent: Заметки
description: Mkcert генерируем локальные ssl сертификаты
date: 2023-05-01 21:00:00 +3
last_modified_date: 2023-05-01 21:00:00 +3
tags:
- ssl
---

# Установка и использование mkcert

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

Самый простой способ поставить локальный ssl сертификат для хоста это использовать [mkcert](https://github.com/FiloSottile/mkcert)

## Ставим

Я использую ubuntu как локальную рабочую машину, поэтому ставим на linux:

```shell
sudo apt install libnss3-tools
curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
chmod +x mkcert-v*-linux-amd64
sudo cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert
```

После этого станет доступна команда `mkcert`

Теперь нужно создать корневой сертификат 

```shell
mkcert -install
```

## Генерируем сертификат

```shell
mkcert test1.local
```

В результате будут созданы 2 файла

- test1.local-key.pem  
- test1.local.pem

## Прописываем в конфигурации хоста сайта

Осталось взять эти файлы и прописать в конфигурации хоста

## Docker

Отдельно хочу остановиться как просто это сделать в docker в nginx.

1. Генерируем сертификат `mkcert 127.0.0.1`
2. Пробрасываем volume внурь контейнера, например в dockerfile `COPY ./nginx/ssl /etc/nginx/ssl`
3. В настройках хоста пишем пути к файлам
    ```nginx configuration
    listen 443 ssl http2;
    ssl_certificate /etc/nginx/ssl/127.0.0.1.pem;
    ssl_certificate_key /etc/nginx/ssl/127.0.0.1-key.pem;
    ```
4. В docker-compose прописываем порты `"443:443"`

После этого, у меня сразу все заработало, с минимально затраченными усилиями.

Это конечно, только для локальной разработки

[Репозиторий проекта](https://github.com/FiloSottile/mkcert)

