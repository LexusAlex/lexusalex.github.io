---
layout: default
nav_order: 25
permalink: 25-ui-buttons
title: Элементы интерфейса. Кнопки.
parent: Заметки
description: Кнопки в html. Что это такое и как с этим работать.
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

Мое видение на кнопки в интерфейсе пользователя.

## Button

В html для вывода кнопки используется тег `button`. 

Он создает кнопку по которой можно кликнуть:

<style>
.default {
   font-size: 13px;
   line-height: 1.5;
   margin: 0; 
}
</style>
<script>

window.addEventListener("load", function () {
  let buttonElement = document.getElementById('button');
  buttonElement.addEventListener('click', function() {
    console.log('клик');
    });
})
</script>

<button class="default" id="button">Стандартная кнопка</button>


Кнопки используются повсеместно для отпрвки данных на сервер из формы.

Вне формы - это просто кнопка, функционал которой задают через скрипты. 


Например стандартная кнопка, в google chrome кнопка по умолчанию в различных состояниях выглядит таким образом:

<figure>
  <img src="/assets/images/notes/25/button-default-chrome.png" alt="button-default-chrome"  data-action="zoom">
</figure>

В браузере firefox по другому

<figure>
  <img src="/assets/images/notes/25/button-default-firefox.png" alt="button-default-firefox"  data-action="zoom">
</figure>

Но на это полагаться нельзя. Сбросим дефолтные стили накладыеваемые браузером.

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

Теперь кнопка во всех браузерах выглядит как строка с фоном.

<style>
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
</style>

<button class="default-reset">Стандартная кнопка</button>

У кнопки можно стилизовать:

- Цвет текста
- Тип шрифта
- Фон
- Скругления углов
- Внутренний отступ

и другие свойства.

Например зададим какие-то базовые стили для кнопки
ш
<style>
.button-style1 {
	appearance: none;
	border: 0;
	border-radius: 0.375rem;
	padding: .9rem 1.5rem;
	font-size: 1rem;
	cursor: pointer;
        color: #fff;
	background: linear-gradient(180deg, rgba(52, 183, 89, 0.15) 0%, rgba(46, 164, 79, 0) 100%),#2ea44f !important;
  }


.button-style1:hover {
  background: #1d49aa;
}

.button-style1:focus {
  outline: none;
  box-shadow: 0 0 0 4px linear-gradient(180deg, rgba(52, 183, 89, 0.15) 0%, rgba(46, 164, 79, 0) 100%),#2ea44f !important;
}

</style>

<button class="button-style1">Стилизованная кнопка</button>



https://doka.guide/html/button/
https://nicothin.pro/page/ui-kit-forms
http://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css
https://browserdefaultstyles.com/#button
https://habr.com/ru/company/ruvds/blog/489820/
