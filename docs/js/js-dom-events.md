---
layout: default
nav_order: 11
permalink: js-dom-events
title: DOM события
parent: js
description: Разберем работу событий в js
date: 2022-10-29 15:00:00 +3
last_modified_date: 2022-10-29 15:00:00 +3
tags:
- js

---

# DOM события
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

Событие - это сигнал от браузера, о том что "произошло событие"

Событию можно назначить обработчик, это код который должен выполнятся когда событие произошло.

## Задание обработчика

Самое простое, но не очень удобное это задание обработчика прямо в разметке.
```html
<button id="button" onclick="addList()">Кнопка</button>
```
После такого задания, при клике на кнопку начнет выполниться js код, но так писать неудобно, определим обработчик в функцию.
И создадим по клику, к примеру список

```html
<button id="button" onclick="addList()">Кнопка</button>
<script>
  function addList() {
    document.querySelector('#button').insertAdjacentHTML('afterend','<ul><li>0</li></ul>')
  }
  // Или назначить обработчик таким образом
  document.querySelector('#button').onclick = function (e) {
      document.querySelector('#button').insertAdjacentHTML('afterend','<ul><li>0</li></ul>')
  }
  
  // Так же можно например еще и так
  document.querySelector('#button').onclick = addList;
  document.querySelector('#button').onclick = null; // убрать обработчик
</script>
```

- Обработчик внутри ссылается на элемент на котором, он был вызван
- Не используйте setAttribute для обработчиков
- Все способы рассмотренные выше не дают задать несколько обработчиков

Правильный способ задания обработчика использовать метод `element.addEventListener(event, handler, [options]);`

```html
<button id="button2" >Кнопка 2</button>
<script>
  document.getElementById('button2').addEventListener('click', function (e) {
    console.log('Кликнули')
  })
</script>
```

Преимущество в том, что можно назначать сколько угодно обработчиков на один и тот же элемент и они все будут выполнены.
Например

```javascript
document.getElementById('button2').addEventListener('click', function (e) {
console.log('Событие 1')
})
document.getElementById('button2').addEventListener('click', function (e) {
console.log('Событие 2')
})
document.getElementById('button2').addEventListener('click', function (e) {
console.log('Событие 3')
})

// или добавим обработчик как функцию

function clickButton() {
    console.log('Событие 4');
}

document.getElementById('button2').addEventListener('click', clickButton);
```

И это все мы навесили на один элемент.
Напрашивается как удалить обработчик, а это можно сделать, только навесив обработчик как функцию, как в последнем варианте выше

```javascript
document.getElementById('button2').removeEventListener('click',  clickButton)
```

Тогда обработчик будет удален, то есть выносите обработчики в функции.

Например, в браузере firefox, обработчики на элементе в инспекторе кода, можно видеть так

<figure>
  <img src="assets/images/js/firefox_event.png" alt="События в firefox"  data-action="zoom">
</figure>

- В функцию обработчик так же передается объект события `event` с дополнительной информации ей о событии
- В качестве обработчика можно назначить и объект `{handleEvent(event)}`
- Разделяйте обработку разных событий на разные методы
- По ключевому слову `this` можно получить dom элемент на котором сработало событие

## Всплытие событий
