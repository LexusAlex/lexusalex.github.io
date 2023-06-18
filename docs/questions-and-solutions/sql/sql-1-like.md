---
layout: default
nav_order: 1
permalink: sql-1-like
title: Как найти строку по шаблону с помощью оператора LIKE
parent: sql
grand_parent: Вопросы и решения
has_children: true
description: Как найти строку по шаблону с помощью оператора LIKE
date: 2023-05-16 23:00:00 +3
last_modified_date: 2023-05-16 23:00:00 +3
tags:
  - mysql
  - sql
  - questions-and-solutions
---

# Как найти строку по шаблону с помощью оператора LIKE
{: .no_toc }

Оператор `LIKE` используется в выражениях sql для поиска строк подходящих под шаблон.
Шаблон включает следующие специальные символы:

- `%` - любой символ от 0 и больше
- `_` - один любой символ

Удобно использовать для поиска.

```sql
# Точное совпадение, что в принципе равно SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` = 'Тест'
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE 'Тест';
# Выражение должно начинаться с буквы А
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE 'А%';
# В выражении должна быть буква а
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE '%а';
# Самый распространенный вариант буква А в любой позиции в выражении
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE '%А%';
# Выражение из двух букв, любой символ + буква Б
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE '_Б';
# Выражение где первый и третий символ любой, второй буква K далее любой набор символов
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE '_К_%';
# Если нужно найти строку где есть % или _ их нужно экранировать следующим образом
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE '%\%%';
# Или так
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE '%!%%' ESCAPE '!';
# Если нужно выбрать несколько значений используем несколько операторов LIKE
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE '%Атак' OR `name` LIKE '%Ашан';
# Иногда требуется реализовать регистронезависимый поиск, сделать это можно перевести все названия в верхний регистр
SELECT `id`,`name`, `full_title` FROM `clients` WHERE UPPER(`name`) LIKE UPPER('%А');
```