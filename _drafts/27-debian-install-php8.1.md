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

Сегодня установим его сначала из репозитория debian, затем из исходников.

Установку и настройку debian мы пропустим, для этого вскоре будет отдельная статья.

## Установка из репозитория debian

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

Установим php 8.1:

```shell
sudo apt update
sudo apt install php8.1-cli php8.1-fpm php8.1-bz2 php8.1-mysql php8.1-readline php8.1-intl php8.1-mbstring php8.1-xml php8.1-bcmath php8.1-curl php8.1-gd php8.1-zip
```

После установки, стандартно проверим, что у нас установлен свежий билд

```shell
php -v

PHP 8.1.0 (cli) (built: Nov 25 2021 20:48:52) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.1.0, Copyright (c) Zend Technologies
with Zend OPcache v8.1.0, Copyright (c), by Zend Technologies
```

Проверим так же работу `php-fpm` для этого установим стандартную конфигурацию веб сервера `nginx`

```shell
sudo apt install nginx
sudo vim /etc/nginx/sites-available/default # Откроем файл

# Вставим директиву location
location ~ \.php$ {
   include snippets/fastcgi-php.conf;
   fastcgi_pass unix:/run/php/php8.1-fpm.sock;
}

# Отредактируем 
index index.html index.htm index.nginx-debian.html index.php;

sudo nginx -t # Провем конфиг
sudo systemctl reload nginx # Ребутнем сервер
sudo rm /var/www/html/index.nginx-debian.html # Удалим файл
vim index.php # Создадим проверочный файл

# С содержимым
<?php
phpinfo();
?>
```

Проверяем:

<figure>
  <img src="/assets/images/notes/27/php8.1.png" alt="php8.1"  data-action="zoom">
</figure>

## Установка из исходных кодов