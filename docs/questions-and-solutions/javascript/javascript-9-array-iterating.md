---
layout: default
nav_order: 9
permalink: javascript-9-array-iterating
title: Перебирающие методы массивов
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Как перебрать массив элементов с помощью методов
date: 2024-01-21 16:30:00 +3
last_modified_date: 2024-01-21 16:30:00 +3
tags:
- javascript
- js
- questions-and-solutions
---

# Перебирающие методы массивов
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

В продолжении [заметки](https://lexusalex.ru/javascript-8-array-traversing) про перебор массива с помощью циклов, 
продолжаем изучать методы для перебора массива.

Подготовим массив для перебора

````javascript
let array = Array.from({length: 30}, function (value, index){return index});
````

## forEach

`forEach` позволяет заменить цикл `for`, но при этом код становится более читаемым.

Простейший пример, просто выводим элементы:

````javascript
array.forEach((value) => { // Внутрь передать callback функцию
    console.log(value); // 0 1 2 3 4 5 6 7 ...
})
````

callback функция принимает три параметра:

- `value` - элемент массива в текущей итерации
- `index` - индекс элемента
- `array` - сам перебираемый массив

Выведем все три элемента

````javascript
array.forEach((value, index, array) => {
    console.log(value, index , array);
});
// Что эквивалентно
array.forEach(console.log)
````

Просто выведем все три переменный на страницу в примере 9.1

### Пример 9.1

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/9/9.1-array-foreach.html" height="183" width="129%"></iframe>

[Открыть пример 9.1 в новой вкладке](/assets/demo/qs/javascript/9/9.1-array-foreach.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}


### Пример 9.2

Пора сделать что-нибудь полезное, например умножим каждый элемент в массиве на 5 и выведем результат на экран и проследим за ходом выполнения операции над каждым элементом

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/9/9.2-array-foreach-2.html" height="183" width="129%"></iframe>

[Открыть пример 9.2 в новой вкладке](/assets/demo/qs/javascript/9/9.2-array-foreach-2.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

### Итог

- `forEach()` применяется если нужно совершить операцию на всем элементами массива.
- В `forEach()` не работает прерывание итерации по массиву, то есть  `return`, `break` , `continue`, лучше воспользуйтесь `for`
- `forEach()` обрабатывает элементы в прямом порядке
- `forEach()` есть в любом массиве
- `forEach()` ничего не возвращает, даже если что-то вернуть из foreach, значение никак не будет использоваться дальше

## map

Возвращает новый массив из старого.

````javascript
let new_array = array.map((value, index, array) => {
    return value * 5;
});
// В new_array будет новый масссив где каждый элемент будет умножен на 5
````

### Пример 9.3

Умножим каждый элемент в массиве на 5 и выведем результат на экран.

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/9/9.3-array-map.html" height="152" width="129%"></iframe>

[Открыть пример 9.3 в новой вкладке](/assets/demo/qs/javascript/9/9.3-array-map.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}


С помощью `map` можно делать цепочки вызывов, так как `map` возвращает новый массив.

К примеру:

````javascript
let new_array = array.map((value) => {
    return value * 2;
}).map((value) => {
    return value - 1;
}).map((value) => {
    return value + 5;
}).map((value) => {
    return value * 7;
});
````

### Пример 9.4

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/9/9.4-array-map-2.html" height="152" width="100%"></iframe>

[Открыть пример 9.4 в новой вкладке](/assets/demo/qs/javascript/9/9.4-array-map-2.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

Так же в `map` можно передать и второй аргумент это контекст выполнения. Это еще один объект который можно использовать внутри.

К примеру:

````javascript
let new_array = array.map(function (value, index, array) {
    return value + this.test;
}, {'test': 8});
````

### Пример 9.5

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/9/9.5-array-map-3.html" height="152" width="100%"></iframe>

[Открыть пример 9.5 в новой вкладке](/assets/demo/qs/javascript/9/9.5-array-map-3.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}


### Итог

- `map` позволяет писать код короче и проще для понимания
- `map` возвращает новый массив при этом исходный массив никак не видоизменяется
- Из `map` нужно обязательно вернуть результат итерации иначе вернется `undefined`
- В отличие от `forEach()` ничего не возвращает `map` возвращает новый массив.
- В реакте `map` самый распространенный способ трансформировать массив данных.

## every
## some
## reduce
## filter