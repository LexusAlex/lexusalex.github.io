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
last_modified_date: 2023-10-24 14:16:00 +3
tags:
- postgresql
- sql
- questions-and-solutions
---

# Создание пользователя в postgresql
{: .no_toc }

Сейчас в postgresql существует одна сущность роль, она включает в себя и пользователя и группу.
Роль может иметь право для подключения к серверу.

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
````

Первоначально в системе есть роль способная создавать другое роли - это superuser, по умолчанию это postgres
 
У кождой роли существуют следующие атрибуты
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