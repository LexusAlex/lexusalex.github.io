---
layout: default
title: Вопросы и решения
comments: true
summary: Алексей Шмелев - Вопросы и решения
description: Вопросы и решения
permalink: /questions-and-solutions
nav_order: 8
---

# Вопросы и решения
{: .no_toc }

<details close markdown="block">
  <summary>
    Содержание
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>
---

TODO Когда будет что сортировать - разбить по тегам, пока просто по большим темам.

## SQL

### mysql

#### Как найти строку по шаблону с помощью оператора LIKE

Оператор `LIKE` используется в выражениях sql для поиска строк подходящих под шаблон.
Шаблон включает следующие специальные символы:

- `%` - любой символ от 0 и больше
- `_` - один любой символ

Удобно использовать для поиска.

```mysql
# Точное совпадение, что в принцепи равно SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` = 'Тест'
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE 'Тест';
# Выражение должно начинатся с буквы А
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE 'А%';
# В выражении должна быть буква а
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE '%а';
# Самый распростаненный вариант буква А в любой позиции в выражении
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE '%А%';
# Выражение из двух букв, любой символ + баква Б
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE '_Б';
# Выражение где первый и тертий символ любой, второй буква K далее любой набор символов
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE '_К_%';
# Если нужно найти строку где есть % или _ их нужно экранировать следующим образом
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE '%\%%';
# Или так
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE '%!%%' ESCAPE '!';
# Если нужно выбрать несколько значений используем несколько операторов LIKE
SELECT `id`,`name`, `full_title` FROM `clients` WHERE `name` LIKE '%Атак' OR `name` LIKE '%Ашан';
# Иногда требуется реализовать реристронезависимый поиск, сзелать это можно перевести все названия в верхний регистр
SELECT `id`,`name`, `full_title` FROM `clients` WHERE UPPER(`name`) LIKE UPPER('%А');
```