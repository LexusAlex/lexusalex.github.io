---
layout: default
nav_order: 1
permalink: html-css-1-grid
title: Что такое grid
parent: html-css
grand_parent: Вопросы и решения
has_children: true
description: Изучаем grid
date: 2024-03-26 14:00:00 +3
last_modified_date: 2024-03-26 14:00:00 +3
tags:
- css
- questions-and-solutions
---

# Что такое grid
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

Grid - один из способов построения сеток.

## Определения

- Контейнер - родительский элемент с `display:grid`.
- Элемент - Прямой потомок контейнера.
- Линия - Линия формирующая структуру grid, используется для привязки элементов.
- Ячейка - Пространство между линиями. Единица сетки.
- Полоса - Пространство между двумя полосами.
- Область - Область ограниченная четырьмя линиями. Как по вертикали, так и по горизонтали.

## Контейнер

Создадим контейнер, снаружи он ведет себя как блок. Добавим туда несколько элементов

````html
<style>
  .container {
    display: grid;
  }
</style>
<div class="container">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
</div>
````

### Пример 1.1

По умолчанию без задания дополнительных свойств, они просто заполняют всю область родителя.
То есть 5 рядов и 1 колонка.

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/html-css/1/1.1-container.html" height="150" width="100%"></iframe>

[Открыть пример 1.1 в новой вкладке](/assets/demo/qs/html-css/1/1.1-container.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## Ряды и колонки

Рядами и колонками можно управлять.

Размеры колонок задаются свойством `grid-template-columns`

````css
.container {
    display: grid;
    background-color: #e0daec;
    grid-template-columns: 50%;
}
````

В примере 1.2 Добавим 8 элементов и разобьем их на 4 колонки, так же укажем имена для линий, хотя это необязательно

````css
.container {
    display: grid;
    background-color: #e0daec;
    grid-template-columns: [first] 25% [second] 25% [third] 25% [four] 25%;
}
````

### Пример 1.2

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/html-css/1/1.2-cols.html" height="150" width="100%"></iframe>

[Открыть пример 1.2 в новой вкладке](/assets/demo/qs/html-css/1/1.2-cols.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

Ряды можно задать `grid-template-rows`.
Здесь мы жестко задаем размеры каждой колонки.

````css
 .container {
    display: grid;
    background-color: #e0daec;
    grid-template-rows: 100px 100px 25px 10px 5px 2px 1px 1px;
  }
````

### Пример 1.3

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/html-css/1/1.3-rows.html" height="150" width="100%"></iframe>

[Открыть пример 1.3 в новой вкладке](/assets/demo/qs/html-css/1/1.3-rows.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

Но счастье было бы не полным, если бы мы перечисляли все вручную.

Для этого воспользуемся функцией `repeat()`, где укажем кол-во колонок их размер `grid-template-columns: repeat(4,25%);`

### Пример 1.4

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/html-css/1/1.4-repeat.html" height="150" width="100%"></iframe>

[Открыть пример 1.4 в новой вкладке](/assets/demo/qs/html-css/1/1.4-repeat.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}










