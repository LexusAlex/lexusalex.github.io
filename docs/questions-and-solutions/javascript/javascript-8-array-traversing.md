---
layout: default
nav_order: 8
permalink: javascript-8-array-traversing
title: Перебор элементов массива
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Как перебрать массив элементов
date: 2024-01-14 22:30:00 +3
last_modified_date: 2024-01-14 22:30:00 +3
tags:
- javascript
- js
- questions-and-solutions
---

# Перебор элементов массива
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

Подготовим массив для перебора

````javascript
let array = Array.from({length: 30}, function (value, index){return index});
````

## for

Первый банальный способ - это с помощью цикла `for`

````javascript
// Прямой порядок
for (let i = 0; i < array.length; i+= 1) {
    console.log(array[i]); // 0 1 2 ....
}

// Обратный порядок
for (let i = array.length - 1; i >= 0; i-= 1) {
    console.log(array[i]);
}
````

## for ... of

Новый способ пройти массив, выглядит лаконичнее простого `for`

````javascript
for (let number of array) {
     console.log(number);
}
````

## Итог 

Если нужен числовой индекс элемента, то используем `for` иначе используем `for of`.

В одной из следующих заметок разберем перебирающие методы массивов, которые дадут больше 
возможностей при итерации по массиву.