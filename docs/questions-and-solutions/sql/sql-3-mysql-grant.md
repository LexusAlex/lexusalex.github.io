---
layout: default
nav_order: 3
permalink: sql-3-mysql-grant
title: Права пользователей, команда GRANT в mysql
parent: sql
grand_parent: Вопросы и решения
has_children: true
description: Работа с правами пользователей, команда GRANT в mysql
date: 2023-06-18 23:00:00 +3
last_modified_date: 2023-06-18 23:00:00 +3
tags:
  - mysql
  - sql
  - questions-and-solutions
---

# Права пользователей, команда GRANT в mysql
{: .no_toc }

Итак, мы создали [пользователей](https://lexusalex.ru/sql-2-create-user), теперь их нужно наделить нужными правами:

Смотрим права определенного пользователя:

````sql
SHOW GRANTS FOR 'admin'@'%';
# GRANT USAGE ON *.* TO `admin`@`%` IDENTIFIED BY PASSWORD '*645E9013421D5D65B18728AC535BF6A4015F4DA7'
# USAGE ON *.*  означает отсутствие привилегий
````

Привилегии назначаются командой `GRANT` и дают доступ к различным объектам по следующей схеме:

````text
GRANT [тип прав] ON [имя базы данных].[имя таблицы] TO [имя пользователя];
GRANT permission_type ON db_name.table_name TO 'user'@'host';
GRANT permission_type ON db_name.* TO 'user'@'host';
````
 
Лишаются командой `REVOKE`

````text
REVOKE [тип прав] ON [название базы данных].[название таблицы] FROM [имя пользователя];
REVOKE SELECT ON test_db.* FROM 'test'@'192.168.88.252';
````

Например:

```sql
# Назначим все привилегии для всех таблиц и всех бд ALL PRIVILEGES ON *.*
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'192.168.88.0/255.255.255.0';
# Назначим основные операции над таблицами в бд
GRANT SELECT, INSERT, UPDATE, DELETE ON test_db.* TO 'test'@'192.168.88.252';
# Назначаем расширенные права администратора
GRANT ALTER, ALTER ROUTINE, CREATE, CREATE ROUTINE, CREATE TEMPORARY TABLES, CREATE USER, CREATE VIEW, DELETE, DROP, EVENT, EXECUTE, INDEX, INSERT, LOCK TABLES, PROCESS, REFERENCES, RELOAD, REPLICATION CLIENT, REPLICATION SLAVE, SELECT, SHOW DATABASES, SHOW VIEW, TRIGGER, UPDATE ON *.* TO 'admin'@'192.168.88.0/255.255.255.0' WITH GRANT OPTION;
# Убрать права на DELETE
REVOKE DELETE ON test_db.* FROM 'test'@'192.168.88.252';
# Убрать все привилегии + опции
REVOKE ALL PRIVILEGES, GRANT OPTION FROM `admin`@`192.168.88.0/255.255.255.0`;
# Убрать все привилегии
REVOKE ALL PRIVILEGES ON *.* FROM `user`@`%`;
# После всех действий необходимо выполнять команду
FLUSH PRIVILEGES; 
```

Типы привилегий:

DATA manipulation:

- SELECT - Читаем строки таблицы
- INSERT — Позволяет добавлять строки в таблице
- UPDATE — Позволяет изменять строки таблицы
- DELETE - Удалить строки из таблицы
- FILE — Предоставляет доступ на чтение любого файла на сервере

Structure:

- CREATE - Создавать новые базы данных и таблицы
- ALTER - Изменять структуру таблиц. Требует CREATE и INSERT привилегии
- INDEX - Даёт право добавлять/удалять индексы к таблицам
- DROP - Удалять базы данных или таблицы
- CREATE TEMPORARY TABLES - Создавать временные таблицы на время сессии
- SHOW VIEW - Проверить каким запросом (из каких данных состоит) создано определенное представление, заданное с помощью CREATE VIEW
- CREATE ROUTINE - Создать процедуру, которая является набором заготовленным набором SQL-команд
- ALTER ROUTINE - Изменить процедуру, созданную посредством CREATE ROUTINE
- EXECUTE - Вызывать готовые процедуры.
- CREATE VIEW - Создать некоторое представление в виде таблицы
- EVENT - Дает право на создание/изменение/удаление заданий для планировщика
- TRIGGER - Позволяет создавать/изменять/удалять триггеры

Administration:

- GRANT OPTION - Позволяет назначить конкретные права определенному пользователю (также и отобрать). Возможно дать/отобрать только те права, которыми назначающий сам располагает
- SUPER - Привилегия, дающая право на множество операций:
- PROCESS - Разрешает доступ к информации о потоках (процессах) исполняющихся на сервере.
- RELOAD - Использование оператора FLUSH, который чистит кеш MySQL
- SHUTDOWN - Привилегия позволяет выполнить оператор SHUTDOWN
- SHOW DATABASES - Выполнять оператор SHOW DATABASES
- LOCK TABLES - Блокирует таблицу на время
- REFERENCES - Позволяет создавать связь между таблицами по внешнему ключу
- REPLICATION CLIENT - Позволяет выполнять операции SHOW MASTER STATUS, SHOW SLAVE STATUS и SHOW BINARY LOG
- REPLICATION SLAVE - Данная привилегия необходима пользователям ведомого сервера БД
- CREATE USER - Позволяет создавать/изменять/переименовывать/удалять пользователей баз данных.
