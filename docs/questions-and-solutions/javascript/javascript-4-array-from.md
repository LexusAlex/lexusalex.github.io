---
layout: default
nav_order: 4
permalink: javascript-4-array-from
title: Array.from() новый массив на основе объекта
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Как сделать новый массив на основе объекта
date: 2023-12-31 22:30:00 +3
last_modified_date: 2023-12-31 22:30:00 +3
tags:
- javascript
- js
- questions-and-solutions
---

# Array.from() новый массив на основе объекта
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

Способ создать новый заполненный массив на основе переданного объекта - это функция `Array.from()`.

Array.from() позволяет вам создавать массивы из:

- массивоподобных объектов (имеющих свойство `length`)
- итерируемых объектов

Перейдем к примерам.

# Из строки в массив

````javascript
let string = 'Строка на русском языке'
Array.from(string); // Array(23) [ "С", "т", "р", "о", "к", "а", " ", "н", "а", " ", … ]
````

