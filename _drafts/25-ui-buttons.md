---
layout: default
nav_order: 25
permalink: 25-ui-buttons
title: Элементы интерфейса. Кнопки.
parent: Заметки
description: Кнопки в html. Как элемент интерфейса
date: 2021-11-16 18:00:00 +3
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

<style>
.default {
   font-size: 13px;
   line-height: 1.5;
   margin: 0; 
}

.default-reset {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  border: 0;
  border-radius: 0;
  font-family:inherit;
  padding: 0;
  margin: 0;
  }

.button-background1 {
    background: #2c84fa;
}

.button-background2 {
    background: #e94c4c;
}

.button-width1 {
background: #1d49aa;
}

.button-width2 {
background: #1d49aa;
min-width: 200px
}

.button-padding {
    background: #1d49aa;
    padding: 18px;
}

.button-hover:hover {
    background: #1d49aa;
}

.button-focus:focus {
outline: none;
box-shadow: 0 0 0 4px #2ea44f;

}

.button-disabled:disabled {
opacity: 0.5;
}

.button-style1 {
	appearance: none;
	border: 0;
	border-radius: 0.375rem;
	padding: .9rem 1.5rem;
	font-size: 1rem;
	cursor: pointer;
        color: #fff;
	background: #2ea44f;
  }


.button-style1:hover {
  background: #1d49aa;
}

.button-style1:focus {
  outline: none;
  box-shadow: 0 0 0 4px linear-gradient(180deg, rgba(52, 183, 89, 0.15) 0%, rgba(46, 164, 79, 0) 100%),#2ea44f !important;
}

