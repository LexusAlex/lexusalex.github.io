---
layout: default
nav_order: 3
permalink: no-sql-3-mongodb-insert-documents
title: Mongodb. Добавление документа
parent: no-sql
grand_parent: Вопросы и решения
has_children: true
description: Изучаем mongodb. Теперь понимаем как добавить документ
date: 2024-05-05 13:00:00 +3
last_modified_date: 2024-05-05 13:00:00 +3
tags:
- mongodb
- questions-and-solutions
---

# Mongodb. Добавление документа
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
// Тут можно вкладывать сколько угодно вложенных значений
// Добавим одну запись
db.one.insertOne({
    number: "1",
    type: "текст",
    humans: [
        {
            name: "Петрович",
            status: "active"
        },
        {
            name: "Тест",
            status: "passive"
        },
    ]
})
// Добавим несколько записей
db.one.insertMany([
{
    number: "1",
    type: "текст",
    humans: [
        {
            name: "Петрович",
            status: "active"
        },
        {
            name: "Тест",
            status: "passive"
        },
    ]
},
{
        number: "2",
        type: "текст2",
        humans: [
            {
                name: "Петрович1",
                status: "active"
            },
            {
                name: "Тест1",
                status: "passive"
            },
            {
                name: "Тест56",
                status: "passive"
            },
        ]
    }
]);
````