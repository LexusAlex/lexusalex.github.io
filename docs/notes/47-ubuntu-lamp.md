---
layout: default
nav_order: 47
permalink: 47-ubuntu-lamp
title: Установка lamp на ubuntu 22.04
parent: Заметки
description: Максимально быстро ставим и настраиваем lamp стек на ubuntu 22.04
date: 2023-03-12 17:20:00 +3
last_modified_date: 2023-03-12 17:20:00 +3
tags:
- linux
- php
- mariadb
- apache
---

# Установка lamp на ubuntu 22.04
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

Все зависит от задач поставленных перед сервером, но рекомендуется ставить последние версии пакетов.

## Установка и настройка ubuntu 22.04

Скачиваем последнюю версию (сейчас это 22.04.2 на 12.03.23), например с [ftp яндекса](https://ftp.yandex.ru/ubuntu-releases/22.04/)

Ставим, к примеру по вот этому мануалу [https://interface31.ru/tech_it/2022/10/linux-nachinayushhim-ustanovka-i-pervonachal-naya-nastroyka-ubuntu-2204-lts-dlya-servera.html](https://interface31.ru/tech_it/2022/10/linux-nachinayushhim-ustanovka-i-pervonachal-naya-nastroyka-ubuntu-2204-lts-dlya-servera.html)

Обратить внимание на разметку диска в томах lvm, в статье выше об этом сказано, нужно выставить том lvm на максимум.

Так же я сразу прокидываю свой ssh ключ `ssh-copy-id -i ~/.ssh/my_key_1_ed25519.pub alex@192.168.88.138`.

И логинюсь уже из с локальной машины `ssh alex@192.168.88.138`

Обновляем все, что можно до последних версий пакетов

```shell
sudo apt update
sudo apt upgrade
```

## Apache

```shell
sudo apt install apache2
apache2 -v
service apache2 status
```

Создадим виртуальный хост

```shell
sudo vim /etc/apache2/sites-available/mysite.local.conf
```

````text
<VirtualHost *:80>
    ServerName mysite.local
    ServerAdmin webmaster@localhost
        DocumentRoot /var/www/mysite.local/
        ErrorLog ${APACHE_LOG_DIR}/error.mysite.local.log
        CustomLog ${APACHE_LOG_DIR}/access.mysite.local.log combined
        <Directory /var/www/mysite.local/>
                Options -Includes -Indexes -ExecCGI
                AllowOverride All
        </Directory>
</VirtualHost>
````

Включим хост Ребутнем сервер

```shell
sudo a2ensite mysite.local.conf
sudo systemctl reload apache2
```

Создадим пользователя

```shell
sudo useradd -m mysite
sudo passwd mysite
456dafgwerzfDFG
sudo chsh -s /bin/bash mysite
sudo mkdir /var/www/mysite.local # создаем папку хоста или клонируем его
sudo chown -R mysite:mysite /var/www/mysite.local # меняем владельца
su mysite # заходим под ним
```

Добавляем в нужные группы пользователя web сервера

```shell
sudo usermod -a -G mysite www-data
sudo usermod -a -G www-data mysite
````

   
## MariaDb

```shell
sudo apt install mariadb-server mariadb-client
systemctl status mariadb
sudo systemctl start mariadb
sudo systemctl enable mariadb
sudo mysql_secure_installation
sudo mariadb -u root
```

Для настройки доступа из вне root меняем настройки

> С точки зрения настройки и создания баз данных доступ к root даем только для этого, после настройки
> рекомендуется закрыть доступ к root с других хостов или заблокировать учетную запись

````shell
sudo vim /etc/mysql/mariadb.conf.d/50-server.cnf
sudo service mariadb reload
````

````sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'ПАРОЛЬ' WITH GRANT OPTION;
````

````shell
sudo systemctl restart mysql
````

Подключаемся после этого любым клиентом, но больше всего мне нравиться phpmyadmin в докер контейнере, запустить его можно одной командой:

```shell
docker run --name phpmyadmin -d -e PMA_HOST=192.168.88.138 -p 8080:80 phpmyadmin
````

Если такой возможности нет, делаем все через консоль mariadb.

Создаем базу данных для сайта который нам нужен
 
````sql
CREATE DATABASE my_site_database DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
````
Создаем пользователя, который будет управлять этой БД, при необходимости запрещаем заходить с других хостов

```sql
CREATE USER 'my_site_database'@'%' IDENTIFIED BY 'mySuperSecretPassword';
````

Добавляем привилегии к базе данных, нашему новому пользователю

````sql
GRANT SELECT, INSERT, UPDATE, DELETE ON `my_site_database`.* TO 'my_site_database'@'%';
FLUSH PRIVILEGES;
````

Добавить/Удалить привилегии

```sql
GRANT CREATE ON `my_site_database`.* TO 'my_site_database'@'%';
REVOKE CREATE ON `my_site_database`.* TO 'my_site_database'@'%';
FLUSH PRIVILEGES;
```

!!! Важно, не забудьте убрать всех неиспользованных пользователей.

## Php

Мы будем ставить не последнюю версию php исключительно с технической точки зрения, но рекомендуется ставить всегда последнюю версию

```shell
sudo apt install software-properties-common ca-certificates lsb-release apt-transport-https
LC_ALL=C.UTF-8 sudo add-apt-repository ppa:ondrej/php
sudo apt update
sudo apt install php7.0 php7.0-mysql php7.0-mbstring php7.0-xml php7.0-curl libapache2-mod-php7.0 
```
 
## Итог

В простейшем случае - это все что нужно для запуска проекта на lamp, далее идут уже более специфичные вещи вроде как настройка сайта и оптимизация конфигов.
