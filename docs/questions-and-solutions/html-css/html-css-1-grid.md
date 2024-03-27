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
last_modified_date: 2024-03-27 14:00:00 +3
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

## Контейнер

Это элемент с `display:grid`

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

## grid-template-columns

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
        /**/
        grid-template-columns: 0.5fr 0.2fr 3fr;
    }
````

<figure>
<figcaption>Рисунок 1.2 Дробные фракции</figcaption>
  <img src="/assets/images/questions/html-css/1/1.2.png" alt="reset"  data-action="zoom" width="400" height="400">
</figure>


### fraction






