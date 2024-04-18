---
layout: default
nav_order: 2
permalink: sql-2-mysql-create-user
title: Работа с пользователями , команда CREATE USER в mysql
parent: sql
grand_parent: Вопросы и решения
has_children: true
description: Как создать/изменить пользователя с помощью команды CREATE USER
date: 2023-06-18 19:00:00 +3
last_modified_date: 2023-06-18 19:00:00 +3
tags:
  - mysql
  - sql
  - questions-and-solutions
---

# Работа с пользователями , команда CREATE USER в mysql
{: .no_toc }

Самое важное, что нужно понимать, что пользователь в mysql представляет пару имя - удаленный хост с которого он подключается

Примеры :

- 'admin'@'localhost'
- 'admin'@'%'
- 'admin'@'10.147.164.0/255.255.255.0'

Зайдем на сервер под пользователем root, у кого есть права на создание пользователей

```sql
# Проверим какие пользователи есть на сервере
SELECT user,host FROM mysql.user;
# Создадим пользователей с одинаковым именем но разными удаленными хостами, здесь можно все более точечьно настраивать
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'the_secure_password';
CREATE USER 'admin'@'%' IDENTIFIED BY 'the_secure_password';
CREATE USER 'admin'@'192.168.88.0/255.255.255.0' IDENTIFIED BY 'password_here';
CREATE USER 'test'@'192.168.88.252' IDENTIFIED BY 'the_secure_password';
# Информация о пользователе
SHOW CREATE USER admin;
# Сменим пароль
ALTER USER 'admin'@'localhost' IDENTIFIED BY 'New_Password';
# Переименуем пользователя
RENAME USER 'admin'@'%' TO 'admin'@'localhost';
# Текущий пользователь
SELECT CURRENT_USER();
# Удалим пользователя
DROP USER 'admin'@'localhost';
```

Но пользователи еще ничего не умеют нужно задать им [права](https://lexusalex.ru/sql-3-grant)