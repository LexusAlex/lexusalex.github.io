---
layout: default
nav_order: 2
permalink: javascript-2-input-checkbox
title: Работаем с input типа checkbox в javascript
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Какие есть способы и приемы работы с input checkbox в javascript
date: 2023-06-30 15:00:00 +3
last_modified_date: 2023-06-30 15:00:00 +3
tags:
- javascript
- js
- questions-and-solutions
---

# Работаем с input типа checkbox в javascript
{: .no_toc }

Одна из частых задач в js это работа с элементами формы checkbox. Различные списки и настройки.
Работа с ними идет к получению элементов и перебору их.

Базовый пример, просто их получим, переберем, и отметим для примера.

```html
<table class="table table-striped">
	<tr>
		<td>#</td>
		<td>№</td>
	</tr>
	<tr>
		<td><input class="check" id="check_1" type="checkbox" name="check[1]" value="1"></td>
		<td>1</td>
	</tr>
	<tr>
		<td><input class="check" id="check_2" type="checkbox" name="check[2]" value="2"></td>
		<td>2</td>
	</tr>
	<tr>
		<td><input class="check" id="check_3" type="checkbox" name="check[3]" value="3"></td>
		<td>3</td>
	</tr>
	<tr>
		<td><input class="check" id="check_4" type="checkbox" name="check[4]" value="4"></td>
		<td>4</td>
	</tr>
</table>
<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
<script>
	let checkboxes = document.querySelectorAll('.check');
	for (const input of checkboxes) {
		input.checked = true; // Отметим все чекбоксы
	}
	
</script>
```
