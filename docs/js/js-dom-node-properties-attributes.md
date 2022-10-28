---
layout: default
nav_order: 8
permalink: js-dom-node-properties-attributes
title: Свойства и атрибуты узлов
parent: js
description: Более подробнее о свойствах и атрибутах узлов
date: 2022-10-28 14:00:00 +3
last_modified_date: 2022-10-28 14:00:00 +3
tags:
- js

---

# Свойства и атрибуты узлов
{: .no_toc }

<details open markdown="block">
  <summary>
    Содержание
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>
---

- `nodeType` - числовое обозначение типа узла
- `nodeName` - определено для любых Node узлов, для элементов оно равно tagName
- `nodeValue` - значение узла, у элементов его нет, у текстового узла - это его содержимое
- `textContent` - Текстовое содержимое узла, без тегов
- `hidden` - Указывает, скрывать элемент

```javascript
document.documentElement.nodeType // 1
document.documentElement.nodeName  // HTML
document.documentElement.tagName  // HTML
document.documentElement.nodeValue  // null
document.getElementById('list').childNodes[1].childNodes[0].nodeType // 3
document.getElementById('list').childNodes[1].childNodes[0].nodeName // "#text"
document.getElementById('list').childNodes[1].childNodes[0].nodeValue // 1
document.getElementById('list').firstElementChild.firstChild.nodeValue // 1
document.getElementById('list').firstElementChild.firstChild.data // 1
document.getElementById('list').textContent
/*
"
  1
  2
  3
  4
"
 */
// Но писать суда текст намного безопаснее, что горазддо удобнее
document.getElementById('list').firstElementChild.textContent = '77' // Получили первй элемент списка, заменили там контент 
document.getElementById('list').firstElementChild.hidden = true // элементу будет присвено display:none
```

- Имена тегов всегда пишутся в верхнем регистре.
## Свойства узлов

### innerHTML

Позволяет прочитать и установить содержимое элемента в виде строки, которое полностью заменит предыдущее.

Для примера:

```html
<ul id="list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```

Получим и заменим содержимое

```javascript
document.getElementById('list').innerHTML 
/*
"
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
"
 */

document.getElementById('list').innerHTML = 'Новое содержимое' // Заменили полностью содержимое элемента
document.getElementById('list').innerHTML += "<li>5</li>"// Добавили в конец еще один элемент списка

// C помощью такого можно твоить такие вещи, но так добавлять не рекомендуется, так как здесь происходит перезапись
let list = document.querySelector('#list');
for (let i = 5; i < 100; i++) {
    list.innerHTML += "<li>"+i+"</li>"; // добавили 95 элементов в список
}
```

- Если innerHTML вставляет в документ тег <script> – он становится частью HTML, но не запускается.

### outerHTML

Содержит элемент целиком

```javascript
document.getElementById('list').outerHTML
/*
"<ul id=\"list\">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>" 
 */
```

- Не рекомендуется менять содержимое элемента через этот метод.

Существуют и много других свойств у узлов, по ходу изучения будем дописывать сюда

## HTML атрибуты

Для большинства элементов, html атрибуты становятся свойствами dom объекта, большинство стандартных html атрибутов распознаются
парсером и создается автоматически.

Но здесь надо учесть, что стандартный атрибут для одного тега, может быть нестандартным для другого тега

```javascript
document.getElementById('list').attributes // Получим коллекцию атрибутов NamedNodeMap у элемента ul
document.getElementById('list').attributes[0].nodeType // 2 Тип атрибут
document.getElementById('list').attributes[0].name // id
document.getElementById('list').attributes[0].nodeName // id
document.getElementById('list').attributes[0].value // list
document.getElementById('list').attributes[0].nodeValue // list
document.getElementById('list').hasAttribute('id') // true Проверка на наличие атрибута
document.getElementById('list').getAttribute('id') // list Получим значение атрибута
document.getElementById('list').setAttribute('test', 'test') // Установить атрибут
document.getElementById('list').removeAttribute('id') // Удалить атрибут
```

- Коллекция атрибутов является перебираемой

## data атрибут

Получить специальный зарезервированный data атрибут можно так.

Например, в такой разметке

```html
<ul id="list" data-test="Test text">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```

```javascript
document.querySelector('#list').dataset.test // Test text
// для такого атрибута data-order-state, свойство будет таким dataset.orderState
```

Использование data-* атрибутов – валидный, безопасный способ передачи пользовательских данных.
