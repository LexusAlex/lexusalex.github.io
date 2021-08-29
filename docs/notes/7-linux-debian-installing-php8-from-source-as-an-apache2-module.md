---
layout: default
nav_order: 7
permalink: 7-linux-debian-installing-php8-from-source-as-an-apache2-module
title: Сборка php 8 из исходников на Debian 10
description: Собираем php 8 под веб сервер Apache 2
date: 2021-01-08 17:50:00 +3
parent: Заметки
tags:
- linux
- php
---

# Сборка php 8 из исходников на Debian 10
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

## Вступление

Недавно (26.10.2020) php обновился на версию 8.

Попробуем собрать и запустить интерпретатор php как модуль под веб сервер apache2.

Предполагается что apache2 уже установлен на сервере.

Как собрать apache2 из исходников читайте в [статье](https://lexusalex.ru/6-linux-debian-installing-apache2-from-source).

## Загрузка и распаковка

Скачаем исходники текущей стабильной версии php на сервер c [официального сайта](https://www.php.net/downloads).

_07.01.2021 вышла версия php 8.0.1_

```shell
wget https://www.php.net/distributions/php-8.0.1.tar.gz
```

Распакуем архив и перейдем директорию с исходниками `php-8.0.1`

```shell
tar xvf php-8.0.1.tar.gz
cd php-8.0.1
```

Так же создадим директорию `php8` куда его будем ставить.

К текущему состоянию структура домашнего каталога выглядит так:

```shell
ls -1
apache2
httpd-2.4.46
httpd-2.4.46.tar.gz
php8
php-8.0.1
php-8.0.1.tar.gz
```

## Подготовка

Большинство библиотек уже должны быть установлены на сервере.
Мы поставили их когда, собирали [apache2](https://lexusalex.ru/notes/2021-01-04-linux-debian-installing-apache2-from-source/).

Теперь установим недостающие без которых будет ошибка при конфигурировании.

```shell
sudo apt install libsqlite3-dev libonig-dev
```

Так же может потребоваться установить следующие библиотеки.

```shell
sudo apt install -y pkg-config bison re2c libxml2-dev
```

## Конфигурирование

Конфигурируем с помощью скрипта `.\configure` с минимально возможными параметрами, в последствии можно перезапустить скрипт
с измененными параметрами.

```shell
./configure --prefix=/home/alex/php8 --with-apxs2=/home/alex/apache2/bin/apxs --with-config-file-path=/home/alex/php8/config --with-mysqli=mysqlnd --with-pdo-mysql=mysqlnd --enable-mbstring
```
Где

- --prefix - директория куда ставить php, для простоты ставим все в один домашний каталог
- --with-apxs2 - Инструмент для создания модулей расшрения сервера apache2, он и создаст нам модуль для php8
- --with-config-file-path - Куда сохранить фаил php.ini
- --with-mysqli - Добавить поддержку mysqli
- --with-pdo-mysql - Добавить поддержку pdo-mysql
- --enable-mbstring - Включить mbstring

Подробнее об опциях в [документации](https://www.php.net/manual/ru/configure.about.php)

Запускаем команду.

В конце конфигурирования должно отобразиться сообщение о лицензии и в директории с исходниками создаться `Makefile`.

```shell
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

## Сборка

Пришло время собрать php и очистить временные файлы.

```shell
make install
```

Ждем пока завершится процесс компиляции (~минут 10).

Далее очищаем временные файлы.

```shell
make clean
```

Проверяем что php работает.

```shell
/home/alex/php8/bin/php -v
PHP 8.0.1 (cli) (built: Jan  8 2021 15:39:03) ( ZTS )
Copyright (c) The PHP Group
Zend Engine v4.0.1, Copyright (c) Zend Technologies
```

Скопируем конфигурацию php.ini из директории с исходниками в собранный каталог.

```shell
cp /home/alex/php-8.0.1/php.ini-development /home/alex/php8/config/php.ini
```

## httpd.conf

php работает теперь нужно настроить apache.

В конце сборки, должен быть создан модуль для apache2, о чем свидетельствуют следующие строки в конце вывода.

```text
chmod 755 /home/alex/apache2/modules/libphp.so
[activating module `php' in /home/alex/apache2/conf/httpd.conf]
```

Откроем файл конфигурации apache2 `/home/alex/apache2/conf/httpd.conf` и найдем строчку подключения модуля php `LoadModule php_module         modules/libphp.so`

```shell
vim /home/alex/apache2/conf/httpd.conf
```

Далее под подключением модуля добавим в конфиг поддержку типов с расширением php.

```text
<FilesMatch \.php$> 
    SetHandler application/x-httpd-php 
</FilesMatch>
<FilesMatch "\.phps$">
    SetHandler application/x-httpd-php-source
</FilesMatch>
```

Перезапускам apache2.

```shell
sudo /home/alex/apache2/bin/apachectl -k restart
```

Для проверки работоспособности в корне веб сервера переименовываем `index.html` в `index.php` и добавляем код проверки.

```php
<?php 
    phpinfo(); 
?> 
```

Запускам через браузер.

<figure>
  <img src="/assets/images/notes/7/php8.1.png" alt="php 8.1"  data-action="zoom">
</figure>

Если видим страницу с настройками php, то все в порядке.

## Пересборка

Если нужно как, то изменить конфигурацию, php можно пересобрать.

Добавим поддержку трех расширений `calendar intl soap` которых у нас нет.

Это делается теми же командами, что и выше.

```shell
./configure --prefix=/home/alex/php8 --with-apxs2=/home/alex/apache2/bin/apxs --with-config-file-path=/home/alex/php8/config --with-mysqli=mysqlnd --with-pdo-mysql=mysqlnd --enable-mbstring --enable-soap --enable-calendar --enable-intl
make
make install
make clean
```

Если вы не очищали каталог командой `make clean`, то сборка будет происходить быстрее.

На этом сборка php 8 из исходников завершена.

## Итог

В итоге надеюсь, получилось разобраться как собрать минимальную сборку php 8.1 из исходников.

Конечно есть куда стремиться, я хотел показать именно минимальную сборку с относительно не сложной установкой.