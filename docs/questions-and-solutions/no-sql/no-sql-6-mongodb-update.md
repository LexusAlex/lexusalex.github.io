---
layout: default
nav_order: 6
permalink: no-sql-6-mongodb-update
title: Mongodb. Обновление документов
parent: no-sql
grand_parent: Вопросы и решения
has_children: true
description: Изучаем mongodb. Обновление документов
date: 2024-05-05 20:00:00 +3
last_modified_date: 2024-05-05 20:00:00 +3
tags:
- mongodb
- questions-and-solutions
---

# Mongodb. Обновление документов
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
db.one.updateOne({_id:ObjectId("66379acd1e858052620736fd")}, {$set: {number: 7}}) // Обновление обьекта одной записи
db.one.updateMany({type:"текст"}, {$set: {number: 8}}) // Обновление несколкьх записей
db.one.updateOne({_id:ObjectId("66379acd1e858052620736fd")}, {$inc: {number: 2}}); // Просто увеличить значение на 2
````