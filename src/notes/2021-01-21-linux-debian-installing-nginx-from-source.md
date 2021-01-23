---
layout: note.njk
tags: notes
number : 10
title: Сборка nginx из исходников на debian 10
description: Собираем nginx из исходных кодов
date: 2021-01-21 23:00:00 +3
main_image: /assets/images/notes/10/main.png
gradient_image: /assets/images/notes/10/gradient.png
color: 996666
color_rgba: rgba(153, 102, 102, 10)
themes: linux nginx
---

Теперь соберем веб-сервер nginx из исходников.

## Загрузка и распаковка

Идем на [официальный сайт](https://nginx.org/) и скачиваем исходники последней версии.

Последняя версия на текущий момент (январь 2021) 1.19.6

```shell
wget https://nginx.org/download/nginx-1.19.6.tar.gz
```

Распаковываем и переходим в эту папку.

```shell
tar xvf nginx-1.19.6.tar.gz
cd nginx-1.19.6
```

Сборка настраивается командой `configure`. 

Она определяет особенности системы и набор модулей с которыми будет собран nginx.
В конце будет создан Makefile. 

## Сборка и запуск

Создаем папку куда и будем ставить nginx.

```shell
mkdir nginx
```

Конфигурируем с минимальными настройками и собираем.

```shell
./configure --prefix=/home/alex/nginx
```

```shell
make
make install
```

В итоге получаем такую структуру.

```shell
ls -1
conf
html
logs
sbin
```

Запускаем.

```shell
/home/alex/nginx/sbin/nginx
```

Проверяем в браузере, должны увидеть стандартную заглушку.

<figure>
  <img src="/assets/images/notes/10/welcome-nginx.png" alt="nginx"  data-action="zoom">
</figure>

Останавливаем сервер. 

```shell
/home/alex/nginx/sbin/nginx -s stop
```

## Обработка php

Теперь нужно научить nginx обрабатывать php файлы.

php-fpm мы собирали в [статье](https://lexusalex.ru/notes/2021-01-16-linux-debian-installing-php-fpm/).

Создадим файл для проверки работоспособности, в данном случае это `/home/alex/nginx/html/index.php` с содержимым.

```php
<?php
    phpinfo();
?>
```

Открываем конфигурационный файл nginx.

```shell
vim /home/alex/nginx/conf/nginx.conf
```

И в секции `server` в блоке `location` пропишем следующих строчки

```nginx
location ~ \.php$ {
    root           html;
    fastcgi_pass   127.0.0.1:9001;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    include        fastcgi_params;
}
```

Перезапускаем nginx идем в браузер

```shell
sudo /home/alex/nginx/sbin/nginx -s reload
```

<figure>
  <img src="/assets/images/notes/10/php-fpm.png" alt="php-fpm"  data-action="zoom">
</figure>

## Итог

В итоге мы увидели как быстро и просто можно собрать веб сервер nginx из исходников.

Так же прикрутили туда php-fpm.

Более продвинутая настройка, уже выходит за рамки данной статьи, возможно при моем желании напишу об этом.