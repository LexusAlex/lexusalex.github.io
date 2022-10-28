---
layout: default
nav_order: 7
permalink: js-dom-search-elements
title: Поиск элементов
parent: js
description: Ищем элементы в dom дереве
date: 2022-10-28 10:00:00 +3
last_modified_date: 2022-10-28 10:00:00 +3
tags:
- js

---

# Поиск элементов
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

## getElementById

Очень часто используемый метод поиск по идентификатору

```html
<ul id="list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```

```javascript
document.getElementById('list'); // ul элемент, если бы элемента не нашлось вернется null 
```

- Значения атрибутов id в рамках одной странице должны быть уникальными.
- Поиск таких элементов работает быстро и осуществляется по всему документу
- Такой метод есть только у объекта `document`

## querySelectorAll

Универсальный способ найти элементы по css селектору

Работаем с примером выше

```javascript
document.querySelectorAll('#list') // Коллекция NodeList c элементом ul
document.querySelectorAll('ul>li') // Коллекция NodeList c четырьмя элементами li
document.querySelectorAll('*') // Получим все элементы на странице
```

## querySelector

Возвращает первый элемент из коллекции, что аналогично `querySelectorAll(css)[0]`

```javascript
document.querySelector('li') // Найдет первый элемент li
```

## matches и closest

`matches` Удовлетворяет ли элемент коллекции селектору, а `closest` ищет ближайшего родителя удовлетворяющему селектору

```javascript
document.querySelectorAll('ul>li')[0].matches('li') // true
document.querySelectorAll('ul>li')[0].closest('body') // body
```

Дописать про другие редко используемые методы `getElementBy...`

