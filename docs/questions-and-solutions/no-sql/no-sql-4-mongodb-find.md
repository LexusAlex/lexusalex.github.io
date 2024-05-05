---
layout: default
nav_order: 4
permalink: no-sql-4-mongodb-find
title: Mongodb. Поиск документов
parent: no-sql
grand_parent: Вопросы и решения
has_children: true
description: Изучаем mongodb. Поиск документов
date: 2024-05-05 13:00:00 +3
last_modified_date: 2024-05-05 13:00:00 +3
tags:
- mongodb
- questions-and-solutions
---

# Mongodb. Поиск документов
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
// Элементов выводится только 20 штук
db.one.find({}) // Найти все в коллекции
db.one.find({number:'2'}) // Поиск по определенному полю
db.one.find({number:'1', type: 'текст56'}) // Уточнение
db.one.find({number:'1'}, {number:1, type: 1}) // Выбрать нужные поля
db.one.find({}, {number:1, type: 1}) // Все элементы, но только 2 колонки

db.one.findOne({_id: ObjectId("663750001e858052620736f1")},{type:1}) // вернуть только один элемент, тогда нужно передать id элемента
db.one.find({}).limit(3) // Вернуть три документа
db.one.find({}).limit(3).sort({type: 1}) // Сортировать по алфавиту
db.one.find({}).limit(3).sort({type: -1}) // Сортировка в обратном порядке
db.one.find({}).limit(3).sort({type: 1,number: 1}) // Сортировка по двум полям

db.one.find({number:{$gt:"2"}}) // Больше 2 не включая 2
db.one.find({number:{$gte:"2"}}) // Больше 2 включая 2
db.one.find({number:{$lt:"4"}}) // Меньше 4 не включая 4
db.one.find({number:{$lte:"4"}}) // Меньше 4 включая 4
db.one.find({number:{$eq:"4"}}) // Точное значение 4 идентично find
db.one.find({number:{$ne:"4"}}) // Все что не равно 4
db.one.find({number:{$eq:"1"}, type: "текст56"}) // Два условия

db.one.find({$or: [{number:"4"},{type:"текст2"}]}) // Условие или
db.one.find({$and: [{number:"4"},{type:"текст"}]}); // Условие и
db.one.find({number: {$in: ["1","2"]}}) // Только перечисленные значения 
db.one.find({number: {$nin: ["1","2"]}}) // Все кроме этих значений

db.one.find({test: "one"}); // Поиск в массиве по всем элементам, где one входит в состав массива
db.one.find({test: ["one"]}); // Где в массиве только элемент one
db.one.find({test: { $all: ["two"]}}); // Где есть хоть одно вхождение
db.one.find({"humans.name": { $all: ["Петрович"]}}); // Ищем поле во вложенном объекте
db.one.find({"humans.name": {$in:["Петрович","Петрович2"]}}); // Или так, найдем сразу несколько
db.one.find({"humans.a.b.c.d": 1}) // Или таким образом

db.one.find({type: null}) // Найти значения без значения
db.one.distinct("humans") // Уникальные значения
````