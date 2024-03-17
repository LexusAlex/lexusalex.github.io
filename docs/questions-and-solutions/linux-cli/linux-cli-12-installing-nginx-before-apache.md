---
layout: default
nav_order: 12
permalink: linux-cli-12-installing-nginx-before-apache
title: Установка nginx перед apache
parent: linux-cli
grand_parent: Вопросы и решения
has_children: true
description: Ставим nginx как прокси apache
date: 2024-03-17 10:00:00 +3
last_modified_date: 2024-03-17 10:00:00 +3
tags:
- linux
- apache
- nginx
- questions-and-solutions
---

# Установка nginx перед apache
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

## Ставим apache

Можно поставить и последнюю версию, но мы поставим ту что есть в репозиториях.

```shell
# Установка
sudo apt install apache2
# Старт и включение сервиса
sudo systemctl start apache2
sudo systemctl enable apache2
# Проверка статуса
service apache2 status
```

Добавляем виртуальный хост

Сразу прописываем хост и порт `127.0.0.1:8080`

````apacheconf
# /etc/apache2/sites-available/crm.prod.conf
<VirtualHost 127.0.0.1:8080>
        ServerName crm.prod
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/crm.prod/public/
        ErrorLog ${APACHE_LOG_DIR}/error.crm.prod.log
        CustomLog ${APACHE_LOG_DIR}/access.crm.prod.log combined
        <Directory /var/www/crm.prod/public/>
                Options -Includes -Indexes -ExecCGI
                AllowOverride All
        </Directory>
</VirtualHost>
````

Создаем пользователя для хоста

````shell
sudo useradd -m crm
sudo passwd crm
superpass
sudo chsh -s /bin/bash crm
````

Далее создаем папки и файлы проекта от созданного пользователя.

Меняем сразу порт, чтобы nginx не ругался

````shell
# /etc/apache2/ports.conf
Listen 127.0.0.1:8080
````

Включаем хост и перезапускаем сервер

````shell
sudo a2ensite crm.prod.conf
sudo systemctl reload apache2
````

# Ставим nginx

Поставим последнюю стабильную версию. Команды с официального сайта

````shell
sudo apt install curl gnupg2 ca-certificates lsb-release ubuntu-keyring
curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
    | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" \
    | sudo tee /etc/apt/sources.list.d/nginx.list
echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" \
    | sudo tee /etc/apt/preferences.d/99nginx
sudo apt update
sudo apt install nginx
# Запускаем
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx
````

Конфиг хоста для 80 порта

````nginx configuration
server {
        server_name crm.prod;
        charset off;
        index index.php;
        access_log /var/log/nginx/crm.prod.access.log;
        error_log /var/log/nginx/crm.prod.error.log notice;


        ssi on;
        set $root_path /var/www/crm.prod/public;
        root $root_path;
        location / {
                location ~ [^/]\.ph(p\d*|tml)$ {
                        try_files /does_not_exists @fallback;
                }
                location ~* ^.+\.(jpg|jpeg|gif|png|svg|js|css|mp3|ogg|mpe?g|avi|zip|gz|bz2?|rar|swf|webp|woff|woff2)$ {
                        expires 24h;
                        try_files $uri $uri/ @fallback;
                }
                location / {
                        try_files /does_not_exists @fallback;
                }
                location ~ /\.ht {
                               deny all;
                }

    }
        location @fallback {
                                proxy_pass http://127.0.0.1:8080;
                                proxy_redirect http://127.0.0.1:8080 /;
                                proxy_set_header Host $host;
                                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                                proxy_set_header X-Real-IP $remote_addr;
                                proxy_set_header X-Forwarded-Proto $scheme;
                                proxy_set_header X-Forwarded-Port $server_port;
                                access_log off;
        }
        listen 80;
}
````

## Php

Ставим php нужной нам версии

````shell
sudo add-apt-repository ppa:ondrej/php
sudo apt-get install php7.1
php -v
````

Перезагружаем nginx и apache

````shell
sudo service nginx restart
sudo systemctl reload apache2
````

Проверяем хост уже все должно работать

Но счастье было бы не полным если у нас нет ssl сертификата.

## SSL

Создадим самоподписанный сертификат и сохраним ключи по нужным на путям

````shell
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/crm.prod.key -out /etc/ssl/certs/crm.prod.pem
````

Добавим еще одну директиву server в наш конфиг `nginx` и включим `http2` что идет из коробки

````nginx configuration
server {
        ssl_certificate /etc/ssl/certs/crm.prod.pem;
        ssl_certificate_key /etc/ssl/private/crm.prod.key;
        ssl_ciphers EECDH:+AES256:-3DES:RSA+AES:!NULL:!RC4;
        ssl_prefer_server_ciphers on;
        add_header Strict-Transport-Security "max-age=31536000;";
        ssl_protocols  TLSv1.2 TLSv1.3;
        charset off;
        index index.php;
        disable_symlinks if_not_owner from=$root_path;
        access_log /var/log/nginx/crm.prod.access.log;
        error_log /var/log/nginx/crm.prod.error.log notice;
        ssi on;
        set $root_path /var/www/crm.prod/public;

        root $root_path;
                location / {
                        location ~ [^/]\.ph(p\d*|tml)$ {
                                try_files /does_not_exists @fallback;
                }
                        location ~* ^.+\.(jpg|jpeg|gif|png|svg|js|css|mp3|ogg|mpe?g|avi|zip|gz|bz2?|rar|swf|webp|woff|woff2)$ {
                        expires max;
                        try_files $uri $uri/ @fallback;
                }

                        location / {
                                try_files /does_not_exists @fallback;
                }
                        location ~ /\.ht {
                               deny all;
                }

        }
        location @fallback {
                                proxy_pass http://127.0.0.1:8080;
                                proxy_redirect http://127.0.0.1:8080 /;
                                proxy_set_header Host $host;
                                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                                proxy_set_header X-Real-IP $remote_addr;
                                proxy_set_header X-Forwarded-Proto $scheme;
                                proxy_set_header X-Forwarded-Port $server_port;
                                access_log off;
        }
        listen 443 ssl http2;
}
````

Проверяем. Браузер должен ругнутся на самоподписанный сертификат, но открыть страницу по https по протоколу http2.

