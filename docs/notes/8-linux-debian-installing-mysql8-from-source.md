---
layout: default
nav_order: 8
permalink: 8-linux-debian-installing-mysql8-from-source
title: Сборка Mysql 8 из дистрибутива на Debian 10
description: Поставим базу данных Mysql на сервер.
date: 2021-01-09 23:30:00 +3
parent: Заметки
tags:
- linux
- mysql
---

# Сборка Mysql 8 из дистрибутива на Debian 10
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

Чтобы запустить практически любой сайт, необходима база данных mysql.

Установим ее из готового дистрибутива в минимальной конфигурации.

## Подготовка

Устанавливаем необходимые библиотеки для запуска mysql.

```shell
sudo apt-get install libaio1
sudo apt-get install libnuma1
sudo apt-get install libncurses5
```

Основные библиотеки для сборки мы установили в [статье](https://lexusalex.ru/6-linux-debian-installing-apache2-from-source)

## Создание пользователя

Сперва следует создать пользователя `mysql` от которого будет демон `mysqld`.

```shell
sudo groupadd mysql # Добавляем группу
sudo useradd -r -g mysql -s /bin/false mysql # Создаем пользователя с группой mysql
```

## Загрузка дистрибутива

Заходим на сервер и скачиваем с [официального сайта](https://dev.mysql.com/downloads/mysql/) минимальный дистрибутив в домашний каталог `/home/alex/`.

```shell
wget https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.22-linux-glibc2.17-x86_64-minimal.tar.xz
```

## Распаковка и переименование

Распаковываем архив.

```shell
tar xvf mysql-8.0.22-linux-glibc2.17-x86_64-minimal.tar.xz # или xz -dc mysql-8.0.22-linux-glibc2.17-x86_64-minimal.tar.xz | tar x
```

Переименовываем директорию в более короткое имя.

```shell
mv mysql-8.0.22-linux-glibc2.17-x86_64-minimal mysql
```

В результате получили каталог `mysql` со следующими директориями:

- bin - сервер mysqld, клиент и служебные программы.
- docs -	руководство MySQL в Info формате.
- man -	руководство unix.
- include -	заголовочные файлы.
- lib -	библиотеки.
- share - сообщения об ошибках, и SQL файлы для установки базы данных.
- support-files - прочие файлы.

## Каталог с данными

Далее нужно инициализировать системные таблицы с указанием каталога данных.

```shell
/home/alex/mysql/bin/mysqld --initialize --user=mysql --basedir=/home/alex/mysql/ --datadir=/home/alex/mysql/data
```

Для удобства зайдем в директорию `/home/alex/mysql` и из нее выполним команду.

```shell
sudo ./bin/mysqld --initialize --user=mysql --basedir=/home/alex/mysql/ --datadir=/home/alex/mysql/data
2021-01-08T20:21:06.114129Z 0 [System] [MY-013169] [Server] /home/alex/mysql/bin/mysqld (mysqld 8.0.22) initializing of server in progress as process 1763
2021-01-08T20:21:06.120240Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2021-01-08T20:21:06.498854Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2021-01-08T20:21:07.382877Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: p&,Xl>sjf0i=

```

Сервер mysql создает учетную запись администратора и другие системные учетные записи.
Так же генерирует временный пароль и заполняет справочные таблицы, все это хранится в директории `/home/alex/mysql/data`.

Сейчас сервер работает в режиме начальной загрузки, поэтому некоторый функционал у него ограничен.

## Запуск сервера и подключение к нему

Теперь попробуем запустить сервер как демон с помощью программы `mysqld_safe`.

```shell
sudo ./bin/mysqld_safe --user=mysql &
Logging to '/home/alex/mysql/data/TestDebian10.err'.
2021-01-08T20:30:25.446289Z mysqld_safe Starting mysqld daemon with databases from /home/alex/mysql/data
```

Сервер запущен.

В другой сессии теперь можно к нему подключиться, введя рандомный пароль сгенерированный выше.

```shell
./bin/mysql -u root -p
```
После этого попадаем в интерфейс базы данных

```shell
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.22

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

Задаем новый пароль суперпользователя.

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root-password';
```

Создаем еще несколько учетных записей и назначаем права.

```sql
CREATE USER 'root'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY 'root-password';
CREATE USER 'root'@'::1' IDENTIFIED WITH mysql_native_password BY 'root-password';
CREATE USER 'alex'@'%' IDENTIFIED WITH mysql_native_password BY 'passwd';
GRANT ALL PRIVILEGES ON *.* TO 'alex'@'%';
```

## Тестирование работы сервера

Проверим версию

```shell
./bin/mysqladmin -u root -p version
Ver 8.0.22 for Linux on x86_64 (MySQL Community Server - GPL)
Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Server version          8.0.22
Protocol version        10
Connection              Localhost via UNIX socket
UNIX socket             /tmp/mysql.sock
Uptime:                 25 min 40 sec

Threads: 2  Questions: 14  Slow queries: 0  Opens: 175  Flush tables: 3  Open tables: 93  Queries per second avg: 0.009
```

Остановим сервер и запустим снова.

```shell
sudo ./bin/mysqladmin -u root -p shutdown
sudo ./bin/mysqld --user=mysql
```

Выполним sql запрос.

```shell
./bin/mysql -u root -p -e "SELECT User FROM mysql.user" mysql
```

Так же можно проверить что запущен процесс `./bin/mysqld --user=mysql` командой

```shell
ps aux|grep mysql
```

## Запуск сервера при старте системы

Сейчас запуском и остановкой сервера мы занимаемся вручную, пришло время автоматизировать этот процесс.

Добавим команду запуска в файл `/etc/rc.local` :

```shell
/bin/sh -c 'cd /home/alex/mysql; ./bin/mysqld --user=mysql > /dev/null 2>&1 &'
```

Перезагрузим сервер. Если не увидели никаких ошибок, то база должна стартануть.

## Итог

В итоге мы запустили минимально рабочую версию сервера mysql 8.0.22 запущенную из готового дистрибутива.