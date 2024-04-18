---
layout: default
nav_order: 1
permalink: no-sql-1-mongodb-start
title: Mongodb. Первый взгляд
parent: no-sql
grand_parent: Вопросы и решения
has_children: true
description: Изучаем mongodb
date: 2024-04-18 13:00:00 +3
last_modified_date: 2024-04-18 13:00:00 +3
tags:
- english
- questions-and-solutions
---

# Mongodb. Первый взгляд
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

## Базовые команды

````text
# Выбор подходящей базы
use admin # При этом неважно была эта база создана или нет, если нет то она будет создана

# Просмотр всех баз на сервере
use dbs

# Текущая база
db

# Список коллекций
show collections 
db.getCollectionNames()

# Добавить коллекцию
db.createCollection('test')
````

## Вставка данных

````text
// Вставить одну запись, при этом если коллекции test8 у нас нет то она будет создана
db.test8.insertOne({"value3": 1})

// С разными типами данных
db.test8.insertOne(
    {
        "string": "Строка",
        "number": 1234,
        "number": Int32("1234"),
        "number": Long("123456789123456789"),
        "array": ["string1","string2",[1,2,3,4]]
    }
    )
    
// Вставка стразу несколько строк
db.test.insertMany(
    [
        {"test":[[[[[[[[1]]]]]]]]},
        {"test": 1},
        {   title: "Jurassic World: Fallen Kingdom",
            genres: [ "Action", "Sci-Fi" ],
            runtime: 130,
            rated: "PG-13",
            year: 2018,
            directors: [ "J. A. Bayona" ],
            cast: [ "Chris Pratt", "Bryce Dallas Howard", "Rafe Spall" ],
            type: "movie"
        }
    ]
)    
````

## Выборка данных

````text
// Все документы коллекции
db.test8.find({})
// Или так
db.getSiblingDB("admin").getCollection("test8").find({})
// Выборка по условию
db.test8.find({"value":1})
````