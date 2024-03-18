---
layout: default
nav_order: 5
permalink: javascript-5-array-read-replace-add-delete
title: Массив. Чтение, замена, добавление, удаление
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Работаем с массивом. Читаем, меняем, добавляем и удаляем элементы
date: 2024-01-03 22:15:00 +3
last_modified_date: 2024-03-18 12:40:00 +3
tags:
- javascript
- js
- questions-and-solutions
---

# Массив. Чтение, замена, добавление, удаление
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

## Чтение элементов

Прочитать элемент массива можно по его индексу.

Индекс массива это всегда положительное целое число

````javascript
let array = ['one', 'two', 'three', 'four', 'five'];

console.log(array[0]) // 'one'
console.log(array[3]) // 'four'
````

### Пример 5.1 read

В примере 5.1 мы обращаемся к каждому элементу по его индексу.
Если элемент отсутствует, вернется `undefined`.

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/5/5.1-array-read.html" height="162" width="100%"></iframe>

[Открыть пример 5.1 в новой вкладке](/assets/demo/qs/javascript/5/5.1-array-read.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## Замена элемента

Перезаписать значения можно с помощью оператора присваивания 

````javascript
let array = ['one', 'two', 'three', 'four', 'five'];

array[0] = 'oдин' // 'oдин'
array[3] = 'пять' // 'oдин'
````

В примере 5.2 мы заменим названия чисел на русские их эквиваленты.

### Пример 5.2 replace

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/5/5.2-array-write.html" height="162" width="100%"></iframe>

[Открыть пример 5.2 в новой вкладке](/assets/demo/qs/javascript/5/5.2-array-write.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## Добавить элемент

Рассмотрим способы добавления элементов в массив.

Самый банальный способ это просто сделать следующее

````javascript
let array = ['one', 'two', 'three', 'four', 'five'];
array[array.length] = 'six'; // Добавили в конец массива
````

### Пример 5.3 add

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/5/5.3-array-add.html" height="162" width="100%"></iframe>

[Открыть пример 5.3 в новой вкладке](/assets/demo/qs/javascript/5/5.3-array-add.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

### push добавить в конец массива

С помощью метода `push` в массив можно добавить сразу несколько элементов.

Например:

````javascript
let array = ['one', 'two', 'three', 'four', 'five'];
array.push('six','seven', 'eight'); // one,two,three,four,five,six,seven,eight
````

#### Пример 5.4 push

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/5/5.4-array-push.html" height="162" width="100%"></iframe>

[Открыть пример 5.4 в новой вкладке](/assets/demo/qs/javascript/5/5.4-array-push.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

Если например нужно элементы из одного массива добавить в другой массив, `push` тоже тут поможет, при этом конструкция будет выглядеть следующим образом

Получается merge массивов

````javascript
let array = ['one', 'two', 'three', 'four', 'five'];
array.push(...['six','seven','eight']);  // one,two,three,four,five,six,seven,eight
````

#### Пример 5.4.1 push merge

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/5/5.4.1-array-push-merge.html" height="162" width="100%"></iframe>

[Открыть пример 5.4.1 в новой вкладке](/assets/demo/qs/javascript/5/5.4.1-array-push-merge.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}


### unshift добавить в начало массива

То же самое, но, только элементы добавляются в начало массива

````javascript
let array = ['one', 'two', 'three', 'four', 'five'];
array.unshift('six','seven', 'eight'); // six,seven,eight,one,two,three,four,five
````

#### Пример 5.5 unshift

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/5/5.5-array-unshift.html" height="162" width="100%"></iframe>

[Открыть пример 5.5 в новой вкладке](/assets/demo/qs/javascript/5/5.5-array-unshift.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## Удалить элемент

С удалением элементов из массива у нас есть два метода `pop` и `shift`

### pop удалить с конца

Удалить последний элемент можно с помощью метода `pop`

```javascript
let array = ['one', 'two', 'three', 'four', 'five'];
let delelem = array.pop();   // one,two,three,four
delelem // five - удаленный элемент
```

#### Пример 5.6 pop

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/5/5.6-array-pop.html" height="162" width="100%"></iframe>

[Открыть пример 5.6 в новой вкладке](/assets/demo/qs/javascript/5/5.6-array-pop.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}


### shift удалить с начала

Удалить первый элемент можно с помощью метода `shift`

```javascript
let array = ['one', 'two', 'three', 'four', 'five'];
let delelem = array.shift();   // two,three,four,five
delelem // one - удаленный элемент
```

#### Пример 5.7 shift

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/5/5.7-array-shift.html" height="162" width="100%"></iframe>

[Открыть пример 5.7 в новой вкладке](/assets/demo/qs/javascript/5/5.7-array-shift.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## Вставка элемента

Метод `splice()` изменяет содержимое массива, удаляя или заменяя существующие элементы и/или добавляя новые элементы.

```javascript
let array = ['one', 'two', 'three', 'four', 'five'];
let splice = `array.splice(2, 0 , 'two2')`;   // one,two,two2,three,four
splice // two2 - новый элемент вставлен на 2 позицию, 0 элементов удалено
```

#### Пример 5.7.1 slice

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/5/5.7.1-array-slice.html" height="162" width="100%"></iframe>

[Открыть пример 5.7.1 в новой вкладке](/assets/demo/qs/javascript/5/5.7.1-array-slice.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## Обращение к последнему элементу массива

Чтобы обратится к последнему элементу можно воспользоваться двумя способами

````javascript
let array = ['one', 'two', 'three', 'four', 'five'];
array[array.length - 1]; // five 
array.at(-1); // five 
````

## Примечания

- Чем больше элементов содержит массив, тем больше времени потребуется для того, чтобы их переместить, больше операций с памятью. То есть методы `shift/unshift` работают медленнее, если важен порядок элементов используем `push`

## Update

- 18.03.2024 - Добавлен раздел [Вставка элемента](https://lexusalex.ru/javascript-5-array-read-replace-add-delete#%D0%B2%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0-%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B0), где описана возможность вставки элемента в любую часть массива. Спасибо [Паше](https://t.me/storecrafti)! 

