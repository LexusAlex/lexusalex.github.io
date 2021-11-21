---
layout: default
nav_order: 25
permalink: 25-ui-buttons
title: Элементы интерфейса. Кнопки
parent: Заметки
description: Кнопки в html. Как элемент интерфейса
date: 2021-11-21 11:00:00 +3
tags:
- html
- css
- ui
---

# Элементы интерфейса. Кнопки.
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

Заметка для себя, чтобы было куда посмотреть.

## button

Кнопка представляет собой тег `button`.
Он создает кнопку по которой можно кликнуть.

Стандартная кнопка выглядит следующим образом:

<style>
.default {
   font-size: 13px;
   line-height: 1.5;
   margin: 0; 
}
</style>

<button class="default" id="button">Стандартная кнопка</button>

## Отображение кнопки в google chrome

<figure>
  <img src="/assets/images/notes/25/button-default-chrome.png" alt="button-default-chrome"  data-action="zoom">
</figure>

## Отображение кнопки в mozilla firefox

<figure>
  <img src="/assets/images/notes/25/button-default-firefox.png" alt="button-default-firefox"  data-action="zoom">
</figure>

## Технические детали

1. Кнопки используются в формах для отправки данных и сброса заполненных данных.
2. Кнопки используются за пределами формы как самостоятельный элемент, который с помощью `js` может выполнять необходимые действия.
3. Внутри кнопки можно разместить любой html.

## Специфические атрибуты кнопки

- `autofocus` - кнопка получает фокус <button class="default" id="button" autofocus>Кнопка в фокусе</button>
- `disabled` - неактивная кнопка <button class="default" id="button" disabled>Кнопка не активна</button>
- `name` - уникальное имя кнопки, название параметра которое будет отправлено на сервер
- `value` - значение которое будет отправлено на сервер

## Состояния кнопки

1. focus - кнопка в фокусе
2. hover - реакция кнопки на наведение
3. active - кнопка нажата
4. disabled - кнопка заблокирована

Для иллюстрации всех состояний рассмотрим примеры:

<button class="btn btn-green mr-2" style="">default</button>
<button autofocus class="btn btn-green mr-2" style="text-decoration: none; outline: none; box-shadow: 0 0 0 3px rgba(0, 0, 255, 0.25);">focus</button>
<button class="btn btn-green mr-2" style="color: #fff; background-color: #0fa276; background-image: linear-gradient(#12be8b, #0fa276);">hover</button>
<button class="btn btn-green mr-2" style="box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);">active</button>
<button class="btn btn-green mr-2" disabled style="">disabled</button>

<button class="btn btn-purple mr-2" style="">default</button>
<button autofocus class="btn btn-purple mr-2" style="text-decoration: none; outline: none; box-shadow: 0 0 0 3px rgba(0, 0, 255, 0.25);">focus</button>
<button class="btn btn-purple mr-2" style="color: #fff; background-color: #5132cb; background-image: linear-gradient(#6549d2, #5132cb);">hover</button>
<button class="btn btn-purple mr-2" style="background-color: #4f31c6; background-image: none;">active</button>
<button class="btn btn-purple mr-2" disabled style="">disabled</button>

Дизайн и поведение кнопок зависит полностью от макета.

Задавать состояния кнопок является хорошим тоном при верстке, и это нужно делать.

## На что обратить внимание

1. Свойство `appearance` позволяет задавать внешний вид одних элементов другим элементам. 
При этом браузер будет обрисовывать их с учётом текущей операционной системы пользователя и темы оформления. Лучше его всегда сбрасывать `appearance: none;`
2. Нужно обязательно задавать `min-width`, чтобы контент кнопки не зависел от ее размера.
3. Так же необходимо задавать `padding`. Это даёт больше уверенности в том, что кнопка будет хорошо выглядеть в ситуации, когда заранее неизвестна длина выводимой на ней надписи.
4. Сбросить или задать семейство шрифта `font-family: inherit;`
5. Установить вид курсора при наведении на кнопку `cursor: pointer`. Например, если кнопка заблокирована, то тип курсора можно задать как `cursor: not-allowed;`

## Дополнительные материалы

- [https://doka.guide/html/button/](https://doka.guide/html/button/)
- [https://nicothin.pro/page/ui-kit-forms](https://nicothin.pro/page/ui-kit-forms)
- [https://browserdefaultstyles.com/#button](https://browserdefaultstyles.com/#button)