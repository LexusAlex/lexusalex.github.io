---
layout: default
nav_order: 10
permalink: js-dom-sizes
title: Размеры элементов и окна
parent: js
description: Работа с размерами элементов
date: 2022-10-28 23:30:00 +3
last_modified_date: 2022-10-28 23:30:00 +3
tags:
- js

---

# Размеры элементов и окна
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

## Размер элементов

Имеем разметку с элементом с прокруткой, и всеми полями

```html
<style>
    html {
        box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }
    .item {
        background-color: lemonchiffon;
        border: 10px solid black;
        height: 300px;
        width: 300px;
        padding: 10px 20px;
        margin-left: 10px;
        overflow: auto;
    }
</style>
<div class="block">
  <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci aliquid aperiam aut, deserunt dicta doloribus ducimus, eveniet ex iste itaque modi molestiae, nam omnis provident repellat totam unde vero? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci aliquid aperiam aut, deserunt dicta doloribus ducimus, eveniet ex iste itaque modi molestiae, nam omnis provident repellat totam unde vero? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci aliquid aperiam aut, deserunt dicta doloribus ducimus, eveniet ex iste itaque modi molestiae, nam omnis provident repellat totam unde vero? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci aliquid aperiam aut, deserunt dicta doloribus ducimus, eveniet ex iste itaque modi molestiae, nam omnis provident repellat totam unde vero?
  </div>
</div>
```

```javascript
// расчет идет исходя из box-sizing:border-box
document.querySelector('.item').offsetParent; // body Элемент который используется для вычисления координат текущего элемента, но это может быть и спохзиционированнй элемент
document.querySelector('.item').offsetTop; // 8 отступ сверху от body
document.querySelector('.item').offsetLeft // 18 отступ слева сверху от body
// Важно обратить внимание, что значение это число, а не строка

// offsetParent = null если
// У элемента display:none, body, html, position:fixed
    
// Размеры элемента
document.querySelector('.item').offsetWidth // 300 где ширина элемента 10 + 20 + 240 + 20 + 10
document.querySelector('.item').offsetHeight // 300 где высота  10 + 10 + 260 + 10 + 10
document.querySelector('.item').clientTop // 10 отступ внутренней части элемента от внешней сверху
document.querySelector('.item').clientLeft // 10 отступ внутренней части элемента от внешней слева
document.querySelector('.item').clientWidth // 280 размер внутренеей области элемента от рамки без прокрутки - ширина
document.querySelector('.item').clientHeight // 280 размер внутренеей области элемента от рамки без прокрутки - высота
document.querySelector('.item').scrollHeight // 680 размер внутренеей области элемента от рамки включая прокрученную область - высота
document.querySelector('.item').scrollWidth // 280 размер внутренеей области элемента от рамки включая прокрученную область - ширина

// Например можно развернуть весь контент элемента
document.querySelector('.item').style.height = document.querySelector('.item').scrollHeight + "px" //

document.querySelector('.item').scrollTop // 114 величина прокрученной части элемента сверху, то есть сколько уже прокрученно вверх
document.querySelector('.item').scrollLeft // 0 величина прокрученной части элемента слева
document.querySelector('.item').scrollTop = 0 // Прокрутить вверх
```

- Размеры устанавливаются только для видимых элементов
- `scrollTop` и `scrollLeft` можно менять


# Размеры и прокрутка окна
