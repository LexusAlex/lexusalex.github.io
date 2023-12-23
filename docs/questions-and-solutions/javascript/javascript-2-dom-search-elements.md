---
layout: default
nav_order: 2
permalink: javascript-2-dom-search-elements
title: Поиск элементов в DOM
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Способы поиска элементов в DOM дереве
date: 2023-12-23 23:00:00 +3
last_modified_date: 2023-12-23 23:00:00 +3
tags:
- javascript
- js
- jquery
- questions-and-solutions
---

# Поиск элементов в DOM
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

Найти элемент на странице можно несколькими способами, полезно всех их знать и уметь применять.

## getElementById()

Если элемент на странице имеет атрибут `id`, то его можно получить с помощью метода `getElementById()`. Важно, чтобы на
одной странице он был уникальный, тогда поиск будет работать быстро.

````javascript
let element = document.getElementById('elementId'); // Получили элемент или null
// используем как нужно
````

### Пример 2.1 Поиск элементов на странице getElementById()

Найдем и выделим элемент

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/2/2.1-search-getelementbyid.html" height="100" width="100%"></iframe>

[Открыть пример 2.1 в новой вкладке](/assets/demo/qs/javascript/2/2.1-search-getelementbyid.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## querySelector()

Метод позволяет по селектору найти один элемент на странице. Селектор может быть любого типа. Если элемент отсутствует
метод вернет `null`.


````javascript
document.querySelector('#test')
document.querySelector('.element')
document.querySelector('div > p')
````

Можно сужать поиск и искать не по всему документу, а начиная о конкретного элемента.

````javascript
element.querySelector('#child-element');
````

В примере 2.2 у нас несколько элементов с одним и тем же классом, при этом будет найден первый элемент.

Так же у нас есть два элемента с одним и тем же классом, которые находятся в разных родительских элементах.
Выберем родительский и от него найдем его дочерний.

### Пример 2.2 querySelector

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/2/2.2-search-queryselector.html" height="100" width="100%"></iframe>

[Открыть пример 2.2 в новой вкладке](/assets/demo/qs/javascript/2/2.2-search-queryselector.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## querySelectorAll()

Если нужно по селектору вернуть коллекцию элементов, то для этого можно использовать метод `querySelectorAll()`.

В результате будет возвращена коллекция `NodeList`, если элементов нет она будет пустой.
 
````javascript
let elements = document.querySelectorAll('ul > li.list'); // Получим коллекцию элементов
````

### Пример 2.3 querySelectorAll

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/2/2.3-search-queryselectorall.html" height="100" width="100%"></iframe>

[Открыть пример 2.3 в новой вкладке](/assets/demo/qs/javascript/2/2.3-search-queryselectorall.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## getElementsByTagName()

Вернуть коллекцию элементов (HTMLCollection) по названию тега.

### Пример 2.4 getElementsByTagName()

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/2/2.4-search-getelementsbytagname.html" height="100" width="100%"></iframe>

[Открыть пример 2.4 в новой вкладке](/assets/demo/qs/javascript/2/2.4-search-getelementsbytagname.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## getElementsByClassName()

Вернуть коллекцию элементов (HTMLCollection) передав в метод названия классов.

### Пример 2.5 getElementsByClassName()

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/2/2.5-search-getelementsbyclassname.html" height="100" width="100%"></iframe>

[Открыть пример 2.5 в новой вкладке](/assets/demo/qs/javascript/2/2.5-search-getelementsbyclassname.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## Резюме

## Примечания

- querySelectorAll() возвращает статическую коллекцию, при изменении элементов коллекцию нужно обновлять дополнительно.
- Передав `*` можно получить всех потомков родителя
- Все методы `getElementsBy*` возвращают живую коллекцию.

## Исходный код
