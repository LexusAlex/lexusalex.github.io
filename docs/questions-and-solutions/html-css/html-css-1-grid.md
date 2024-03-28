---
layout: default
nav_order: 1
permalink: html-css-1-grid
title: Что такое grid
parent: html / css
grand_parent: Вопросы и решения
has_children: true
description: Изучаем grid
date: 2024-03-26 14:00:00 +3
last_modified_date: 2024-03-28 14:00:00 +3
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

## Что это такое

Grid - это способ создания двумерной раскладки.

Grid даёт возможность контролировать одновременно и строки, и столбцы. 
Элементы внутри сетки можно двигать как нам вздумается.

Grid представляет собой набор горизонтальных и вертикальных линий образующий колонки и строки

Что это нам дает. 

- Можно создать макет с фиксированными или гибкими размерами полос.
- Можно располагать элементы как это требует макет.
- Можно управлять выравниванием элементов

## Контейнер

````html
<style>
    .container {
        display: grid;
    }
    .element {
        padding: 5px;
        font-size: 21px;
        background: #d6eebe;
    }
</style>
<div class="container">
    <div class="element one">1</div>
    <div class="element two">2</div>
    <div class="element three">3</div>
    <div class="element four">4</div>
    <div class="element five">5</div>
    <div class="element six">6</div>
</div>
````

<figure>
<figcaption>Рисунок 1.1 Контейнер </figcaption>
  <img src="/assets/images/questions/html-css/1/1.1.png" alt="reset"  data-action="zoom" width="400" height="400">
</figure>

## Колонки grid-template-columns

`grid-template-columns` определяет количество колонок сетки и может задавать ширину каждой из них.

````css
   .container {
        display: grid;
        /* Жесткое задание размеров 6 колонок */
        grid-template-columns: 150px 150px 150px 150px 150px 150px;
        /* Все элементы в одну колонку 150px*/
        grid-template-columns: 150px;
        /*Первоначальное состояние как на рисунке 1*/
        grid-template-columns: auto;
        /*20% от высоты вьюпорта*/ 
        grid-template-columns: 20vh;
        /* 2 колонки 20% от ширины вьюпорта */
        grid-template-columns: 20vw 20vw;
        /*Автоматический размер колонок под контент*/
        grid-template-columns: auto auto auto auto auto auto auto auto;
        /* 2 равные колонки сколько частей свободного пространства делят колонки*/
        grid-template-columns: 1fr 1fr;
        /*по краям равные колонки, потом 1 часть и auto сжатие под контент*/
        grid-template-columns: 2fr 1fr auto 2fr;
        /*Фракции можно дробить*/
        grid-template-columns: 0.5fr 0.2fr 3fr;
        /*Первая колонка фиксированного размера остальные в равной степени*/
        grid-template-columns: 200px 1fr 1fr;
        /*Если колонки одинаковой ширины удобно их задавать через repeat()*/
        grid-template-columns: repeat(3,1fr);
        /*Каждая колонка в отдельный столбец*/
        grid-template-columns: repeat(6,1fr);
        /*Можно как часть структуры - по краям 1fr по середине 4 колонки 2fr*/
        grid-template-columns: 1fr repeat(4,2fr) 1fr;
        /*Либо задать систему из 3 фракций продублировано дважды*/
        grid-template-columns: repeat(2, 1fr 2fr 3fr);
        /*Можно каждой колонке задать имя*/
        grid-template-columns: [first] 1fr [second] 2fr;
        /*Либо несколько имен*/
        grid-template-columns: [first second] 1fr;
    }
````

<figure>
<figcaption>Рисунок 1.2 Дробные фракции</figcaption>
  <img src="/assets/images/questions/html-css/1/1.2.png" alt="reset"  data-action="zoom" width="400" height="400">
</figure>

## Ряды grid-template-rows

Количество и ширина строк настраивается аналогично `grid-template-columns`

````css
.container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 100vh);
    grid-gap: 5px;
}
.e-6 {
    grid-column: 2 / 5;
}
````

