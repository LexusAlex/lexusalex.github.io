---
layout: default
nav_order: 2
permalink: no-sql-2-mongodb-create-db-and-collections
title: Mongodb. Создание базы и коллекции
parent: no-sql
grand_parent: Вопросы и решения
has_children: true
description: Изучаем mongodb
date: 2024-05-01 16:00:00 +3
last_modified_date: 2024-05-01 16:00:00 +3
tags:
- mongodb
- questions-and-solutions
---

# Mongodb. Создание базы и коллекции
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

База данных будет создана только если в ней есть коллекция, поэтому нужно создавать все сразу

````text
use tasks_board // Создать и переключится на базу
db.createCollection('one'); // Сразу же создаем коллекцию, иначе ничего не получится
db.getSiblingDB("tasks_board").getCollection("one") // Обратиться к бд можно след образом
````

````text
db.one.countDocuments() // Всего документов в коллекции
db // Имя активной базы
````