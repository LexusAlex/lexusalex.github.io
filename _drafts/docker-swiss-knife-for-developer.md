---
layout: post 
title: Docker - швецарский нож для разработчика
permalink: docker-swiss-knife-for-developer
tags: docker unix
comments: true
summary: Как начать использовать docker
subtitle: Как начать использовать docker 
---

В сети переодически натыкаюсь на вопросы про docker [к примеру](https://qna.habr.com/q/697294), в связи с этим
решил показать как с помощью docker можно запустить ваше приложение, легко и не принужденно.

### Первый пункт

Процесс установки docker прекрасно описан в [документации](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
и не должен вызвать трудностей. Docker доступен для всех операционых систем, но я рекомендую использовать linux.

В идеологии docker каждый процесс должен быть запущен в отдельном контейнере.

Компоненты которые нам понадобятся типичный стек:
- База данных mariaDb
- Веб сервер apache с php 7.4

Я намеренно не усложняю процесс и обхожусь здесь без docker-compose.

### База данных

База данных - это долгоиграющий контейнер-сервис. Я использую один контенер для всех баз данных.

Находим на [docker hub](https://hub.docker.com) нужный нам [образ](https://hub.docker.com/_/mariadb) в данном случае последнюю версию mariadb:10.4.11 и скачиваем его :

```bash
#!/usr/bin/env bash
docker pull mariadb:10.4.11
```

Создайте где-нибудь у себя в файловой системе директорию `services` для сервисов ресурсы которых будут использовать другие
контейнеры. Возможно в будущем их будет несколько. Каждый сервис будем описывать и хранить в отдельном
каталоге.

~~~text
/home/alex/services/
/home/alex/services/mariadb/
/home/alex/services/mariadb/etc/
~~~

Далее добавьте конфигурационный фаил `/home/alex/services/mariadb/etc/config.cnf`, он нам понадобится для настройки mariaDb
со следующем содержимым :
~~~text
[mysqld]
log_error=/var/lib/mysql/logs/errorlog
slow_query_log=on
slow_query_log_file=/var/lib/mysql/logs/slowlog
~~~

Cобираем контейнер и выполняем команду:
```bash
#!/usr/bin/env bash
docker run -d --name mariadb -v $PWD/services/mariadb/data:/var/lib/mysql -v $PWD/services/mariadb/etc:/etc/mysql/conf.d -v $PWD/services/mariadb/logs:/var/lib/mysql/logs -e MYSQL_ROOT_PASSWORD=root -p 127.0.0.1:3306:3306 mariadb:10.4.11
```
Ключи `-v` значат, что мы прокидываем директории хост машины в директории контейнера, то есть содержимое этих директорий будет синхронизировано.

Запустить/Остановить контейнер :

~~~bash
docker start mariadb
docker stop mariadb
~~~

### Сборка контейнера веб сервера

Создаем директорию для проекта со следующем списком файлов: 

~~~bash

~~~

Скачаем образ apache-php :

```bash
#!/usr/bin/env bash
docker pull php:7.4.1-apache-buster
```

Соберем контейнер на основе Dockerfile:

```bash
#!/usr/bin/env bash
docker build -t php:7.4.1-apache-buster-saved-link $PWD/services/apache/
```

https://zarbis.me/docker-101/