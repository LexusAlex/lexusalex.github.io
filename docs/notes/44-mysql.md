---
layout: default
nav_order: 44
permalink: 44-mysql
title: Mysql
parent: Заметки
description: Просто список запросов
date: 2023-01-17 17:15:00 +3
last_modified_date: 2023-01-22 18:14:00 +3
tags:
- mysql
---

# Mysql
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

Список распростаненных запросов mysql, так же сюда можно отнести и mariadb

## Очистка таблицы

```sql
-- Очистка таблицы от данных
TRUNCATE my_table_name
```

## Вставка данных

```sql
-- Простая вставка одной строки, с четким соответствием столбцов
INSERT INTO table2 (a, b, c, d, e) VALUES (1, 2, 3, 4, 5);
-- Или так, в неуказанные столбцы будет вставлен NULL
INSERT INTO table2 SET a=1, b=2, c=3;
-- Множественная вставка нескольких значений
INSERT INTO table2 (a, b, c, d, e) VALUES (1, 2, 3, 4, 5), (NULL,2, NULL, 4, 5), (NULL, NULL, NULL, NULL,5);
```