.button-style2{
	font-size: 15px;
	line-height: 18px;
	padding: 11px 18px;
	border: 1px solid #802A72;
	background: -webkit-gradient(linear, left top, right top, from(#802A72), color-stop(50%, #A64179), color-stop(50%, #fff), to(#fff) );
	background: -o-linear-gradient(left, #802A72 0%, #A64179 50%, #fff 50%, #fff 100% );
	background: linear-gradient(90deg, #802A72 0%, #A64179 50%, #fff 50%, #fff 100% );
	-webkit-transition: .10s;
	-o-transition: .10s;
	transition: .10s;
	margin-right: 15px;
	background-position: 0%;
	background-size: 201%;
	color: #fff;
	display: inline-block;
}
.button-style2:hover{
	color: #802A72;
	background-position: 99%;
	background-size: 202%;
}

.button-style3 {
background-color: #ea0909;
border: none;
color: #FFFFFF;
padding: 15px 32px;
text-align: center;
-webkit-transition-duration: 0.4s; /* Safari */
transition-duration: 0.4s;
margin: 16px 0 !important;
text-decoration: none;
font-size:16px;
cursor:pointer;
}

.button-style3:hover {background-color: #4CAF50;}

/* CSS */
.button-style4 {
  appearance: none;
  background-color: #000000;
  border: 2px solid #1A1A1A;
  border-radius: 15px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 60px;
  min-width: 0;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
  will-change: transform;
}

.button-style4:disabled {
  pointer-events: none;
}

.button-style4:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.button-style4:active {
  box-shadow: none;
  transform: translateY(0);
}


/* CSS */
.button-style5 {
  backface-visibility: hidden;
  background: #332cf2;
  border: 0;
  border-radius: .375rem;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: Circular,Helvetica,sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -.01em;
  line-height: 1.3;
  padding: 1rem 1.25rem;
  position: relative;
  text-align: left;
  text-decoration: none;
  transform: translateZ(0) scale(1);
  transition: transform .2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-style5:disabled {
  color: #787878;
  cursor: auto;
}

.button-style5:not(:disabled):hover {
  transform: scale(1.05);
}

.button-style5:not(:disabled):hover:active {
  transform: scale(1.05) translateY(.125rem);
}

.button-style5:focus {
  outline: 0 solid transparent;
}

.button-style5:focus:before {
  border-width: .125rem;
  content: "";
  left: calc(-1*.375rem);
  pointer-events: none;
  position: absolute;
  top: calc(-1*.375rem);
  transition: border-radius;
  user-select: none;
}

.button-style5:focus:not(:focus-visible) {
  outline: 0 solid transparent;
}

.button-style5:not(:disabled):active {
  transform: translateY(.125rem);
}
</style>

Взгляд бэкендера на фронтенд.

## Что можно делать с кнопкой

Кнопка представляет собой тег `button`.

Он создает кнопку по которой можно кликнуть.

<button class="default" id="button">Стандартная кнопка</button>

Теперь зададим поведение для простой кнопки через скрипты. Например при клике покрасим страницу в другой цвет:

<button class="default" id="button" onclick="document.body.style.backgroundColor='#6ffb8f'">Покрасить страницу</button>

Кнопки используются повсеместно для отправки данных на сервер из формы. Например поведение по умолчанию при отправке данных.

<form>
    <button class="default" id="button" value="test-button" name="test">Отправить данные</button>
</form>

Вне формы - это просто кнопка, функционал которой задают через скрипты. 

## Специфические атрибуты кнопки

- `autofocus` - кнопка получает фокус <button class="default" id="button" autofocus>Кнопка в фокусе</button>
- `disabled` - неактивная кнопка <button class="default" id="button" disabled>Кнопка не активна</button>
- `name` - уникальное имя кнопки, название параметра которое будет отправлено на сервер
- `value` - значение которое будет отправлено на сервер

## Стандартная кнопка

Разные браузеры отображают кнопку по-своему.

Стандартная кнопка, в google chrome кнопка по умолчанию в различных состояниях выглядит таким образом:

<figure>
  <img src="/assets/images/notes/25/button-default-chrome.png" alt="button-default-chrome"  data-action="zoom">
</figure>

В браузере firefox немного по другому, но смысл тот же.

<figure>
  <img src="/assets/images/notes/25/button-default-firefox.png" alt="button-default-firefox"  data-action="zoom">
</figure>

На стандартные стили лучше не полагатся, поэтому сбросим дефолтные стили накладыеваемые браузером и операционной системой.

```css
button {
-webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  border: 0;
  border-radius: 0;
  font-family:inherit;
  padding: 0;
  margin: 0;
}
```

Теперь кнопка во всех браузерах выглядит одинаково как строка с фоном.

<button class="default-reset">Сброшенная кнопка</button>

## Стилизация кнопки

У кнопки как и у другого html элемента можно стилизовать разные параметры например: 

- Цвет текста
- Тип шрифта
- Фон
- Скругления углов
- Внутренний отступ

и другие свойства.

### Цвет фона кнопки

По умолчанию у кнопки как мы видели ранее серый цвет. Лучше сбросить его `background-color: transparent` 
или установить какой у вас в макете.

<button class="button-background1">Покрашенная кнопка 1</button>

<button class="button-background2">Покрашенная кнопка 2</button>

### Ширина кнопки

Важно указывать минимальную ширину кнопки - это свойство `min-width`.

Обратите внимание на эти две кнопки. У кнопки внизу задана минимальная ширина.

<button class="button-width1">Текст</button>

<button class="button-width2">Текст</button>

### Внутренний отступ

Если заранее не известна надпись на кнопке, так же важно задать внутрение отступы внутри кнопки.

<button class="button-padding">Кнопка с отступом</button>

### Псевдоклассы кнопок

Кнопка может быть в следующих состояниях:

- hover - навели мышь на кнопку <button class="button-hover">Кнопка с hover</button>
- focus - кнопка в фокусе <button autofocus class="button-focus">Кнопка в фокусе</button>
- disabled - кнопка неактивна <button class="button-disabled">Кнопка disabled</button>




Например зададим какие-то стили для кнопок и представим их в разных видах:

<button class="button-style1">Стилизованная кнопка 1</button>

<button class="button-style2">Стилизованная кнопка 2</button>

<button class="button-style3">Стилизованная кнопка 3</button>

<button class="button-style4">Стилизованная кнопка 4</button>

<button class="button-style5">Стилизованная кнопка 5</button>


Стилизовать можно как угодно

Важно отличать кнопку от ссылки

https://doka.guide/html/button/
https://nicothin.pro/page/ui-kit-forms
http://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css
https://browserdefaultstyles.com/#button
https://habr.com/ru/company/ruvds/blog/489820/
