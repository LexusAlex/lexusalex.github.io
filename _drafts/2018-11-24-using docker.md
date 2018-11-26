--- 
layout: post 
title: Использвание docker
permalink: test-code-phpunit
tags: php linux docker
comments: true

--- 

https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1

https://github.com/phpearth/docker-php

https://docs.docker.com/compose/install/#install-compose

ENTRYPOINT - запуск скрипта при запуске docker run
Скачать образ `docker pull phpearth/php:7.2-apache`


https://docs.docker.com/compose/compose-file/#stop_grace_period

docker-compose up -d
docker-compose build

docker-compose rm db


хрвним все в проекте, поэксперимертировать с запуском разных баз данных
~~~dockerfile
FROM phpearth/php:7.2-apache

CMD ["/usr/sbin/httpd", "-DFOREGROUND"]

~~~

Создать свой образ на основе другого docker build --tag lexusalex/php-sicp .

