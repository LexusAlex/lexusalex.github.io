---
layout: default
nav_order: 18
permalink: 18-configuring-server-nginx
title: Настройка веб сервера Nginx
description: Введение в конфигурацию веб-сервера Nginx
date: 2021-03-14 20:00:00 +3
parent: Заметки
themes: linux nginx
---

# Настройка веб сервера Nginx
{: .no_toc }

<details open markdown="block">
  <summary>
    Содержание
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>
---

1. [Сборка Nginx из исходников на Debian 10](https://lexusalex.ru/10-linux-debian-installing-nginx-from-source)

В первой статье мы установили nginx из исходников.
Сегодня продолжим и разберемся с настройкой и как он работает.

После запуска, nginx имеет один главный процесс и несколько рабочих процессов наследованных от главного процесса.
Каждый рабочий процесс способен обрабатывать тысячи http соединений.

Количество рабочих процессов прописываются в конфигурационном файле в моем случае он лежит там куда мы ставили nginx
`/home/alex/nginx/conf/nginx.conf`, в других дистрибутивах может быть по другому.

В конфигурационном файле, директивы могут быть простые:

```text
user  nobody;
```
И блочные:

```text
events {
    worker_connections  1024;
    multi_accept on;
}
```
Комментарий обозначается символом `#`.

## Рабочие процессы

Как говорилось выше рабочие процессы можно определять.

```text
# по умолчанию 1 процесс, auto значит nginx определит количество рабочих процессов автоматически равным числу ядер процессора
worker_processes  auto;
```
Посмотрим на это:

```shell
ps -ef --forest | grep nginx
root        728      1  0 15:04 ?        00:00:00 nginx: master process /home/alex/nginx/sbin/nginx
nobody     1258    728  0 16:31 ?        00:00:00  \_ nginx: worker process
```

Сейчас у меня 1 рабочий процесс, что вполне закономерно, по кол-ву ядер на сервере.

```text
events {
    # Задаёт максимальное число соединений, которые одновременно может открыть рабочий процесс.
    # Как правило, число устанавливают в зависимости от числа ядер процессора по принципу n * 1024. Например, 2 ядра дадут worker_connections 2048
    worker_connections  1024; 
}
```

## Пользователь

По умолчанию рабочие процессы nginx работают от пользователя nobody.

Создадим для этих целей системного пользователя nginx

```shell
sudo useradd -M -r -s /usr/sbin/nologin nginx
```
И пропишем в конфигурационном файле

```text
user  nginx nginx;
```

Перезапускам сервер и проверяем

```shell
sudo ./sbin/nginx -s reload
```

## Http сервер

Основное предназначение Nginx - это обработка http соединений, для настройки этого существует директива `http`

```text
http {

}
```

> Любой файл конфигурации можно подключать с помощью директивы include например include mime.types; с корректными директивами

Виртуальные хосты задаются директивой `server`. Их может быть несколько.

```text
http {
    server {
    
    }
    server {
    
    }
    server {
    
    }
}
```

Их различают по портам и по имени сервера.

Каждая из секций `server` может содержать директивы:

- [listen](https://nginx.org/ru/docs/http/ngx_http_core_module.html#listen) - адрес и порт на которых сервер будет принимать запросы
- [server_name](https://nginx.org/ru/docs/http/ngx_http_core_module.html#server_name) - имена виртуального сервера

```text
listen 127.0.0.1:8000;
listen 127.0.0.1;
listen 8000;
listen *:8000;
listen localhost:8000;

server_name example.com www.example.com;
```

Примеры конфигураций

```text
http {
    server {
        listen       8080;
        server_name  localhost;
    }
    server {
        listen       8081;
        listen       8082;
        listen       8083;
        server_name  test;
    }
    server {
        # Запрещаем обработку узла без имени сервера
        listen      80;
        server_name "";
        return      444;
    }
    server {
        listen      192.168.1.1:80;
        server_name example.org www.example.org;
    }
}
```

> Рекомендуется каждый виртуальный хост указывать в отдельном файле. Подключенные в основном например так `include /etc/nginx/vhosts/*;`

Следующим шагом необходимо определить директиву [location](https://nginx.org/ru/docs/http/ngx_http_core_module.html#location),
которая задает конфигурацию в зависимости от URI запроса.

Директива `root` задает корневой каталог куда пойдет запрос.

```text
location / {
    root html;
}
```

Пример конфигурации для php сайта

```text
server {
    listen      80;
    server_name localhost;
    root        html;

    location / {
        index  index.php;
    }

    location ~* \.(gif|jpg|png)$ {
        expires 30d;
    }
    
    location ~ \.php$ {
        root           html;
        fastcgi_pass   127.0.0.1:9002;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
     }
}
```

## Полезные ссылки

- [Документация Nginx](https://nginx.org/ru/docs/)
- [Генератор конфигураций для Nginx](https://www.digitalocean.com/community/tools/nginx?global.app.lang=ru)
- [Генератор SSL конфигурации](https://ssl-config.mozilla.org/)
- [htaccess-конвертер правил](https://winginx.com/ru/htaccess)
