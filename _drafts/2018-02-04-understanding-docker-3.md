---
layout: post
title:  Понимая Docker (продолжение)
date:   2018-01-19
author: Алексей Шмелев
categories: docker
comments: true
cover:  "/assets/docker/docker.png"
---


### Docker-compose

Это все конечно хорошо, создали образ, создали контейнер, но как этой всей инфраструктурой управлять.
К примеру самое простое веб приложение уже состоит как минимум из двух компонентов веб сервер и база данных.
Ими нужно как то управлять, для это придумали docker-compose.

Docker-compose зто такая штука с помощью которой можно описать все приложение целиком со всеми портами, директориями и другими зависимости

По сути нам нужно :
- создать сеть чтобы контейнеры видили друг друга
- запустить все связанные контейнеры (не забываем что один сервис это один контейнер)

Скачаем нужные нам версии php, apache, mysql

docker pull php:7.2.1-alpine
docker pull mysql:5.7
docker pull httpd:2.4.29-alpine
docker pull php:7.2.1-apache-stretch

~~~
mysql               5.7                    f008d8ff927d        4 days ago          409MB
php                 7.2.1-alpine           29b373dc5aab        10 days ago         61.9MB
httpd               2.4.29-alpine          29c1b56be99f        10 days ago         86.6MB
php                 7.2.1-apache-stretch   f99d319c7004        11 days ago         377MB
~~~

Как видим кроме mysql и php-apache размер образов небольшой. Я специально скачал чистые образы php и apache чтобы покать их размер.

### docker-compose.yml

Это Dockerfile но для всего приложения.



docker-compose exec db bash

 docker build -t lexusalex:web .
 
 docker-compose up -d
 
 docker-compose down - остановить и удалить контейнеры
 
 docker inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)


docker pull debian:9.3

docker build --tag lexusalex:ssh .

docker run --name ssh -d debian

docker exec -i -t web /bin/bash

docker system prune удаляем контейнерный хлам

docker system prune -a вообще удаляем все

~~~bash

docker build --tag lexusalex:web .
docker run --name web -p 80:80 -d -v "$PWD":/var/www/html lexusalex:web
docker exec -i -t web /bin/bash

docker run --name db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -v /home/alex/data/p1:/var/lib/mysql -d mysql:5.7 

/usr/local/bin/composer.phar update

~~~





###Часто используемые значения в Dockerfile

C помощью следующих команд можно создать практически любое окружение
 ~~~
  копирование
  ADD: копирует файл с хоста в контейнер. ADD [исходный путь или URL] [путь назначения]
  
  исполнение
  CMD ["executable","param1","param2"] CMD «echo» «Hello from Merionet!». выполнение программы с ключами
  ENTRYPOINT: устанавливает стандартную точку входа приложения внутри контейнера.
  ENV: задаёт переменные окружения (например, ключ-значение).
  RUN <command> выполнение команд внутри контейнера
 
  связь с внешней средой
  EXPOSE: открывает порт. наружу из контейнера
  
  FROM <image> базовый образ на основании чего делать ваш образ
  MAINTAINER <name> автор образа
  USER: указывает пользователя, который должен запускать контейнер. который должен использоваться внутри контейнера
  VOLUME: монтирует каталог с хоста в контейнер. пробросить папку наружу
  WORKDIR: указывает каталог, в котором должны запускаться директивы CMD.
 ~~~
Для начала сделаем полный клон образа из предыдущей статьи php:7.2.1-apache-stretch, так как он уже скачан.
Создадим Dockerfile и поместим туда следующее:
~~~
Dockerfile

FROM php:7.2.1-apache-stretch

MAINTAINER alex
~~~
Далее в директории проекта выполним, если сборка прошла без ошибок то получим новый образ:

~~~
docker build --tag lexusalex:web .
~~~
Выполним команду docker images, убедимся что это полный аналог образа php:7.2.1-apache-stretch, но полезного в этом мало.

~~~
docker images
REPOSITORY          TAG                    IMAGE ID            CREATED             SIZE
lexusalex/web       latest                 c48fe4314090        23 hours ago        377MB
php                 7.2.1-apache-stretch   f99d319c7004        8 days ago          377MB
~~~

Дополним Dockerfile

~~~
Dockerfile

FROM php:7.2.1-apache-stretch

MAINTAINER alex

RUN apt-get update && apt-get install -y \
    zlib1g-dev libicu-dev g++ && \
    docker-php-ext-configure intl && \
    docker-php-ext-install -j$(nproc) intl pdo_mysql mysqli
~~~
Команда RUN выполняет команды в образе, в примере команды можно объединять с помощью символов &&.

Таким образом можно настроить и собрать любой образ под ваш проект. Приведу лишь некоторые примеры команд

~~~
Dockerfile

# пробросить порты наружу контейнера
EXPOSE 80 443 

# какую команду запускать когда контейнер запущен
CMD /usr/sbin/nginx

# добавить файл в файловую систему контейнера
ADD nginx.conf /etc/nginx/

# сделать общими файлы в директории хоста и контейнера
VOLUME /www
~~~



docker-compose exec db bash

 docker build -t lexusalex:web .
 
 docker-compose up -d
 
 docker-compose down - остановить и удалить контейнеры
 
 docker inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)


docker pull debian:9.3

docker build --tag lexusalex:ssh .

docker run --name ssh -d debian

docker exec -i -t web /bin/bash

docker system prune удаляем контейнерный хлам

docker system prune -a вообще удаляем все

Остановить все контейнеры

docker stop $(docker ps -a -q)

Удалить все контейнеры

docker rm -f $ (docker ps -q -a)

Удалить все образы

docker rmi -f $(docker images -q)