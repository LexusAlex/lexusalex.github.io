---
layout: default
nav_order: 38
permalink: 38-working-on-the-layout
title: Работа над версткой
parent: Заметки
description: С чего начать работу над версткой сайта
date: 2022-10-24 12:50:00 +3
last_modified_date: 2022-10-24 12:50:00 +3
tags:
- html
- css
---

# Работа над версткой
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

Когда мы получаем готовый макет в figma, photoshop, illustrator, sketch все элементы в нем в px, которые нужно привести в
пропорциональные величины.

Нужно распределить составные части, там где они помещаются.

## Макет

Рассмотрим ситуацию, что у нас есть макет с шириной 960 px. 
Итак, как такое сверстать.
Набросаем первоначальную структуру.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Layout example</title>
    <meta name="viewport" content="width=device-width" />
  </head>
  <body>
    <div class="wrapper">
      <header class="header"></header>
      <div class="wrapperMiddle">
        <aside class="left"></aside>
        <main class="middle"></main>
        <aside class="right"></aside>
      </div>
      <footer class="footer"></footer>
    </div>
  </body>
</html>
```

Так именовать классы не нужно, это для понимания.

Изучив макет приходим к выводу, что макет имеет следующие размеры: 

- Ширина всего макета - 960px
- Шапка - 960px
- Левая коленка - 200 px
- Правая колонка - 100px
- Средняя часть - 660 px
- Подвал - 960 px
- Высоту макета будем пока определять в px

Приводим размер к процентному соотношению:

-  200 / 960 = 0,2083 = 20,83 %
-  100 / 960 = 0,1041 = 10,41 %
-  660 / 960 = 0,6875 = 68,75 %

В итоге получаем размеры этих колонок в процентах.

Напишем css для них

```css
html,
body {
    margin: 0;
    padding: 0;
}
.wrapper {
    max-width: 1700px;
    margin: 0 auto;
    background-color: aliceblue;
}
.header {
    width: 100%;
    height: 130px;
    background-color: firebrick;
}
.wrapperMiddle {
    width: 100%;
    font-size: 0;
}
.left {
    height: 625px;
    width: 20.83%;
    background-color: #03a66a;
    display: inline-block;
}
.middle {
    height: 625px;
    width: 68.75%;
    background-color: #bbbf90;
    display: inline-block;
}
.right {
    height: 625px;
    width: 10.41%;
    background-color: lemonchiffon;
    display: inline-block;
}
.footer {
    height: 200px;
    width: 100%;
    background-color: #025059;
}
```

И теперь как бы мы не меняли ширину нашей обертки, колонки всегда будут подстраиваться под другие колонки.
Этим самым мы показали как должен вести себя макет, но это еще не адаптив.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Layout example</title>
  <meta name="viewport" content="width=device-width" />
  <style>
    html,
    body {
      margin: 0;
      padding: 0;
    }

    body {
      overflow-x: hidden;
      overflow-y: scroll;
    }

    .wrapper {
      max-width: 1700px;
      margin: 0 auto;
      background-color: aliceblue;
    }

    .header {
      width: 100%;
      height: 130px;
      background-color: firebrick;
    }

    .wrapperMiddle {
      width: 100%;
      font-size: 0;
      position: relative;
    }
    .OffCanvas-Active .left,
    .OffCanvas-Active .middle {
      transform: translate3d(200px, 0, 0);
      transition: transform .3s;
    }
    .left {
      height: 625px;
      background-color: #03a66a;
      display: inline-block;
      position: absolute;
      left: -200px;
      width: 200px;
      font-size: .9rem;
      transition: transform .3s;
    }
    @media (min-width: 40rem) {
      .left {
        width: 20.8333333%;
        left: 0;
        position: relative;
      }
    }
    .middle {
      height: 625px;
      background-color: #bbbf90;
      transition: transform .3s;
      font-size: .9rem;
    }

    @media (min-width: 40rem) {
      .middle {
        display: inline-block;
        width: 68.75%;
      }
    }
    .right {
      height: 625px;
      width: 100%;
      background-color: lemonchiffon;
      font-size: .9rem;
    }

    @media (min-width: 40rem) {
      .right {
        width: 10.4166667%;
        display: inline-block;
      }
    }

    .footer {
      height: 200px;
      width: 100%;
      background-color: #025059;
    }
  </style>
</head>
<body>
<div class="wrapper">
  <header class="header">header</header>
  <div class="wrapperMiddle">
    <aside class="left">left</aside>
    <main class="middle">middle</main>
    <aside class="right">right</aside>
  </div>
  <footer class="footer">footer</footer>
</div>
  <script>
    // First wait for the DOM to be ready
    document.addEventListener("DOMContentLoaded", function(){
      "use strict";
      const theBody = document.querySelector("body");

      // This function merely toggles the class
      function toggleClass() {
        theBody.classList.toggle("OffCanvas-Active");
      }
      // When the header is clicked we fire the function to toggle the class
      document.querySelector(".header").addEventListener("click", toggleClass );

      // The section below merely deals with resize events

      // This debounce function (via: https://remysharp.com/2010/07/21/throttling-function-calls) merely stops functioned firing too often on repetitive events (such as resize/scroll)
      function debounce(fn, delay) {
        let timer = null;
        return function () {
          const context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function () {
            fn.apply(context, args);
          }, delay);
        };
      }

      // removing the class from the body inside a debounce
      // When the window is resized, we want to fire the debouncedA function
      window.onresize = debounce(function () {
        theBody.classList.remove("OffCanvas-Active");
      }, 250);
    });
  </script>
</body>
</html>
```

Теперь это более менее адаптивный дизайн, где левая скрывается на маленьких экранах.

Главное, что нужно понять здесь. Необходимо размеры указывать в пропорциональном соотношении, а не в фиксированных величинах.

Этот код чисто для понимания происходящего, в реальных проектах его использовать не стоит.
