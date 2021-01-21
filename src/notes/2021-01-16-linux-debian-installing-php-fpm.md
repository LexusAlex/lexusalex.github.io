---
layout: note.njk
tags: notes
number : 9
title: Сборка php-fpm 8.1 из исходников на debian 10
description: Собираем менеджер приложений php-fpm
date: 2021-01-16 23:30:00 +3
main_image: /assets/images/notes/9/main.png
gradient_image: /assets/images/notes/9/gradient.png
color: 8EBA43
color_rgba: rgba(142, 186, 67, 10)
themes: linux php
---

В предыдущих статьях мы ставили php как модуль для сервера apache, то есть в данном случае php и apache работают как одно целое.

Существует также режим запуска php, как отдельного процесса. Режимом запуска управляет менеджер процессов FastCGI (FPM) или php-fpm.

По умолчанию, он взаимодействует с веб-сервером через порт 9000 или сокетный файл.

Процесс установки php под apache я расписал в [статье](https://lexusalex.ru/notes/2021-01-08-linux-debian-installing-php8.1-from-source-as-an-apache2-module/).

## Подготовка

Удалим распакованные исходники оставшихся от прошлых сборок php. Развернем еще раз.

```shell
rm -rf php-8.0.1
tar xvf php-8.0.1.tar.gz
```

Создадим директорию откуда будет работать менеджер php-fpm, и перейдем в директорию с исходниками.

```shell
mkdir php8-fpm
cd php-8.0.1
```

## Конфигурирование и сборка

Конфигурируем с минимальными опциями.

```shell
./configure --prefix=/home/alex/php8-fpm --enable-fpm --with-config-file-path=/home/alex/php8-fpm/config --with-config-file-scan-dir=/home/alex/php8-fpm/config/conf.d --with-mysqli=mysqlnd --with-pdo-mysql=mysqlnd --enable-mbstring
```

Собираем.

```shell
make
make install
make clean
```

Перейдем в собранную директорию, со следующей структурой.

```shell
cd php8-fpm
ls -1
bin
etc
include
lib
php
sbin
var
```

## Настройка и запуск

Переименуем конфигурационные файлы.

```shell
mv /home/alex/php8-fpm/etc/php-fpm.conf.default /home/alex/php8-fpm/etc/php-fpm.conf
mv /home/alex/php8-fpm/etc/php-fpm.d/www.conf.default /home/alex/php8-fpm/etc/php-fpm.d/www.conf
```

Откроем файл конфигурации.

```shell
vim /home/alex/php8-fpm/etc/php-fpm.d/www.conf 
```

Внесем изменения в конфигурацию, исправим или раскоментируем строки.

```shell
user = daemon
group = daemon
listen = 127.0.0.1:9001
```

Запускаем. 

```shell
sudo ./home/alex/php8-fpm/sbin/php-fpm
```

Проверяем, что процесс запущен.

```shell
sudo netstat -tulpn | grep 9001
tcp        0      0 127.0.0.1:9001          0.0.0.0:*               LISTEN      63768/php-fpm: mast 
```

## Подключаем к apache 2

Для, того, чтобы проверить работоспособность php-fpm, подключим php-fpm в качестве application сервера к apache 2.

Откроем конфиг `/home/alex/apache2/conf.httpd.conf`, подключим два модуля и настроем обработку скриптов через `proxy:fcgi`

```apacheconf
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_fcgi_module modules/mod_proxy_fcgi.so

<FilesMatch \.php$> 
   SetHandler "proxy:fcgi://127.0.0.1:9001"
</FilesMatch>
```

Перезагружаемся и проверяем.

```shell
sudo /home/alex/apache2/bin/apachectl -k restart
```

<figure>
  <img src="/assets/images/notes/9/php-fpm.png" alt="php-fpm"  data-action="zoom">
</figure>

## Итог

Как видим собрать `php-fpm` не составляет особого труда. 

Главное здесь уметь искать информацию в документации.
