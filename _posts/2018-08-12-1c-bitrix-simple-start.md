--- 
layout: post 
title: 1C-битрикс быстрый старт в докере
permalink: 1c-bitrix-simple-start
tags: 1c-bitrix php linux docker
--- 

![1c-bitrix](/assets/images/2018-08-12-1c-bitrix-simple-start/1C-Bitrix.png "1c-bitrix")
Приходится работать с Битриксом. Для того чтобы быстро развернуть окружение для разработки в современном мире принято использовать [docker](https://www.docker.com/)

Не вдаваясь в подробности работы с докером, это тема отдельной статьи, можно сказать что это такой способ развернуть любой проект.


## Как развернуть

**Установка докер**

Здесь все зависит от вашей ОС, я работаю в Ubuntu(что и вам советую) в моем случае инструкция здесь [https://docs.docker.com/install/linux/docker-ce/ubuntu/](https://docs.docker.com/install/linux/docker-ce/ubuntu/), для windows и macOS есть отдельные инcталяторы

Проверим, что докер установлен:

~~~bash
docker -v
Docker version 17.05.0-ce, build 89658be
~~~

На этом установка закончена

**Клонирование репозитория**

Склонировать мой репозиторий [https://github.com/LexusAlex/bitrix-scratch](https://github.com/LexusAlex/bitrix-scratch)

Клонируем его куда-нибудь на свой диск 
`git clone https://github.com/LexusAlex/bitrix-scratch bitrix-project`

**Запуск**

Репозиторий состоит из директорий и файлов

~~~bash
bin bash скрипты
    composer.sh запуск composer при необходимости
    init.sh инициализация
    phpunit.sh запуск phpunit при необходимости
    start.sh старт контейнеров
    stop.sh остановка контейнеров
Dockerfile инструкция по разворачиванию По на сервере
httpd.conf конфиг apache2
php.ini конфиг php
README.md
test.php phpinfo
~~~

достаточно выполнить `./bin/init.sh`, далее докер все сделает сам

**Установка битрикс**

После того когда все установилось, можно приступать к установке чистого битрикса.

Нужно открыть файл установки который лежит по адресу [http://127.0.0.1/bitrixsetup.php](http://127.0.0.1/bitrixsetup.php), установить 1с-bitrix

В процессе установки будут запрошены данные для базы данных, в данном случае они такие:

1. хост: bitrix-scratch-db
1. имя бд : bitrix-scratch
1. имя пользователя : root
1. пароль : root
1. выставить максимальные права на папки и файлы : 0777


Установка завершена, для запуска контейнеров исльзовать скрипт `./bin/start.sh` , для остановки `./bin/stop.sh`



## Под капотом

Вся магия состоит в файле `./bin/init.sh`, разберем его построчно

Создаем образ основываясь на Dockerfile в корне, при этом будет скопирован наш конфиг `php.ini` и `httpd.conf` внутрь контейнера

~~~bash
docker build --tag lexusalex/bitrix-scratch .
~~~

Создаем контейнер для базы данных основывыясь на образе bianjp/mariadb-alpine, 
при этом пробрасывая внутрь хост машины директорию с данными mysql `/home/alex/docker/bitrix-scratch/mysql-data`, ее меняем на свою, здесь указываем порты, имя пользователя бд,название бд
~~~bash
docker run --name bitrix-scratch-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=bitrix-scratch -v /home/alex/docker/bitrix-scratch/mysql-data:/var/lib/mysql -d bianjp/mariadb-alpine
~~~

Запускаем наш контейнер из образа `lexusalex/bitrix-scratch`, тоже указываем порт, директорию внутри хост машины, откуда будут подхватываться файлы

~~~bash
docker run --name bitrix-scratch --link bitrix-scratch-db -p 80:80 -d -v "$PWD":/var/www/localhost/htdocs lexusalex/bitrix-scratch
~~~

Заходим внутрь контейнера `bitrix-scratch` , скачиваем `bitrixsetup.php` и меняем права, чтобы не было проблем

~~~bash
docker exec -ti bitrix-scratch sh -c "cd /var/www/localhost/htdocs && wget -P /var/www/localhost/htdocs/ https://www.1c-bitrix.ru/download/scripts/bitrixsetup.php && chmod 777 -R /var/www/localhost/htdocs"
~~~

Вот таким вот образом, легко и просто можно развернуть битрикс, не засоряя при этом хост машину ненужными пакетами. 


## Итог

Мы тут конечно не учитывали особенности каждого конкретного проекта, здесь все настравивается и конфигурируется.

В итоге развернуть чистый битрикс занимает буквально несколько минут, при этом особо его не настраивая.

----

