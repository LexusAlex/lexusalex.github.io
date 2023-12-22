---
layout: default
nav_order: 1
permalink: javascript-1-dom-delete
title: Удаление узлов в DOM
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Как удалить узел в javascript
date: 2023-05-18 14:00:00 +3
last_modified_date: 2023-12-22 23:30:00 +3
tags:
- javascript
- js
- jquery
- questions-and-solutions
---

# Удаление узлов в DOM
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

## remove()

Самый простой и правильный вариант удаления узла использовать функцию `remove()` вызванную у самого удаляемого узла

```javascript
let e = document.querySelector('.element');
e.remove(); // узел будет удален из дерева
```

### Пример 1.1

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/1/1.1-remove.html" height="130" width="100%"></iframe>

[Открыть пример 1.1 в новой вкладке](/assets/demo/qs/javascript/1/1.1-remove.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

Если нужно удалить несколько элементов сразу, будем это делать в цикле перебирая полученную
коллекцию и на каждом элементе вызывать `remove()`

```javascript
let collection = document.querySelectorAll('.parent > div'); // Коллекция элементов которые нужно удалить
for (const element of collection) {
    element.remove(); // Удаляем
}
```

### Пример 1.2

Теперь удалим в цикле 5 элементов сразу 

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/1/1.2-remove-collection.html" height="150" width="100%"></iframe>

[Открыть пример 1.2 в новой вкладке](/assets/demo/qs/javascript/1/1.2-remove-collection.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## removeChild()

Существует еще метод, который удаляет дочерний элемент - это `removeChild()` и возвращает его, чтобы использовать его например в дальнейшем.

```javascript

let parent = document.querySelector('.parent'); // Выбираем родительский элемент
let deleted = document.querySelector('.deleted'); // Выбираем контейнер для удаленных элементов
let child = parent.firstElementChild; // Элемент который нужно удалить
if (child !== null) {
    let deletedElement = parent.removeChild(child); // Удаляем элемент, при этом из функции будет возвращен удаленный элемент
    deleted.append(deletedElement);
}
```

### Пример 1.3

Имеем список элементов, из которого нужно удалить элементы. Удаленные элементы перемещаем в другой список. 

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/1/1.3-remove-child.html" height="250" width="100%"></iframe>

[Открыть пример 1.3 в новой вкладке](/assets/demo/qs/javascript/1/1.3-remove-child){:target="_blank"}{:rel="nofollow noopener noreferrer"}

Еще пример, отдельная кнопка для удаления каждого элемента.

### Пример 1.4 Удаление отдельного элемента

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/1/1.4-remove-child-multiply.html" height="180" width="100%"></iframe>

[Открыть пример 1.4 в новой вкладке](/assets/demo/qs/javascript/1/1.4-remove-child-multiply.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## jquery remove()

Если используется jquery, там есть метод `remove()`

```javascript
$('#selector_for_remove').remove() // Удалили сам элемент и повешенные на него обработчики
```

### Пример 1.5 Удаление отдельного элемента

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/1/1.5-remove-jquery.html" height="100" width="100%"></iframe>

[Открыть пример 1.5 в новой вкладке](/assets/demo/qs/javascript/1/1.5-remove-jquery.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

### Пример 1.6 Удаление нескольких элементов

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/1/1.6-remove-jquery-multiple.html" height="150" width="100%"></iframe>

[Открыть пример 1.6 в новой вкладке](/assets/demo/qs/javascript/1/1.6-remove-jquery-multiple.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## Исходный код

- [Пример 1.1](https://raw.githubusercontent.com/LexusAlex/lexusalex.github.io/master/assets/demo/qs/javascript/1/1.1-remove.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}
- [Пример 1.2](https://raw.githubusercontent.com/LexusAlex/lexusalex.github.io/master/assets/demo/qs/javascript/1/1.2-remove-collection.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}
- [Пример 1.3](https://raw.githubusercontent.com/LexusAlex/lexusalex.github.io/master/assets/demo/qs/javascript/1/1.3-remove-child.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}
- [Пример 1.4](https://raw.githubusercontent.com/LexusAlex/lexusalex.github.io/master/assets/demo/qs/javascript/1/1.4-remove-child-multiply.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}
- [Пример 1.5](https://raw.githubusercontent.com/LexusAlex/lexusalex.github.io/master/assets/demo/qs/javascript/1/1.5-remove-jquery.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}
- [Пример 1.6](https://raw.githubusercontent.com/LexusAlex/lexusalex.github.io/master/assets/demo/qs/javascript/1/1.6-remove-jquery-multiple.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}