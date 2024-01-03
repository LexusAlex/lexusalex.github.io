---
layout: default
nav_order: 3
permalink: javascript-3-array-create
title: Создать массив в javascript
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Как создать массив в js
date: 2023-12-24 22:30:00 +3
last_modified_date: 2024-01-03 23:04:00 +3
tags:
- javascript
- js
- questions-and-solutions
---

# Создать массив в javascript
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

Создать массив в js можно основными двумя способами

````javascript
let array1 = [];
let array2 = new Array(); // используется крайне редко
````

## Array.from()

Еще есть вариант создать массив на основе переданного объекта используя `Array.from()`.

Может пригодиться например если нужно коллекцию `NodeList` научить быть массивом.

То есть создаем массив на основе структур, где есть свойство `lenght`.

Подробнее в [заметке](https://lexusalex.ru/javascript-4-array-from){:target="_blank"}.

## Пример 3.1 Создание массива

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/3/3.1-create-array.html" height="100" width="100%"></iframe>

[Открыть пример 3.1 в новой вкладке](/assets/demo/qs/javascript/3/3.1-create-array.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}
