---
layout: default
nav_order: 16
permalink: 16-linux-lemp
title: Установка php nginx mariadb на Debian 10
description: Заметка об установке LEMP стека на linux
date: 2021-02-28 21:20:00 +3
parent: Заметки
themes: linux php mariadb nginx
---

# Установка php nginx mariadb на Debian 10
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

Итак, имеем только что установленный чистый Debian.

## Подготовка

Подключимся к нему по ssh

```shell
ssh test@0.0.0.0
```

Установим программу `sudo` и добавим в группу нашего пользователя и пере зайдем в систему.

> Программа sudo уже может быть установлена на сервере

```shell
su -
apt-get install sudo
/sbin/usermod -aG sudo alex
exit
exit
```

Обновим пакеты.

```shell
sudo apt-get update
```

Установим необходимые программы.

```shell
sudo apt-get install vim htop git curl wget unzip zip gcc build-essential make
```

Откроем конфиг ssh `sudo vim /etc/ssh/sshd_config`.

Добавим или раскоментируем следующие настройки:

```text
AllowUsers alex # Разрешаем заходить на сервер только пользователю alex
PermitRootLogin no # Не разрешаем логиниться пользователю root
```

Перезагружаем демон ssh

```shell
sudo service ssh restart
```

Можно установить другой shell как замену bash - это по желанию.

```shell
sudo apt-get install zsh

sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

Так же добавим сразу ssh ключ, чтобы каждый раз не вводить пароль.

У меня ключи уже сгенерированы, просто скопируем публичный ключ на удаленный сервер командой.

```shell
ssh-copy-id alex@192.168.88.222
```

## MariaDb

Ставим базу данных

```shell
sudo apt install mariadb-server mariadb-client
sudo mysql_secure_installation
```

Заходим в бд и создаем тестовую базу и пользователя.

```shell
sudo mariadb -u root
CREATE DATABASE new_db COLLATE 'utf8_general_ci';
CREATE USER new_db IDENTIFIED BY 'password';
GRANT ALL privileges ON new_db .* TO new_db;
```

Подключаемся.

```shell
sudo mariadb -u new_db -p
```

## Nginx и PHP

Ставим nginx

```shell
sudo apt-get install nginx
```

Теперь php.

```shell
sudo apt install php-fpm php-mysql php-mbstring

sudo vim /etc/nginx/sites-available/default
```

Проверяем работоспособность

```text
location ~ \.php$ {
   include snippets/fastcgi-php.conf;
   fastcgi_pass unix:/run/php/php7.3-fpm.sock;
}
location ~ /\.ht {
   deny all;
}
```

```shell
sudo nginx -t
sudo systemctl reload nginx
sudo chown alex:alex html
vim index.php 

<?php
phpinfo();
?>
```

## Новый виртуальный хост

Создадим новый виртуальный хост.

В каталоге `/etc/nginx/sites-available` создадим файл хоста `sudo touch test.com`:

```text
server {
    server_name test.com www.test.com;
    listen 80;
    charset utf-8;
    index index.php;
    root /var/www/test.com;
    server_tokens off;

    location / {
        try_files $uri /index.php?$args;
    }

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/run/php/php7.3-fpm.sock;
        fastcgi_index index.php;
        fastcgi_read_timeout 300;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }
}
```

Активируем хост и проверим.

```shell
sudo ln -s /etc/nginx/sites-available/test.com /etc/nginx/sites-enabled/
```

```shell
sudo systemctl reload nginx
sudo chown alex:alex test.com
vim index.php 

test.com
```

Для проверки на своем компьютере отредактируем файл `hosts` добавим строку вроде `0.0.0.0 test.com` и проверяем в браузере

набрав `http://test.com` должна открыться страница с этого хоста.

