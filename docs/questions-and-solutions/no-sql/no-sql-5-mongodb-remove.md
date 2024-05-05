---
layout: default
nav_order: 5
permalink: no-sql-5-mongodb-remove
title: Mongodb. Удаление документов
parent: no-sql
grand_parent: Вопросы и решения
has_children: true
description: Изучаем mongodb. Удаление документов
date: 2024-05-05 20:00:00 +3
last_modified_date: 2024-05-05 20:00:00 +3
tags:
- mongodb
- questions-and-solutions
---

# Mongodb. Удаление документов 
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

````text
db.one.deleteOne({_id:ObjectId("6637972c1e858052620736fb")}) // Удалить один документ
db.one.deleteMany({number:"2"}) // Удалить несколько документов
````