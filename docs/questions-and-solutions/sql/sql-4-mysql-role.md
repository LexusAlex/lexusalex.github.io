---
layout: default
nav_order: 4
permalink: sql-4-mysql-role
title: Управление ролями, создание и использование в mysql
parent: sql
grand_parent: Вопросы и решения
has_children: true
description: Как работать с ролями в mysql/mariadb
date: 2023-06-19 12:40:00 +3
last_modified_date: 2023-06-18 12:40:00 +3
tags:
  - mysql
  - sql
  - questions-and-solutions
---

# Управление ролями, создание и использование в mysql
{: .no_toc }

Роль - это набор привилегий который можно применить к пользователю. 
Что позволяет назначить привилегия целой группе пользователей вместо того, чтобы назначать их по отдельности каждому пользователю.
Имеет место если много однотипных пользователей. 

```sql
#Создадим роли
CREATE ROLE 'reader', 'admin', 'writer';
# Назначим привилегии ролям
GRANT ALTER, ALTER ROUTINE, CREATE, CREATE ROUTINE, CREATE TEMPORARY TABLES, CREATE USER, CREATE VIEW, DELETE, DROP, EVENT, EXECUTE, INDEX, INSERT, LOCK TABLES, PROCESS, REFERENCES, RELOAD, REPLICATION CLIENT, REPLICATION SLAVE, SELECT, SHOW DATABASES, SHOW VIEW, TRIGGER, UPDATE ON *.* TO 'admin' WITH GRANT OPTION;
GRANT SELECT ON test_db.* TO 'reader';
GRANT INSERT, UPDATE, DELETE ON test_db.* TO 'writer';
# Назначим учетной записи роль
GRANT 'admin' TO 'admin'@'192.168.88.0/255.255.255.0';
GRANT 'reader' TO 'test'@'192.168.88.252';
# Проверим разрешения пользователя
SHOW GRANTS FOR 'test'@'192.168.88.252';
# Активируем роль пользователю
SET DEFAULT ROLE reader FOR 'test'@'192.168.88.252';
# Уберем роль
SET DEFAULT ROLE NONE FOR 'test'@'192.168.88.252';
# Из под самого пользователя можно посмотреть привилегии следующим образом
SHOW GRANTS;
SHOW GRANTS FOR CURRENT_USER;
SHOW GRANTS FOR CURRENT_USER();
# Отозвать роль из учетной записи
REVOKE reader FROM 'test'@'192.168.88.252';
# Назначим другую роль
GRANT 'writer' TO 'test'@'192.168.88.252';
# Активируем ее
SET DEFAULT ROLE writer FOR 'test'@'192.168.88.252';
# Добавить права в активированную роль
GRANT SELECT ON test_db.* TO 'writer';
# Удалить роль, вместе с ней удалятся все привязки к пользователям
DROP ROLE 'writer';
```