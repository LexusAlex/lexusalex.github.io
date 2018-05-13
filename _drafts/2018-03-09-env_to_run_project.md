---
layout: post
title:  Среда для запуска проектов
date:   2018-01-30
author: Алексей Шмелев
categories: development
comments: true
cover:  "/assets/hello/hello.jpg"
---

Долго тестируя различные варианты

docker pull phpearth/php:7.2-apache
docker pull bianjp/mariadb-alpine

docker build --tag scratch .

docker run --rm -ti -p 80:80 -d phpearth/php:7.2-apache /bin/ash

docker run --name custom-php-container -p 80:80 -d custom-php

docker run --name scratch -p 80:80 -d -v "$PWD":/var/www/localhost/htdocs scratch:latest

docker run --name scratch-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=scratch -v "$PWD"/mysql-data:/var/lib/mysql -d bianjp/mariadb-alpine


docker exec -i -t scratch /bin/bash

docker pull bianjp/mariadb-alpine

базовые образы
~~~bash
phpearth/php            7.2-apache          31faeb624356        36 hours ago        34.5MB
bianjp/mariadb-alpine   latest              3a62a7424a1c        2 months ago        199MB

~~~

