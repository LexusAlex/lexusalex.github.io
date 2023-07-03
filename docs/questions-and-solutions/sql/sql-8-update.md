---
layout: default
nav_order: 8
permalink: sql-8-update
title: Обновление строк таблицы, команда UPDATE
parent: sql
grand_parent: Вопросы и решения
has_children: true
description: Как обновить данные с помощью оператора UPDATE в mysql
date: 2023-06-30 17:00:00 +3
last_modified_date: 2023-07-03 15:30:00 +3
tags:
  - mysql
  - sql
  - questions-and-solutions
---

# Обновление строк таблицы, команда UPDATE
{: .no_toc }

Оператор UPDATE работает по шаблону `UPDATE Таблица Условие Сортировка Лимит`

````sql
# Самый опасный запрос - это UPDATE без условия, НИКОГДА ТАК НЕ ДЕЛАЙТЕ
UPDATE `data_obj` SET modered=0;

# Обновление строки по условию определенной записи
# Причем если обновляемое значение уже присуствует в выборке, строка не будет обновлена
UPDATE history SET description='Новое описание' WHERE id = 1
# Несколько полей, усовие может быть совершенно любым
UPDATE history SET description='Новое описание1',time=1234567,row_id=123124 WHERE id = 1
UPDATE history SET description='Новое описание1',time=1234567,row_id=123124 WHERE id IN (1,2,3,4)
UPDATE history SET description='Новое описание1',time=2*4,row_id=123124 WHERE id IN (1,2,3,4) # В значении может быть любое выражение
# Присвоить значение по умолчанию, которое было создано при создании таблиц
UPDATE history SET description='Новое описание1',time=DEFAULT,row_id=DEFAULT WHERE id IN (1,2,3,4)

# LIMIT обновляемых записей
UPDATE history SET description='Новое описание1',time=DEFAULT,row_id=DEFAULT WHERE user_id = 21 LIMIT 1

# Можно обновить несколько таблиц в одном запросе, иногда может быть необходимость
                                                                             
UPDATE history,user_profiles
SET history.row_id = 123, user_profiles.description = '123'
WHERE history.id = 30 AND user_profiles.user_id  = 21;                                                                             
                                                                             
````