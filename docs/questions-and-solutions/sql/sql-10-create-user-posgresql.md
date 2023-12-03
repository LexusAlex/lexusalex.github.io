---
layout: default
nav_order: 10
permalink: sql-10-create-user-postgresql
title: Создание пользователя в postgresql
parent: sql
grand_parent: Вопросы и решения
has_children: true
description: Как создать пользователя в postgresql
date: 2023-10-19 21:40:00 +3
last_modified_date: 2023-12-03 14:00:00 +3
tags:
- postgresql
- sql
- questions-and-solutions
---

# Создание пользователя в postgresql
{: .no_toc }

Сейчас в postgresql существует одна сущность роль, она включает в себя и пользователя и группу.
Роль может иметь право для подключения к серверу.

> До версии 8.1 в PostgreSQL пользователи и группы были отдельными сущностями, но теперь есть только роли.

Иногда называют так: 
- роль с возможностью входа это пользователь
- роль без возможности входа это группа

````sql
-- Создать роль с возможностью логина в систему
CREATE ROLE test LOGIN PASSWORD 'password';
-- Эквивалентна пердыдущей команде
CREATE USER test PASSWORD 'password';

-- Создать роль без возможности логина
CREATE ROLE test2 PASSWORD 'password';
-- Проверяем роли и способность их к логину
SELECT rolname,rolcanlogin FROM pg_roles;
/*
test,true
test2,false
postgres,true
*/
````

Первоначально в системе есть роль способная создавать другое роли - это superuser, 
по умолчанию это postgres. Для создания других ролей вначале нужно подключиться с этой ролью.

````shell
# Список ролей доступных системе
# Как видим test2 не может логинится в систему
postgres-# \du
                             List of roles
 Role name |                         Attributes                         
-----------+------------------------------------------------------------
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS
 test      | 
 test2     | Cannot login
```` 

У каждой роли существуют следующие атрибуты:

- Право подключения
- Статус суперпользователя
- Создание базы данных
- Создание роли
- Запуск репликации
- Пароль
- Наследование прав
- Игнорирование защиты на уровне строк
- Ограничение соединений

Можно сделать групповую роль для удобного управления всей группой пользователей

````sql
# Сделаем большие группы
CREATE ROLE site1;
CREATE ROLE site2;

# Сделаем 4 пользователя
CREATE ROLE user1;
CREATE ROLE user2;
CREATE ROLE user3;
CREATE ROLE user4;

# Членом роли может быть и другая групповая роль
# Назначим членство роли
GRANT site1 TO user1 WITH INHERIT TRUE;
GRANT site1 TO user2 WITH INHERIT TRUE;
GRANT site2 TO user3 WITH INHERIT TRUE;
GRANT site2 TO user4 WITH INHERIT TRUE;

# Разрешаем логинится в систему и устанавливаем пароль
ALTER ROLE user1 WITH LOGIN
ALTER ROLE user1 WITH PASSWORD 'password'
ALTER ROLE user3 WITH LOGIN
ALTER ROLE user3 WITH PASSWORD 'password'
      
# Разрешим всем пользователям первой группы создавать бд      
ALTER ROLE site1 WITH CREATEDB;
CREATE DATABASE site1;
ALTER DATABASE site1 OWNER TO site1
````
