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
last_modified_date: 2023-05-18 14:00:00 +3
tags:
- javascript
- js
- questions-and-solutions
---

# Удаление узлов в DOM
{: .no_toc }

Самый простой и правильный вариант удаления узла использовать функцию `remove()` вызванную у самого узла

```javascript
let e = document.querySelector('.element');
e.remove(); // узел будет удален из дерева
```

Существует еще, но уже устаревшая функция - это `removeChild()`

Например, у нас есть разметка:

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
      <title>123</title>
  </head>
  <body>

  <div class="parent">
	<div class="child1">child1</div>
	<div class="child2">child2</div>
	<div class="child3">child3</div>
	<div class="child4">child4</div>
  </div>
  	<script>
		let parent = document.querySelector('.parent'); // Выбираем родительский элемент
		let child4 = document.querySelector('.child4'); // Элемент который нужно удалить
		parent.removeChild(child4); // Удаляем элемент, при этом из функции будет возвращен удаленный элемент
	</script>
  </body>
</html>
```

Если нужно удалить несколько элементов, будем это делать в цикле перебирая
коллекцию и на каждом элементе вызывая `remove()`

```javascript
let collection = document.querySelectorAll('.parent > div'); // Коллекция элементов которые нужно удалить
for (const element of collection) {
    element.remove(); // Удаляем
}
```

Если используется jquery, там есть метод `remove()`

```javascript
$('#selector_for_remove').remove() // Удалили сам элемент и повешенные на него обработчики
```