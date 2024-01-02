---
layout: default
nav_order: 4
permalink: javascript-4-array-from
title: Array.from() новый массив на основе объекта
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Как сделать новый массив на основе массивоподобного объекта
date: 2023-12-31 22:30:00 +3
last_modified_date: 2024-01-02 15:50:00 +3
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

`Array.from()` позволяет вам создавать массивы из:

- массивоподобных объектов (имеющих свойство `length`)
- итерируемых объектов

Перейдем к примерам.

## Из строки в массив

Каждый символ - это отдельный элемент массива

````javascript
let string = 'Строка на русском языке'
Array.from(string); // Получаем массив Array(23) [ "С", "т", "р", "о", "к", "а", " ", "н", "а", " ", … ]
````

## Коллекция NodeList в массив

Второй параметр принимает функцию которая, работает как метод `map`.

Имеем обычный список 

````html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>
````

Преобразуем коллекцию в массив. Плюс мы можем модифицировать каждый элемент как нам надо с помощью второго параметра.
 
````javascript
let list = document.querySelectorAll('li');
Array.from(list, function (li){ return li}); // Array(4) [ li, li, li, li ] // в данном случае это просто массив элементов
````

## Объект в массив

Например, можно преобразовать кастомный с искусственным свойством `lenght`.

````javascript
let object = {0: [1], 1: [2], length:2};
Array.from(object); //Array [ (1) […], (1) […] ] // получим полноценный массив в котором будут доступны все методы массивов
````

## Set в массив

Множество уникальных элементов `Set` тоже возможно преобразовать в массив.

````javascript
const set = new Set(["Россия", "Россия", "USA", 1, 3, 7, 89, "Россия"]); // Уникальные элементы
Array.from(set);  // Array(6) [ "Россия", "USA", 1, 3, 7, 89 ] // Преобразовали в массив
````
 
## Map в массив

````javascript
const map = new Map([[1,1],[2,2],[3,3]]);
Array.from(map); // Array(3) [ (2) […], (2) […], (2) […] ]
````

## Генерирование массива последовательностей

Можно использовать `Array.from` для генерации последовательностей, например

````javascript
Array.from({length: 100}, function (value, index){return index}); // Array(100) [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, … ] // Сгенерировали массив из 100 элементов
````

## Пример 4.1

В примере 4.1 все случаи рассмотренные выше

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/4/4.1-array-from.html" height="162" width="100%"></iframe>

[Открыть пример 4.1 в новой вкладке](/assets/demo/qs/javascript/4/4.1-array-from.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## Итог

- `Array.from` создан чтобы облегчить преобразование массивоподобного объекта в массив, что удобно

