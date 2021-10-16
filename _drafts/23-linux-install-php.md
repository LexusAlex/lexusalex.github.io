---
layout: default
nav_order: 23
permalink: 23-linux-install-php
title: Установка php
parent: Заметки
description: Разные способы установки php на сервер
date: 2021-10-16 18:00:00 +3
tags:
- linux
- php
- ansible
- docker
- debian
---

# Установка php
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

Набор команд для установки php на сервер разными способами

## Debian 11

Первой системой на которую будем ставить php станет debian 11. 

Скачаем свеженький дистрибутив с ftp сервера яндекса [https://mirror.yandex.ru/debian-cd/current/amd64/bt-cd/](https://mirror.yandex.ru/debian-cd/current/amd64/bt-cd/).

После установки, настроим

### Настройка

Первое, что нужно сделать установить программу `sudo` для нашего локального пользователя

```shell
su -
apt update
apt install sudo
/sbin/usermod -aG sudo alex
exit
exit
```

Теперь можно поставить и настроить необходимые пакеты

```shell
sudo apt update 
sudo apt install ssh vim -y
```

Если необходимо разрешить удаленное подключение пользователю `root`, нужно поправить настройки ssh.
Это можно сделать одной командой:

```shell
sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/g' /etc/ssh/sshd_config
```

Или ручками открыть файл `/etc/ssh/sshd_config` и отредактировать директиву `PermitRootLogin`, и перезагрузить службу `systemctl restart ssh`

Но у нас есть доступ из под нашего локального пользователя, что правильно.

Но каждый раз при подключении по ssh, вводить пароль напряжно, поэтому добавим возможность подключаться по ключу.

Для этого скопируем публичный ключ нашей машины на сервер.

```shell
ssh-copy-id -i ~/.ssh/id_rsa.pub alex@192.168.88.201
```

После этого можно заходить на сервер без использования пароля.

Еще один важный момент, задать статический ip для сервера. Для этого откроем файл `sudo vim /etc/network/interfaces` и
исправим интерфейс с `dhcp` на `static` в конце, пропишем строки:

```shell
iface ens33 inet static 
address 192.168.88.201 
gateway 192.168.88.1 
netmask 255.255.255.0 
```

Чтобы настройки применились, отправим сервер на перезагрузку.

С предварительной настройкой сервера закончили.

_В процессе работы этот раздел возможно будет дополнятся._

## Docker

Наверное самый простой способ запустить php скрипт - это docker.
Соответственно нужно поставить на сервер сам докер и более ничего.

Воспользуемся инструкцией по установке на [официальном сайте](https://docs.docker.com/engine/install/debian/#install-using-the-repository)
Там хорошо все описано, не вижу смысла копировать команды сюда, так как они могут измениться.

После установки возможно может понадобиться выполнить команды по установке прав.

```shell
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```

Проверяем что docker успешно установился.

```shell
docker -v
Docker version 20.10.9, build c2ea9bc
```

### Как работать с docker

В простейшем случае нужно скачать [готовый образ](https://github.com/docker-library/docs/tree/master/php) с docker hub.

Например, скачаем консольный вариант образа php `docker pull php:8.0`. Проверим

```shell
docker images
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
php          8.0       5fd676aeba6e   22 hours ago   476MB
```

Создадим файл `vim test.php` со следующим содержимым:

```injectablephp
<?php 
phpinfo(); 
?>
```

Запускать скрипты можно, таким образом:

```shell
docker run -it --rm --name my-test-script -v "$PWD":/usr/src/myapp -w /usr/src/myapp php:8.0 php test.php
```

Или например проверим версию php:

```shell
docker run -it --rm --name my-test-script -v "$PWD":/usr/src/myapp -w /usr/src/myapp php:8.0 php -v
PHP 8.0.11 (cli) (built: Oct 14 2021 21:21:21) ( NTS )
Copyright (c) The PHP Group
Zend Engine v4.0.11, Copyright (c) Zend Technologies
```

Docker - это мощная технология которая используется для локальной разработки. При этом все процессы изолированы и
запускаются внутри контейнера docker.

## Debian repository

Самый распространенный вариант установки - это установка из пакетов

### Добавление репозитория

Установим необходимое ПО. Вероятнее всего это все уже должно стоять на сервере

```shell
sudo apt update
sudo apt install apt-transport-https lsb-release ca-certificates
```

Скачаем открытый ключ сервера

```shell
sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
```

И добавим репозиторий

```shell
sudo sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'
```

### Установка php

Установим сам php + наиболее часто используемые расширения

```shell
sudo apt update
sudo apt install php8.0-cli php8.0-fpm php8.0-bz2 php8.0-mysql php8.0-readline php8.0-intl php8.0-mbstring php8.0-xml php8.0-bcmath php8.0-curl php8.0-gd php8.0-zip
```

Проверяем 

```shell
php -v
PHP 8.0.11 (cli) (built: Sep 23 2021 22:04:05) ( NTS )
Copyright (c) The PHP Group
Zend Engine v4.0.11, Copyright (c) Zend Technologies
    with Zend OPcache v8.0.11, Copyright (c), by Zend Technologies
```

## Source code

Из исходных кодов php мы уже собирали в [январской заметке](https://lexusalex.ru/9-linux-debian-installing-php-fpm).

Сегодня мы повторим процесс и соберем php-fpm последней стабильной версии (На 16.10.2021 - это 8.0.11)

### Скачать и распаковать исходники

Скачаем, распакуем и перейдем в распакованную директорию

```shell
wget https://www.php.net/distributions/php-8.0.11.tar.gz
tar xvf php-8.0.11.tar.gz
cd php-8.0.11
```

### Подготовка

Теперь установим требуемое программное обеспечение для сборки php. Пакеты могут меняться, пока ставим все скопом.

```shell
sudo apt install \
 pkg-config \
 build-essential \
 autoconf \
 re2c \
 bison \
 libsqlite3-dev \
 libpq-dev \
 libonig-dev \
 libfcgi-dev \
 libfcgi0ldbl \
 libjpeg-dev \
 libpng-dev \
 libssl-dev \
 libxml2-dev \
 libcurl4-openssl-dev \
 libxpm-dev \
 libgd-dev \
 libmariadb-dev \
 libfreetype6-dev \
 libxslt1-dev \
 libpspell-dev \
 libzip-dev \
 libgccjit-10-dev
```

Сгенерируем скрипт `configure` запуском `./buildconf`.

Все к сборке готово.

### Сборка

Перед тем как собирать, выведем все опции с которыми можно собрать php-fpm из исходников.

Опций очень много, оставлю только опциональные настройки, модули и расширения.

Для удобства запуска все будем ставить в отдельную директорию.

```shell
./configure --help

Optional Features and Packages:
  --disable-option-checking  ignore unrecognized --enable/--with options
  --disable-FEATURE       do not include FEATURE (same as --enable-FEATURE=no)
  --enable-FEATURE[=ARG]  include FEATURE [ARG=yes]
  --with-PACKAGE[=ARG]    use PACKAGE [ARG=yes]
  --without-PACKAGE       do not use PACKAGE (same as --with-PACKAGE=no)
  --with-libdir=NAME      Look for libraries in .../NAME rather than .../lib
  --disable-rpath         Disable passing additional runtime library search
                          paths
  --enable-re2c-cgoto     Enable -g flag to re2c to use computed goto gcc
                          extension
  --disable-gcc-global-regs
                          whether to enable GCC global register variables

SAPI modules:

  --with-apxs2[=FILE]     Build shared Apache 2 handler module. FILE is the
                          optional pathname to the Apache apxs tool [apxs]
  --disable-cli           Disable building CLI version of PHP (this forces
                          --without-pear)
  --enable-embed[=TYPE]   EXPERIMENTAL: Enable building of embedded SAPI
                          library TYPE is either 'shared' or 'static'.
                          [TYPE=shared]
  --enable-fpm            Enable building of the fpm SAPI executable
  --with-fpm-user[=USER]  Set the user for php-fpm to run as. (default:
                          nobody)
  --with-fpm-group[=GRP]  Set the group for php-fpm to run as. For a system
                          user, this should usually be set to match the fpm
                          username (default: nobody)
  --with-fpm-systemd      Activate systemd integration
  --with-fpm-acl          Use POSIX Access Control Lists
  --with-fpm-apparmor     Support AppArmor confinement through libapparmor
  --enable-fuzzer         Build PHP as clang fuzzing test module (for
                          developers)
  --enable-fuzzer-msan    Enable msan instead of asan/ubsan when fuzzing
  --enable-litespeed      Build PHP as litespeed module
  --enable-phpdbg         Build phpdbg
  --enable-phpdbg-webhelper
                          Build phpdbg web SAPI support
  --enable-phpdbg-debug   Build phpdbg in debug mode
  --enable-phpdbg-readline
                          Enable readline support in phpdbg (depends on static
                          ext/readline)
  --disable-cgi           Disable building CGI version of PHP
  --with-valgrind         Enable valgrind support

General settings:

  --enable-gcov           Enable GCOV code coverage - FOR DEVELOPERS ONLY!!
  --enable-debug          Compile with debugging symbols
  --enable-debug-assertions
                          Compile with debug assertions even in release mode
  --enable-zts            Enable thread safety
  --enable-rtld-now       Use dlopen with RTLD_NOW instead of RTLD_LAZY
  --with-layout=TYPE      Set how installed files will be laid out. Type can
                          be either PHP or GNU [PHP]
  --with-config-file-path=PATH
                          Set the path in which to look for php.ini
                          [PREFIX/lib]
  --with-config-file-scan-dir=PATH
                          Set the path where to scan for configuration files
  --enable-sigchild       Enable PHP's own SIGCHLD handler
  --enable-libgcc         Enable explicitly linking against libgcc
  --disable-short-tags    Disable the short-form <? start tag by default
  --enable-dmalloc        Enable dmalloc
  --disable-ipv6          Disable IPv6 support
  --enable-dtrace         Enable DTrace support
  --enable-fd-setsize     Set size of descriptor sets
  --enable-werror         Enable -Werror
  --enable-memory-sanitizer
                          Enable memory sanitizer (clang only)

Extensions:

  --with-EXTENSION=shared[,PATH]

    NOTE: Not all extensions can be build as 'shared'.

    Example: --with-foobar=shared,/usr/local/foobar/

      o Builds the foobar extension as shared extension.
      o foobar package install prefix is /usr/local/foobar/


  --disable-all           Disable all extensions which are enabled by default
  --without-libxml        Build without LIBXML support
  --with-openssl          Include OpenSSL support (requires OpenSSL >= 1.0.1)
  --with-kerberos         OPENSSL: Include Kerberos support
  --with-system-ciphers   OPENSSL: Use system default cipher list instead of
                          hardcoded value
  --with-external-pcre    Use external library for PCRE support
  --with-pcre-jit         Enable PCRE JIT functionality
  --without-sqlite3       Do not include SQLite3 support.
  --with-zlib             Include ZLIB support (requires zlib >= 1.2.0.4)
  --enable-bcmath         Enable bc style precision math functions
  --with-bz2[=DIR]        Include BZip2 support
  --enable-calendar       Enable support for calendar conversion
  --disable-ctype         Disable ctype functions
  --with-curl             Include cURL support
  --enable-dba            Build DBA with bundled modules. To build shared DBA
                          extension use --enable-dba=shared
  --with-qdbm[=DIR]       DBA: QDBM support
  --with-gdbm[=DIR]       DBA: GDBM support
  --with-ndbm[=DIR]       DBA: NDBM support
  --with-db4[=DIR]        DBA: Oracle Berkeley DB 4.x or 5.x support
  --with-db3[=DIR]        DBA: Oracle Berkeley DB 3.x support
  --with-db2[=DIR]        DBA: Oracle Berkeley DB 2.x support
  --with-db1[=DIR]        DBA: Oracle Berkeley DB 1.x support/emulation
  --with-dbm[=DIR]        DBA: DBM support
  --with-tcadb[=DIR]      DBA: Tokyo Cabinet abstract DB support
  --with-lmdb[=DIR]       DBA: Lightning memory-mapped database support
  --without-cdb[=DIR]     DBA: CDB support (bundled)
  --disable-inifile       DBA: INI support (bundled)
  --disable-flatfile      DBA: FlatFile support (bundled)
  --disable-dom           Disable DOM support
  --with-enchant          Include Enchant support
  --enable-exif           Enable EXIF (metadata from images) support
  --with-ffi              Include FFI support
  --disable-fileinfo      Disable fileinfo support
  --disable-filter        Disable input filter support
  --enable-ftp            Enable FTP support
  --with-openssl-dir      FTP: Whether to enable FTP SSL support without
                          ext/openssl
  --enable-gd             Include GD support
  --with-external-gd      Use external libgd
  --with-webp             GD: Enable WEBP support (only for bundled libgd)
  --with-jpeg             GD: Enable JPEG support (only for bundled libgd)
  --with-xpm              GD: Enable XPM support (only for bundled libgd)
  --with-freetype         GD: Enable FreeType 2 support (only for bundled
                          libgd)
  --enable-gd-jis-conv    GD: Enable JIS-mapped Japanese font support (only
                          for bundled libgd)
  --with-gettext[=DIR]    Include GNU gettext support
  --with-gmp[=DIR]        Include GNU MP support
  --with-mhash            Include mhash support
  --without-iconv[=DIR]   Exclude iconv support
  --with-imap[=DIR]       Include IMAP support. DIR is the c-client install
                          prefix
  --with-kerberos         IMAP: Include Kerberos support
  --with-imap-ssl         IMAP: Include SSL support
  --enable-intl           Enable internationalization support
  --with-ldap[=DIR]       Include LDAP support
  --with-ldap-sasl        LDAP: Build with Cyrus SASL support
  --enable-mbstring       Enable multibyte string support
  --disable-mbregex       MBSTRING: Disable multibyte regex support
  --with-mysqli[=FILE]    Include MySQLi support. FILE is the path to
                          mysql_config. If no value or mysqlnd is passed as
                          FILE, the MySQL native driver will be used
  --with-mysql-sock[=SOCKPATH]
                          MySQLi/PDO_MYSQL: Location of the MySQL unix socket
                          pointer. If unspecified, the default locations are
                          searched
  --with-oci8[=DIR]       Include Oracle Database OCI8 support. DIR defaults
                          to $ORACLE_HOME. Use
                          --with-oci8=instantclient,/path/to/instant/client/lib
                          to use an Oracle Instant Client installation
  --with-odbcver[=HEX]    Force support for the passed ODBC version. A hex
                          number is expected, default 0x0350. Use the special
                          value of 0 to prevent an explicit ODBCVER to be
                          defined.
  --with-adabas[=DIR]     Include Adabas D support [/usr/local]
  --with-sapdb[=DIR]      Include SAP DB support [/usr/local]
  --with-solid[=DIR]      Include Solid support [/usr/local/solid]
  --with-ibm-db2[=DIR]    Include IBM DB2 support [/home/db2inst1/sqllib]
  --with-empress[=DIR]    Include Empress support $EMPRESSPATH (Empress
                          Version >= 8.60 required)
  --with-empress-bcs[=DIR]
                          Include Empress Local Access support $EMPRESSPATH
                          (Empress Version >= 8.60 required)
  --with-custom-odbc[=DIR]
                          Include user defined ODBC support. DIR is ODBC
                          install base directory [/usr/local]. Make sure to
                          define CUSTOM_ODBC_LIBS and have some odbc.h in your
                          include dirs. For example, you should define
                          following for Sybase SQL Anywhere 5.5.00 on QNX,
                          prior to running this configure script:
                          CPPFLAGS="-DODBC_QNX -DSQLANY_BUG" LDFLAGS=-lunix
                          CUSTOM_ODBC_LIBS="-ldblib -lodbc"
  --with-iodbc            Include iODBC support
  --with-esoob[=DIR]      Include Easysoft OOB support
                          [/usr/local/easysoft/oob/client]
  --with-unixODBC         Include unixODBC support
  --with-dbmaker[=DIR]    Include DBMaker support
  --disable-opcache       Disable Zend OPcache support
  --disable-huge-code-pages
                          Disable copying PHP CODE pages into HUGE PAGES
  --disable-opcache-jit   Disable JIT
  --enable-pcntl          Enable pcntl support (CLI/CGI only)
  --disable-pdo           Disable PHP Data Objects support
  --with-pdo-dblib[=DIR]  PDO: DBLIB-DB support. DIR is the FreeTDS home
                          directory
  --with-pdo-firebird[=DIR]
                          PDO: Firebird support. DIR is the Firebird base
                          install directory [/opt/firebird]
  --with-pdo-mysql[=DIR]  PDO: MySQL support. DIR is the MySQL base directory.
                          If no value or mysqlnd is passed as DIR, the MySQL
                          native driver will be used
  --with-zlib-dir[=DIR]   PDO_MySQL: Set the path to libz install prefix
  --with-pdo-oci[=DIR]    PDO: Oracle OCI support. DIR defaults to
                          $ORACLE_HOME. Use
                          --with-pdo-oci=instantclient,/path/to/instant/client/lib
                          for an Oracle Instant Client installation.
  --with-pdo-odbc=flavour,dir
                          PDO: Support for 'flavour' ODBC driver. The include
                          and lib dirs are looked for under 'dir'. The
                          'flavour' can be one of: ibm-db2, iODBC, unixODBC,
                          generic. If ',dir' part is omitted, default for the
                          flavour you have selected will be used. e.g.:
                          --with-pdo-odbc=unixODBC will check for unixODBC
                          under /usr/local. You may attempt to use an
                          otherwise unsupported driver using the 'generic'
                          flavour. The syntax for generic ODBC support is:
                          --with-pdo-odbc=generic,dir,libname,ldflags,cflags.
                          When built as 'shared' the extension filename is
                          always pdo_odbc.so
  --with-pdo-pgsql[=DIR]  PDO: PostgreSQL support. DIR is the PostgreSQL base
                          install directory or the path to pg_config
  --without-pdo-sqlite    PDO: sqlite 3 support.
  --with-pgsql[=DIR]      Include PostgreSQL support. DIR is the PostgreSQL
                          base install directory or the path to pg_config
  --disable-phar          Disable phar support
  --disable-posix         Disable POSIX-like functions
  --with-pspell[=DIR]     Include PSPELL support. GNU Aspell version 0.50.0 or
                          higher required
  --with-libedit          Include libedit readline replacement (CLI/CGI only)
  --with-readline[=DIR]   Include readline support (CLI/CGI only)
  --disable-session       Disable session support
  --with-mm[=DIR]         SESSION: Include mm support for session storage
  --enable-shmop          Enable shmop support
  --disable-simplexml     Disable SimpleXML support
  --with-snmp[=DIR]       Include SNMP support
  --enable-soap           Enable SOAP support
  --enable-sockets        Enable sockets support
  --with-sodium           Include sodium support
  --with-password-argon2[=DIR]
                          Include Argon2 support in password_*. DIR is the
                          Argon2 shared library path
  --enable-sysvmsg        Enable sysvmsg support
  --enable-sysvsem        Enable System V semaphore support
  --enable-sysvshm        Enable the System V shared memory support
  --with-tidy[=DIR]       Include TIDY support
  --disable-tokenizer     Disable tokenizer support
  --disable-xml           Disable XML support
  --with-expat            XML: use expat instead of libxml2
  --disable-xmlreader     Disable XMLReader support
  --disable-xmlwriter     Disable XMLWriter support
  --with-xsl              Build with XSL support
  --enable-zend-test      Enable zend-test extension
  --with-zip              Include Zip read/write support
  --enable-mysqlnd        Enable mysqlnd explicitly, will be done implicitly
                          when required by other extensions
  --disable-mysqlnd-compression-support
                          Disable support for the MySQL compressed protocol in
                          mysqlnd

PEAR:

  --with-pear[=DIR]       Install PEAR in DIR [PREFIX/lib/php]

Zend:

  --disable-zend-signals  whether to enable zend signal handling

TSRM:


Libtool:

  --enable-shared=PKGS    Build shared libraries default=yes
  --enable-static=PKGS    Build static libraries default=yes
  --enable-fast-install=PKGS
                          Optimize for fast installation default=yes
  --with-gnu-ld           Assume the C compiler uses GNU ld default=no
  --disable-libtool-lock  Avoid locking (might break parallel builds)
  --with-pic              Try to use only PIC/non-PIC objects default=use both
  --with-tags=TAGS        Include additional configurations automatic
```

Создадим директорию куда, будем собирать php

```shell
mkdir php-8.0.11-files
```

Выберем наиболее употребимые опции и настройки

```shell
sudo ./configure \
 --prefix=/home/alex/php-8.0.11-files \
 --with-config-file-path=/home/alex/php-8.0.11-files/config \
 --with-config-file-scan-dir=/home/alex/php-8.0.11-files/config/conf.d \
 --enable-cli \
 --enable-fpm \
 --enable-intl \
 --enable-mbstring \
 --enable-opcache \
 --enable-sockets \
 --enable-soap \
 --with-curl \
 --with-freetype \
 --with-fpm-user=www-data \
 --with-fpm-group=www-data \
 --with-jpeg \
 --with-mysql-sock \
 --with-mysqli=mysqlnd \
 --with-openssl \
 --with-pdo-mysql=mysqlnd \
 --with-xsl \
 --with-zlib
```

В конце должны получить сообщение

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

````

Теперь нужно собрать файлы. Это процесс уже более долгий.

```shell
sudo make

Build complete.
Don't forget to run 'make test'.

sudo make test
sudo make install
```

По окончании установки проверяем корректность установки

 - `./php-8.0.11-files/bin/php -v` - php cli
 -  `./php-8.0.11-files/sbin/php-fpm -v` - php-fpm

Версию установленную таким образом нужно дополнительно настраивать.

В результате в каталоге `/php-8.0.11-files/` получим скомпилированные файлы в каталогах

```shell
bin  etc  include  lib  php  sbin  var
```

Каталог `bin` и `sbin` содержит исполняемые файлы:

```shell
find ./bin/ ./sbin/ -type f
./bin/phpdbg
./bin/php
./bin/phpize
./bin/php-cgi
./bin/php-config
./bin/phar.phar
./sbin/php-fpm
```

Каталог `etc` файлы конфигурации

```shell
find ./etc/ -type f
./etc/php-fpm.conf.default
./etc/php-fpm.d/www.conf.default
```


Configuration File (php.ini) Path => /home/alex/php-8.0.11-files/config
Loaded Configuration File => (none)
Scan this dir for additional .ini files => /home/alex/php-8.0.11-files/config/conf.d
Additional .ini files parsed => (none)

Конфигурация php-fpm

cp /home/alex/php-8.0.11-files/etc/php-fpm.conf.default /home/alex/php-8.0.11-files/etc/php-fpm.conf
cp /home/alex/php-8.0.11-files/etc/php-fpm.d/www.conf.default /home/alex/php-8.0.11-files/etc/php-fpm.d/www.conf

TODO 

## Ansible

Еще один вариант установки php, при этом даже необязательно заходить на сервер. Ansible все сделает сам

## Конфигурация

Теперь разберемся с конфигурацией php. Что и как работает

https://evilinside.ru/?s=php-fpm#
https://www.youtube.com/watch?v=wmbbRFFUVEQ&t=856s
https://www.youtube.com/watch?v=GfV9A_B2yGg