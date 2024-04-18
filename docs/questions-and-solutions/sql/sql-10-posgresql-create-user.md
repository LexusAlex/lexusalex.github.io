---
layout: default
nav_order: 10
permalink: sql-10-postgresql-create-user
title: Создание пользователя в postgresql в postgresql
parent: sql
grand_parent: Вопросы и решения
has_children: true
description: Как создать пользователя в postgresql
date: 2023-10-19 21:40:00 +3
last_modified_date: 2024-01-14 18:00:00 +3
tags:
- postgresql
- sql
- questions-and-solutions
---

# Создание пользователя в postgresql
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

Прежде чем переходить к пользователям и группам разъясним некоторые особенности.

Первоначально в системе есть роль способная создавать другое роли - это superuser,
по умолчанию это postgres. Для создания других ролей вначале нужно подключиться с этой ролью.

После инициализации на сервере могут быть созданы три базы `postgres`, `template1`, `template0`

Проверим через консоль:

````shell
\list
 List of databases
   Name    |  Owner   | Encoding | Locale Provider |   Collate   |    Ctype    | ICU Locale | ICU Rules |   Access privileges   
-----------+----------+----------+-----------------+-------------+-------------+------------+-----------+-----------------------
 postgres  | postgres | UTF8     | libc            | en_US.UTF-8 | en_US.UTF-8 |            |           | 
 template0 | postgres | UTF8     | libc            | en_US.UTF-8 | en_US.UTF-8 |            |           | =c/postgres          +
           |          |          |                 |             |             |            |           | postgres=CTc/postgres
 template1 | postgres | UTF8     | libc            | en_US.UTF-8 | en_US.UTF-8 |            |           | =c/postgres          +
           |          |          |                 |             |             |            |           | postgres=CTc/postgres
````

Либо выполним запрос, тогда получим их список

````shell
SELECT datname FROM pg_database;
````

Сейчас в postgresql существует одна сущность роль, она включает в себя и пользователя и группу.
Роль может иметь право для подключения к серверу.

> До версии 8.1 в PostgreSQL пользователи и группы были отдельными сущностями, но теперь есть только роли.

Иногда называют так: 
- роль с возможностью входа это пользователь
- роль без возможности входа это группа

Список ролей/пользователей

````shell
\du
                             List of roles
 Role name |                         Attributes                         
-----------+------------------------------------------------------------
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS
````
 
Важно понимать, что роли являются глобальными для всей системы, а не для отдельно взятой бд.


## Создание роли

````sql
-- Создать роль с возможностью логина в систему
CREATE ROLE test LOGIN PASSWORD 'password';
-- Создать роль без возможности логина
CREATE ROLE test1 PASSWORD 'password';
-- Список всех ролей
SELECT rolname FROM pg_roles;
/* 
           rolname           
-----------------------------
 pg_database_owner
 pg_read_all_data
 pg_write_all_data
 pg_monitor
 pg_read_all_settings
 pg_read_all_stats
 pg_stat_scan_tables
 pg_read_server_files
 pg_write_server_files
 pg_execute_server_program
 pg_signal_backend
 pg_checkpoint
 pg_use_reserved_connections
 pg_create_subscription
 postgres
 test
 test1
*/
-- Список ролей которым доступно подключение к бд
SELECT rolname FROM pg_roles WHERE rolcanlogin;
/*
  rolname  
----------
 postgres
 test
 */
````

Каждое подключение к серверу базы данных выполняется под именем конкретной роли, 
и эта роль определяет начальные права доступа для команд, выполняемых в этом соединении.

Увидеть текущую роль которую используем можно командой

````sql
SELECT current_user, session_user;
-- test2,test2
````

## Атрибуты ролей


У каждой роли существуют следующие атрибуты:

- Право подключения `CREATE ROLE test LOGIN;`
- Статус суперпользователя `CREATE ROLE test SUPERUSER;`
- Создание базы данных `CREATE ROLE test CREATEDB;`
- Создание роли `CREATE ROLE test CREATEROLE;`
- Запуск репликации `CREATE ROLE test REPLICATION LOGIN;`
- Пароль `CREATE ROLE test2 LOGIN PASSWORD 'pass';`
- Наследование прав - запрет наследования `CREATE ROLE имя NOINHERIT`
- Игнорирование защиты на уровне строк `CREATE ROLE имя BYPASSRLS`
- Ограничение соединений `CREATE ROLE test CONNECTION LIMIT '1'`

После создания роли можно поменять ее права:

````sql
-- Например добавим возможность создавать базы данных пользователю
ALTER ROLE test2 WITH CREATEDB
-- Обратная операция, отозвать право создания бд
ALTER ROLE test2 WITH NOCREATEDB 
-- Смена пароля
ALTER ROLE test2 WITH PASSWORD 'pass1';      
````

Список операций для создания/отзыва:

````text
SUPERUSER | NOSUPERUSER
CREATEDB | NOCREATEDB
CREATEROLE | NOCREATEROLE
INHERIT | NOINHERIT
LOGIN | NOLOGIN
REPLICATION | NOREPLICATION
BYPASSRLS | NOBYPASSRLS
````
 
В доке более полная информация [https://postgrespro.ru/docs/postgresql/16/sql-alterrole](https://postgrespro.ru/docs/postgresql/16/sql-alterrole)

При создании бд текущий пользователь автоматически назначается ее владельцем
 
````sql
CREATE DATABASE test1;
-- Создать бд за авторством другого пользователя
CREATE DATABASE test3 OWNER test2;
````
 
По умолчанию создавать таблицы в базе которой пользователь не владеет нельзя. Для этого нужно дать права, но об этом позже.
Сейчас создадим таблицу в бд которой владеет наш пользователь.

````sql
CREATE TABLE table1
(identifier VARCHAR(80) NOT NULL,
 expiry_date_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
 user_identifier UUID NOT NULL,
 PRIMARY KEY(identifier))
````
 
Она нам понадобиться ниже

## Управление ролями

Можно сделать групповую роль для удобного управления всей группой пользователей. Например, для доступа к каким то ресурсам.

````sql
-- Групповая роль
CREATE ROLE site1;
-- Даем права пользователю test2
GRANT site1 TO test2 WITH INHERIT TRUE;
-- Меняем владельца базы на групповую роль, теперь вес права будем выдавать в ней 
ALTER DATABASE test2 OWNER TO site1;
-- Создадим еще одного пользователя, пока у него нет прав ни на что
CREATE ROLE test3 LOGIN PASSWORD 'password';
-- Даем права пользователю test3
GRANT site1 TO test3 WITH INHERIT TRUE;
-- \c test2 выберем нашу бд
-- назначим права на таблицу нашей групповой роли
GRANT ALL PRIVILEGES ON table1 TO site1;
-- отзовем все
REVOKE ALL ON table1 FROM site1;
-- \dp просмотр привилегий
-- Разрешим только SELECT
GRANT SELECT ON table1 TO site1;
-- Разрешим основные операции
GRANT SELECT,INSERT,UPDATE,DELETE ON table1 TO site1;
-- Привелегии для всех таблиц в бд
GRANT SELECT, UPDATE, INSERT,DELETE ON ALL TABLES IN SCHEMA public TO "site1";
````
  
[Документация](https://postgrespro.ru/docs/postgresql/16/ddl-priv)
