---
layout: default
nav_order: 6
permalink: 6-linux-debian-installing-apache2-from-source
title: Сборка Apache 2 из исходников на Debian 10
description: Как собрать и запустить apache2 из исходников
date: 2021-01-04 23:50:00 +3
parent: Заметки
themes: linux apache2
---

# Сборка Apache 2 из исходников на Debian 10
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

Бывает необходимость в установке последней версии программного обеспечения, так как в репозиториях находится старая или неактуальная версия.

Для дистрибутивов на основе debian сделан собственный пакет веб сервера apache2.

```shell
apt-cache show apache2 | grep Version
Version: 2.4.38-3+deb10u4
```

Установка данного пакета приводит к полной установке Apache, включая файлы настройки, сценарии инициализации и поддержки.
При этом файлы будут помещены в разные каталоги файлового дерева, как решит разработчик.

Нам это не подходит, поэтому установим последнюю версию веб-сервера из исходников.

В последующих статьях именно так мы сможем разобраться как работает и устроен веб-сервер.

## Подготовка

Поставим следующие пакеты, которые нужны для сборки веб сервера.
Я ставлю по максимуму, с расчетом на расширение функциональности сервера. Системные требования к сборке указаны в [официальной документации](http://httpd.apache.org/docs/2.4/install.html#requirements)

```text
build-essential Компиляторы и программы для сборки в debian (libc6-dev libc-dev, gcc , g++ , make, dpkg-dev).
automake Пакет для работы с make файлами.
autoconf Пакет для работы с make файлами.
make Программа для управления генерацией исполняемых файлов и других файлов из исходного кода. 
bzip2 Cвободно доступный архиватор данных.
libapr1-dev Apache Portable Runtime Library.
libaprutil1-dev Apache Portable Runtime Utility Library.
libbrotli-dev Библиотека реализующая алгоритм brotli.
libcurl4-openssl-dev инструменты разработчика и документация для библиотеки libcurl (OpenSSL flavour).
libjansson-dev Библиотека для работы с json данными.
liblua5.2-dev Файлы для разработки для языка lua версия 5.2.
libnghttp2-dev Библиотека реализующая HTTP/2 протокол.
libpcre3-dev Библиотека для работы с регулярными выражениями.
libssl-dev Secure Sockets Layer toolkit - окружение для разработки.
libxml2-dev Файлы для работки библиотеки GNOME XML.
wget Утилита для получения файлов из сети.
zlib1g-dev Библиотека, реализующая метод сжатия deflate.
```

Здесь не будем заморачиваться с установкой из исходных кодов ставим все для сборки любых пакетов менеджером зависимостей `apt-get`.

```shell
sudo apt-get install build-essential automake autoconf make bzip2 libapr1-dev libaprutil1-dev libbrotli-dev libcurl4-openssl-dev libjansson-dev liblua5.2-dev libnghttp2-dev libpcre3-dev libssl-dev libxml2-dev wget zlib1g-dev
```
Проверить наличие того или иного пакета в системе можно командой:

```shell
dpkg --get-selections | grep ^wget
```

## Загрузка и распаковка

Скачаем исходники с [официального сайта](http://httpd.apache.org/download.cgi) в любую директорию на сервере.
Например, в домашнюю папку.

Сейчас январь 2021 года, последняя версия на данный момент 2.4.46, ее и будем ставить.

```shell
wget https://apache-mirror.rbc.ru/pub/apache//httpd/httpd-2.4.46.tar.gz
```

Распакуем и перейдем в эту директорию.

```shell
tar xvf httpd-2.4.46.tar.gz
cd httpd-2.4.46
```

## Конфигурирование

Теперь нужно сконфигурировать параметры учитывающие наше железо и другие опции.
Это делается скриптом `./configure`. Впоследствии он создает `Makefile`.

У скрипта `configure` множество [опций настройки](http://httpd.apache.org/docs/2.4/programs/configure.html).

Мы ставим все по умолчанию, за исключением места установки.
По умолчанию указан путь установки `/usr/local/apache2`, но так как это тестовый сервер укажем домашний каталог `/home/alex/apache2`.
На самом деле разницы тут нет.

```shell
./configure --prefix=/home/alex/apache2
```

После выполнения данной команды будет длинный вывод технической информации в завершении которого будет такой вывод:

```text
Server Version: 2.4.46
    Install prefix: /home/alex/apache2
    C compiler:     x86_64-linux-gnu-gcc
    CFLAGS:           -pthread  
    CPPFLAGS:         -DLINUX -D_REENTRANT -D_GNU_SOURCE  
    LDFLAGS:           
    LIBS:             
    C preprocessor: x86_64-linux-gnu-gcc -E
```

Это означает, что все в порядке, конфигурирование прошло успешно.

## Сборка и установка

Переходим к сборке.

Нужно собрать модули, бинарные файлы, документацию и прочие файлы в текущую директорию.

```shell
make
```
Процесс компиляции может длиться продолжительное время.

Осталось только установить, то есть перенести файлы в наш корневой каталог указанный при конфигурировании `/home/alex/apache2` и убрать за собой.

```shell
make install clean
```

Сервер установлен, проверим его версию.

```shell
/home/alex/apache2/bin/apachectl -v
Server version: Apache/2.4.46 (Unix)
Server built:   Jan  5 2021 01:27:10
```

## Запуск и остановка

Запустить сервер можно командой:

```shell
sudo /home/alex/apache2/bin/apachectl -k start
```

Проверить что сервер запущен можно командами:

```shell
netstat -tunla | grep LISTEN | grep 80
ps aux | grep httpd
```

Так же увидеть заветное `it works!` набрав ip адрес сервера в браузере на любом компьютере в вашей сети.

Остановить сервер можно командой `stop`

```shell
sudo /home/alex/apache2/bin/apachectl -k stop
```

## Автозагрузка при старте системы

В последних версиях Debian выпилили файл rc.local, который позволяет выполнять произвольные скрипты при запуске системы.
Добавим его обратно и научим его запускать apache.

Добавим файл `rc-local.service`

```shell
sudo vim /etc/systemd/system/rc-local.service
```
Добавим туда директивы

```text
[Unit]
Description=/etc/rc.local
ConditionPathExists=/etc/rc.local
 
[Service]
Type=forking
ExecStart=/etc/rc.local start
TimeoutSec=0
StandardOutput=tty
RemainAfterExit=yes
SysVStartPriority=99
 
[Install]
WantedBy=multi-user.target
```

Теперь создадим скрипт `rc.local`

```shell
sudo vim /etc/rc.local
```

Со следующим содержимым, где укажем команду на запуск сервера:

```shell
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.
 /home/alex/apache2/bin/apachectl -k start
exit 0
```

Выполняем команды на права, регистрацию и запуск сервиса

```shell
sudo chmod +x /etc/rc.local
sudo systemctl enable rc-local
sudo systemctl start rc-local
```

Перезагрузим систему, и проверим статус состояния сервиса.

```shell
sudo reboot
sudo systemctl status rc-local

rc-local.service - /etc/rc.local
   Loaded: loaded (/etc/systemd/system/rc-local.service; enabled; vendor preset: enabled)
  Drop-In: /usr/lib/systemd/system/rc-local.service.d
           └─debian.conf
   Active: active (running) since Tue 2021-01-05 13:53:23 MSK; 58s ago
  Process: 418 ExecStart=/etc/rc.local start (code=exited, status=0/SUCCESS)
 Main PID: 429 (httpd)
    Tasks: 82 (limit: 2330)
   Memory: 14.8M
   CGroup: /system.slice/rc-local.service
           ├─429 /home/alex/apache2/bin/httpd -k start
           ├─432 /home/alex/apache2/bin/httpd -k start
```

## Пересборка сервера

Посмотрим текущие подключенные модули.

```shell
sudo /home/alex/apache2/bin/apachectl -t -D DUMP_MODULES
Loaded Modules:
 core_module (static)
 so_module (static)
 http_module (static)
 mpm_event_module (static)
 authn_file_module (shared)
 authn_core_module (shared)
 authz_host_module (shared)
 authz_groupfile_module (shared)
 authz_user_module (shared)
 authz_core_module (shared)
 access_compat_module (shared)
 auth_basic_module (shared)
 reqtimeout_module (shared)
 filter_module (shared)
 mime_module (shared)
 log_config_module (shared)
 env_module (shared)
 headers_module (shared)
 setenvif_module (shared)
 version_module (shared)
 proxy_module (shared)
 proxy_fcgi_module (shared)
 unixd_module (shared)
 status_module (shared)
 autoindex_module (shared)
 dir_module (shared)
 alias_module (shared)
 php_module (shared)
````
Если необходимы другие модули, то сервер нужно пересобрать с ключом `--enable-mods-shared=reallyall`.

```shell
./configure --prefix=/home/alex/apache2 --enable-mods-shared=reallyall
make
make install
make clean
```

Раскоментировать строку подключения модуля в файле конфигуриации `/conf/httpd.conf`

```text
LoadModule proxy_fcgi_module modules/mod_proxy_fcgi.so
```

Перезагрузить сервер

```shell
sudo /home/alex/apache2/bin/apachectl -k restart
```

Подробнее https://gist.github.com/thuannvn/07b376a7ad5d12ac4456


## Итог

Мы показали как можно собрать и запустить последнюю версию веб сервера apache2 на debian 10.

Процедура не сложная, но требует некоторого кол-ва времени.

## Update

**16.01.2021**

- Добавлен раздел "Пересборка сервера"