<figure>
<figcaption>Рисунок 1.7 </figcaption>
  <img src="/assets/images/questions/html-css/1/1.7.png" alt="reset"  data-action="zoom" width="" height="400">
</figure>

### grid-auto-rows и grid-auto-columns

По умолчанию ширина и высота неявных гридов = высоте контента (текст + отступы).

Чтоб контролировать размеры строк и столбцов, в неявном гриде есть свойства `grid-auto-rows / grid-auto-columns`

````css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /*В данном случае все строки будут 100px*/
    grid-auto-rows: 100px;
    /*Размер на всю страницу по размеру вьюпорта*/
    grid-auto-rows: 100vh;
    /*Строки минимум 50px в высоту максимум auto*/
    grid-auto-rows: minmax(50px,auto);
}
````

Еще пример:

````html
<div class="container">
    <div class="element e-1">1</div>
    <div class="element e-2">2</div>
    <div class="element e-3">3</div>
    <div class="element e-4">4</div>
    <div class="element e-5">5</div>
    <div class="element e-6">6</div>
</div>
````

````css
.container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 100px);
    /*Осталось 2 необработанные староки, чтобы не полагатся на контент, поставим размер ряда на всю ширину контента*/
    grid-auto-rows: 100vh;
}
````

<figure>
<figcaption>Рисунок 1.6 неявные гриды</figcaption>
  <img src="/assets/images/questions/html-css/1/1.6.png" alt="reset"  data-action="zoom" width="" height="400">
</figure>

## Линии (grid-column-start и grid-column-end) и (grid-row-start и grid-row-end)

Элементы можно размещать по линиям и гибко это настраивать. 
Здесь мы уже описываем свойства каждому элементу отдельно

````css
.container {
    display: grid;
    grid-template-columns: repeat(5,1fr);
    grid-auto-rows: minmax(100px,auto);
}
.one {
    /*Элемент начнется с 1 линии закончится в 6*/
    grid-column-start: 1;
    grid-column-end: 6;
}
.two {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
}
.three {
    grid-column-start: 3;
    grid-column-end: 6;
}
.four {
    grid-column-start: 1;
    grid-column-end: 3;
}
.five {
    grid-row-start: 3;
    grid-row-end: 5;
}
.six {
    grid-row-start: 3;
    grid-row-end: 5;
    grid-column-start: 4;
    grid-column-end: 6;
}
````

Можно сократить значения следующим образом
Тогда код выше сократится.
```css
.one {
    grid-column: 1 / 4;
    grid-row: 1 / 3;
}
```

В итоге получается такая красота:

<figure>
<figcaption>Рисунок 1.3 Расположение элементов по линиям</figcaption>
  <img src="/assets/images/questions/html-css/1/1.3.png" alt="reset"  data-action="zoom" width="" height="400">
</figure>

## Ячейка

Наименьшая часть грида

## Область

Грид область объединяет несколько ячеек внутри строки или колонки

## Отступы grid-column-gap и grid-row-gap

Расстояние между ячейками

````css
.container {
    /* Растояние между колонками*/
    grid-column-gap: 10px;
    /* Растояние между строками*/
    grid-row-gap: 10px;
    /* сокращенное для свойств выше*/
    grid-gap: 10px 10px;
}
````

<figure>
<figcaption>Рисунок 1.4 отступы между ячейками</figcaption>
  <img src="/assets/images/questions/html-css/1/1.4.png" alt="reset"  data-action="zoom" width="" height="400">
</figure>

<figure>
<figcaption>Рисунок 1.5 отступы между ячейками</figcaption>
  <img src="/assets/images/questions/html-css/1/1.5.png" alt="reset"  data-action="zoom" width="" height="400">
</figure>

### Пример 1.1 Раскладка элементов по линиям

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/html-css/1/1.1-grid.html" height="100" width="100%"></iframe>

[Открыть пример 1.1 в новой вкладке](/assets/demo/qs/html-css/1/1.1-grid.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}












