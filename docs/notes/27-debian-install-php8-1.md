---
layout: default
nav_order: 27
permalink: 27-debian-install-php8-1
title: Установка php 8.1 на Debian
parent: Заметки
description: Заметка про установку php 8.1
date: 2021-12-05 12:00:00 +3
tags:
- php
- linux
- debian
---

# Установка php 8.1 на Debian
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

## Установка php cli

Соберем консольный вариант php 

### Директория для сборки

Ставить будем все в одну директорию, создадим ее:

```shell
mkdir php-8.1-cli
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
./configure --prefix=/home/alex/php-8.1-cli
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

Далее запустим сборку. Это продолжительный процесс

```shell
make -j4
```

По окончание которого должен появится вывод

```shell
Build complete.
Don't forget to run 'make test'.
```

Теперь осталось скопировать сборку в директорию `php-8.1-cli`

```shell
make install
```

### Проверка работы php cli

Осталось проверить, что все собралось. Зайдем в директорию `php-8.1-cli` и выполним там

```shell
./bin/php -v

PHP 8.1.0 (cli) (built: Dec  4 2021 15:34:18) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.1.0, Copyright (c) Zend Technologies
```

## Установка php fpm

Но, чтобы веб сервер мог использовать php, нужно поставить менеджер процессов php-fpm.

Данный вариант установки считаю более универсальным.

Для этого выполнил набор команд:

```shell
make clean # Очистка от предыдущей сборки
mkdir php-8.1-fpm # Создание директории куда будем ставить
./configure --prefix=/home/alex/php-8.1-fpm --enable-fpm # Сконфигурируем php с поддержкой fpm. Естественно здесь может быть куча опций.
make -j4 # Соберем
make install
make clean # Очистка
```

### Дерево

Если раскрыть дерево собранных файлов, то что идет из коробки, увидим следующие файлы и папки:

```shell
├── bin
│   ├── phar -> phar.phar
│   ├── phar.phar
│   ├── php
│   ├── php-cgi
│   ├── php-config
│   ├── phpdbg
│   └── phpize
├── etc
│   ├── php-fpm.conf.default
│   └── php-fpm.d
│       └── www.conf.default
├── include
│   └── php
│       ├── ext
│       │   ├── date
│       │   │   ├── lib
│       │   │   │   ├── timelib_config.h
│       │   │   │   └── timelib.h
│       │   │   └── php_date.h
│       │   ├── dom
│       │   │   └── xml_common.h
│       │   ├── filter
│       │   │   └── php_filter.h
│       │   ├── hash
│       │   │   ├── php_hash_adler32.h
│       │   │   ├── php_hash_crc32.h
│       │   │   ├── php_hash_fnv.h
│       │   │   ├── php_hash_gost.h
│       │   │   ├── php_hash.h
│       │   │   ├── php_hash_haval.h
│       │   │   ├── php_hash_joaat.h
│       │   │   ├── php_hash_md.h
│       │   │   ├── php_hash_murmur.h
│       │   │   ├── php_hash_ripemd.h
│       │   │   ├── php_hash_sha3.h
│       │   │   ├── php_hash_sha.h
│       │   │   ├── php_hash_snefru.h
│       │   │   ├── php_hash_tiger.h
│       │   │   ├── php_hash_whirlpool.h
│       │   │   └── php_hash_xxhash.h
│       │   ├── iconv
│       │   │   ├── iconv_arginfo.h
│       │   │   └── php_iconv.h
│       │   ├── json
│       │   │   ├── php_json.h
│       │   │   ├── php_json_parser.h
│       │   │   └── php_json_scanner.h
│       │   ├── libxml
│       │   │   └── php_libxml.h
│       │   ├── pcre
│       │   │   ├── pcre2lib
│       │   │   │   ├── config.h
│       │   │   │   ├── pcre2.h
│       │   │   │   ├── pcre2_internal.h
│       │   │   │   ├── pcre2_intmodedep.h
│       │   │   │   ├── pcre2_jit_neon_inc.h
│       │   │   │   ├── pcre2_jit_simd_inc.h
│       │   │   │   └── pcre2_ucp.h
│       │   │   └── php_pcre.h
│       │   ├── pdo
│       │   │   ├── php_pdo_driver.h
│       │   │   ├── php_pdo_error.h
│       │   │   └── php_pdo.h
│       │   ├── phar
│       │   │   └── php_phar.h
│       │   ├── session
│       │   │   ├── mod_files.h
│       │   │   ├── mod_user.h
│       │   │   └── php_session.h
│       │   ├── simplexml
│       │   │   ├── php_simplexml_exports.h
│       │   │   └── php_simplexml.h
│       │   ├── spl
│       │   │   ├── php_spl.h
│       │   │   ├── spl_array.h
│       │   │   ├── spl_directory.h
│       │   │   ├── spl_dllist.h
│       │   │   ├── spl_engine.h
│       │   │   ├── spl_exceptions.h
│       │   │   ├── spl_fixedarray.h
│       │   │   ├── spl_functions.h
│       │   │   ├── spl_heap.h
│       │   │   ├── spl_iterators.h
│       │   │   └── spl_observer.h
│       │   ├── standard
│       │   │   ├── base64.h
│       │   │   ├── basic_functions_arginfo.h
│       │   │   ├── basic_functions.h
│       │   │   ├── crc32.h
│       │   │   ├── crc32_x86.h
│       │   │   ├── credits_ext.h
│       │   │   ├── credits.h
│       │   │   ├── credits_sapi.h
│       │   │   ├── crypt_blowfish.h
│       │   │   ├── crypt_freesec.h
│       │   │   ├── css.h
│       │   │   ├── datetime.h
│       │   │   ├── dir_arginfo.h
│       │   │   ├── dl_arginfo.h
│       │   │   ├── dl.h
│       │   │   ├── exec.h
│       │   │   ├── file.h
│       │   │   ├── flock_compat.h
│       │   │   ├── fsock.h
│       │   │   ├── head.h
│       │   │   ├── hrtime.h
│       │   │   ├── html.h
│       │   │   ├── html_tables.h
│       │   │   ├── info.h
│       │   │   ├── md5.h
│       │   │   ├── pack.h
│       │   │   ├── pageinfo.h
│       │   │   ├── php_array.h
│       │   │   ├── php_assert.h
│       │   │   ├── php_browscap.h
│       │   │   ├── php_crypt.h
│       │   │   ├── php_crypt_r.h
│       │   │   ├── php_dir.h
│       │   │   ├── php_dns.h
│       │   │   ├── php_ext_syslog.h
│       │   │   ├── php_filestat.h
│       │   │   ├── php_fopen_wrappers.h
│       │   │   ├── php_http.h
│       │   │   ├── php_image.h
│       │   │   ├── php_incomplete_class.h
│       │   │   ├── php_lcg.h
│       │   │   ├── php_mail.h
│       │   │   ├── php_math.h
│       │   │   ├── php_mt_rand.h
│       │   │   ├── php_net.h
│       │   │   ├── php_password.h
│       │   │   ├── php_rand.h
│       │   │   ├── php_random.h
│       │   │   ├── php_smart_string.h
│       │   │   ├── php_smart_string_public.h
│       │   │   ├── php_standard.h
│       │   │   ├── php_string.h
│       │   │   ├── php_uuencode.h
│       │   │   ├── php_var.h
│       │   │   ├── php_versioning.h
│       │   │   ├── proc_open.h
│       │   │   ├── quot_print.h
│       │   │   ├── scanf.h
│       │   │   ├── sha1.h
│       │   │   ├── streamsfuncs.h
│       │   │   ├── url.h
│       │   │   ├── url_scanner_ex.h
│       │   │   ├── user_filters_arginfo.h
│       │   │   └── winver.h
│       │   └── xml
│       │       ├── expat_compat.h
│       │       ├── php_xml.h
│       │       └── xml_arginfo.h
│       ├── include
│       ├── main
│       │   ├── build-defs.h
│       │   ├── fastcgi.h
│       │   ├── fopen_wrappers.h
│       │   ├── http_status_codes.h
│       │   ├── php_compat.h
│       │   ├── php_config.h
│       │   ├── php_content_types.h
│       │   ├── php_getopt.h
│       │   ├── php_globals.h
│       │   ├── php.h
│       │   ├── php_ini.h
│       │   ├── php_main.h
│       │   ├── php_memory_streams.h
│       │   ├── php_network.h
│       │   ├── php_open_temporary_file.h
│       │   ├── php_output.h
│       │   ├── php_reentrancy.h
│       │   ├── php_scandir.h
│       │   ├── php_stdint.h
│       │   ├── php_streams.h
│       │   ├── php_syslog.h
│       │   ├── php_ticks.h
│       │   ├── php_variables.h
│       │   ├── php_version.h
│       │   ├── rfc1867.h
│       │   ├── SAPI.h
│       │   ├── snprintf.h
│       │   ├── spprintf.h
│       │   └── streams
│       │       ├── php_stream_context.h
│       │       ├── php_stream_filter_api.h
│       │       ├── php_stream_glob_wrapper.h
│       │       ├── php_stream_mmap.h
│       │       ├── php_stream_plain_wrapper.h
│       │       ├── php_streams_int.h
│       │       ├── php_stream_transport.h
│       │       └── php_stream_userspace.h
│       ├── sapi
│       │   └── cli
│       │       └── cli.h
│       ├── TSRM
│       │   ├── TSRM.h
│       │   └── tsrm_win32.h
│       └── Zend
│           ├── Optimizer
│           │   ├── zend_call_graph.h
│           │   ├── zend_cfg.h
│           │   ├── zend_dfg.h
│           │   ├── zend_dump.h
│           │   ├── zend_func_info.h
│           │   ├── zend_inference.h
│           │   ├── zend_optimizer.h
│           │   └── zend_ssa.h
│           ├── zend_alloc.h
│           ├── zend_alloc_sizes.h
│           ├── zend_API.h
│           ├── zend_arena.h
│           ├── zend_ast.h
│           ├── zend_attributes_arginfo.h
│           ├── zend_attributes.h
│           ├── zend_bitset.h
│           ├── zend_build.h
│           ├── zend_builtin_functions_arginfo.h
│           ├── zend_builtin_functions.h
│           ├── zend_closures_arginfo.h
│           ├── zend_closures.h
│           ├── zend_compile.h
│           ├── zend_config.h
│           ├── zend_config.w32.h
│           ├── zend_constants.h
│           ├── zend_cpuinfo.h
│           ├── zend_dtrace.h
│           ├── zend_enum_arginfo.h
│           ├── zend_enum.h
│           ├── zend_errors.h
│           ├── zend_exceptions_arginfo.h
│           ├── zend_exceptions.h
│           ├── zend_execute.h
│           ├── zend_extensions.h
│           ├── zend_fibers_arginfo.h
│           ├── zend_fibers.h
│           ├── zend_float.h
│           ├── zend_gc.h
│           ├── zend_gdb.h
│           ├── zend_generators_arginfo.h
│           ├── zend_generators.h
│           ├── zend_globals.h
│           ├── zend_globals_macros.h
│           ├── zend.h
│           ├── zend_hash.h
│           ├── zend_highlight.h
│           ├── zend_inheritance.h
│           ├── zend_ini.h
│           ├── zend_ini_parser.h
│           ├── zend_ini_scanner_defs.h
│           ├── zend_ini_scanner.h
│           ├── zend_interfaces_arginfo.h
│           ├── zend_interfaces.h
│           ├── zend_istdiostream.h
│           ├── zend_iterators.h
│           ├── zend_language_parser.h
│           ├── zend_language_scanner_defs.h
│           ├── zend_language_scanner.h
│           ├── zend_list.h
│           ├── zend_llist.h
│           ├── zend_long.h
│           ├── zend_map_ptr.h
│           ├── zend_modules.h
│           ├── zend_multibyte.h
│           ├── zend_multiply.h
│           ├── zend_object_handlers.h
│           ├── zend_objects_API.h
│           ├── zend_objects.h
│           ├── zend_observer.h
│           ├── zend_operators.h
│           ├── zend_portability.h
│           ├── zend_ptr_stack.h
│           ├── zend_range_check.h
│           ├── zend_signal.h
│           ├── zend_smart_str.h
│           ├── zend_smart_string.h
│           ├── zend_smart_string_public.h
│           ├── zend_smart_str_public.h
│           ├── zend_sort.h
│           ├── zend_stack.h
│           ├── zend_stream.h
│           ├── zend_string.h
│           ├── zend_strtod.h
│           ├── zend_strtod_int.h
│           ├── zend_system_id.h
│           ├── zend_type_info.h
│           ├── zend_types.h
│           ├── zend_variables.h
│           ├── zend_virtual_cwd.h
│           ├── zend_vm_def.h
│           ├── zend_vm_execute.h
│           ├── zend_vm.h
│           ├── zend_vm_handlers.h
│           ├── zend_vm_opcodes.h
│           ├── zend_vm_trace_handlers.h
│           ├── zend_vm_trace_lines.h
│           ├── zend_vm_trace_map.h
│           ├── zend_weakrefs_arginfo.h
│           └── zend_weakrefs.h
├── lib
│   └── php
│       ├── build
│       │   ├── ax_check_compile_flag.m4
│       │   ├── ax_gcc_func_attribute.m4
│       │   ├── config.guess
│       │   ├── config.sub
│       │   ├── gen_stub.php
│       │   ├── libtool.m4
│       │   ├── ltmain.sh
│       │   ├── Makefile.global
│       │   ├── php_cxx_compile_stdcxx.m4
│       │   ├── phpize.m4
│       │   ├── php.m4
│       │   ├── pkg.m4
│       │   ├── run-tests.php
│       │   └── shtool
│       └── extensions
│           └── no-debug-non-zts-20210902
│               └── opcache.so
├── php
│   ├── man
│   │   ├── man1
│   │   │   ├── phar.1
│   │   │   ├── phar.phar.1
│   │   │   ├── php.1
│   │   │   ├── php-cgi.1
│   │   │   ├── php-config.1
│   │   │   ├── phpdbg.1
│   │   │   └── phpize.1
│   │   └── man8
│   │       └── php-fpm.8
│   └── php
│       └── fpm
│           └── status.html
├── sbin
│   └── php-fpm
└── var
    ├── log
    └── run

