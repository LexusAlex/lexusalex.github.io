---
layout: default
nav_order: 9
permalink: sql-9-update
title: Удаление строк таблицы, команда DELETE/TRUNCATE
parent: sql
grand_parent: Вопросы и решения
has_children: true
description: Как очистить таблицу помощью операторов DELETE и TRUNCATE
date: 2023-07-20 12:40:00 +3
last_modified_date: 2023-07-20 12:40:00 +3
tags:
- mysql
- sql
- questions-and-solutions
---

# Удаление строк таблицы, команда DELETE/TRUNCATE
{: .no_toc }

````sql
# Удаление строк по условию
DELETE FROM test WHERE id = 1;
# Удаление всех строк из таблицы, редко но бывает и такое
DELETE FROM test; # При этом будет выведено кол-во удаленных строк
# Еще вариант как очистить всю таблицу, не удаляя структуру таблицы, при этом скорость удаления записей будет быстрее
TRUNCATE test; # При этом количество удаленных строк не будет выведено
# Если нужно очистить таблицу в которой есть внешние ключи выполните команду, чтобы отключить проверку внешних ключей
SET FOREIGN_KEY_CHECKS=0;
````