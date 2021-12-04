---
layout: default
nav_order: 27
permalink: 27-debian-install-php8.1
title: Установка php 8.1 на Debian
parent: Заметки
description: Заметка про установку php 8.1
date: 2021-11-30 18:00:00 +3
tags:
- php
- linux
- debian
---

Совсем недавно, а именно 25.11.2021 вышел стабильный релиз php 8.1

Сегодня установим его сначала из репозитория debian, а затем из исходников.

Настройку debian мы пропустим, для этого вскоре будет отдельная статья.

## Установка из репозитория debian

Наверное - это самый распространенный способ установки php.

Установим необходимое программное обеспечение:

```shell
sudo apt update
sudo apt install apt-transport-https lsb-release ca-certificates
```

Скачаем открытый ключ сервера:

```shell
sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
```

Добавим репозиторий с последними версиями языка:

```shell
sudo sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'
```

Установим из него php 8.1 с каким-то стандартным набором пакетов:

```shell
sudo apt update
sudo apt install php8.1-cli php8.1-fpm php8.1-bz2 php8.1-mysql php8.1-readline php8.1-intl php8.1-mbstring php8.1-xml php8.1-bcmath php8.1-curl php8.1-gd php8.1-zip
```

После установки, проверим, что у нас установлен свежий билд:

```shell
php -v

PHP 8.1.0 (cli) (built: Nov 25 2021 20:48:52) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.1.0, Copyright (c) Zend Technologies
with Zend OPcache v8.1.0, Copyright (c), by Zend Technologies
```

Проверим так же работу `php-fpm`. Для этого установим стандартную конфигурацию веб сервера `nginx`:

```shell
sudo apt install nginx # Установим сервер
sudo vim /etc/nginx/sites-available/default # Откроем файл

# Вставим директиву location
location ~ \.php$ {
   include snippets/fastcgi-php.conf;
   fastcgi_pass unix:/run/php/php8.1-fpm.sock;
}

# Отредактируем директиву index, вставим в конец index.php
index index.html index.htm index.nginx-debian.html index.php;

sudo nginx -t # Провем работоспособность конфига
sudo systemctl reload nginx # Ребутнем сервер
sudo rm /var/www/html/index.nginx-debian.html # Удалим файл
vim index.php # Создадим проверочный файл

# Со следующем содержимым
<?php
phpinfo();
?>
```

Проверяем в браузере, если видим нечто подобное, тогда php-fpm работает правильно:

<figure>
  <img src="/assets/images/notes/27/php8.1.png" alt="php8.1"  data-action="zoom">
</figure>

## Установка из исходных кодов

Менее распространенный способ, но тоже имеющий право на жизнь - это установка из исходников.

## Загрузка исходников

Первое, что нужно сделать это скачать архив с исходниками с [официального сайта](https://www.php.net/downloads).

В данном случае - это [https://www.php.net/distributions/php-8.1.0.tar.gz](https://www.php.net/distributions/php-8.1.0.tar.gz)

Найдем каталог куда поставить, это не важно выбирайте куда угодно. 

Например, я буду ставить в домашнюю директорию `/home/alex`.

```shell
cd /home/alex
```

Скачаем сами исходники:

```shell
wget https://www.php.net/distributions/php-8.1.0.tar.gz
```

### Распаковка

Теперь распакуем архив и перейдем в распакованную директорию:

```shell
tar xvf php-8.1.0.tar.gz
cd php-8.1.0
```

### Зависимости для сборки

Теперь поставим пакеты для сборки php.

```shell
sudo apt update
sudo apt install pkg-config build-essential autoconf bison re2c libxml2-dev libsqlite3-dev
```

### Директория для сборки

Ставить будем все в одну директорию, создадим ее:

```shell
mkdir php8.1
```

### Конфигурация

Далее перейдем в исходники и сгенерируем скрипт конфигурации:

```shell
./buildconf
buildconf: The configure script is already built. All done.
Run ./configure to proceed with customizing the PHP build.
```

Сконфигурируем указав директорию установки, со стандартными параметрами.

```shell
./configure --prefix=/home/alex/php8.1
```

По окончанию конфигурирования должен появится текст

```text
+--------------------------------------------------------------------+
| License:                                                           |
| This software is subject to the PHP License, available in this     |
| distribution in the file LICENSE. By continuing this installation  |
| process, you are bound by the terms of this license agreement.     |
| If you do not agree with the terms of this license, you must abort |
| the installation process at this point.                            |
+--------------------------------------------------------------------+

Thank you for using PHP.
```

### Сборка

Начинаем сборку

```shell
make -j4

Build complete.
Don't forget to run 'make test'.

make install
```


```shell
./configure --prefix=/home/alex/php8.1 --enable-fpm --with-config-file-path=/home/alex/php8-fpm/config --with-config-file-scan-dir=/home/alex/php8-fpm/config/conf.d --with-mysqli=mysqlnd --with-pdo-mysql=mysqlnd --enable-mbstring
```