````

Дерево, привожу для примера, чтобы наглядно было видно, где что находится.

### Запуск php-fpm

Сейчас у нас не задана конфигурация и pool, нужно задать

```shell
cp /home/alex/php-8.1-fpm/etc/php-fpm.conf.default /home/alex/php-8.1-fpm/etc/php-fpm.conf
cp /home/alex/php-8.1-fpm/etc/php-fpm.d/www.conf.default /home/alex/php-8.1-fpm/etc/php-fpm.d/www.conf
```

Теперь пропишем пользователя и группу от которой будет работать php-fpm процессы в файле `/home/alex/php-8.1-fpm/etc/php-fpm.d/www.conf`

```shell
user = www-data
group = www-data
```

Запустим php-fpm

```shell
sudo ./sbin/php-fpm
```

Проверим, что процесс доступен на порту 9000:

```shell
sudo netstat -tulpn | grep 9000
tcp        0      0 127.0.0.1:9000          0.0.0.0:*               LISTEN      84216/php-fpm: mast
```

И заменим путь в директиве nginx `fastcgi_pass` из способа установки выше c unix сокета на локальный путь:

```shell
sudo vim /etc/nginx/sites-available/default
fastcgi_pass 127.0.0.1:9000
sudo systemctl reload nginx # перезагрузим nginx
``` 

После этого увидим станицу с нашей свежей сборкой:

<figure>
  <img src="/assets/images/notes/27/custom-php8.1.png" alt="php8.1"  data-action="zoom">
</figure>

> Если у вас nginx/php работают на одном сервере лучше использовать unix-сокеты вместо tcp-сокетов.

Менеджер процессов запущен.