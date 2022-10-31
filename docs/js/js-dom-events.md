---
layout: default
nav_order: 11
permalink: js-dom-events
title: DOM события
parent: js
description: Разберем работу событий в js
date: 2022-10-29 15:00:00 +3
last_modified_date: 2022-10-31 22:00:00 +3
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

## Вложенные события

Рассмотрим пример

```html
<div id="bubble">
    div 1 уровень
    <div id="two">
        div 2 уровень
        <div id="three">
            div 3 уровень
            <div id="four">
                div 4 уровень
                <div id="five">
                    div 5 уровень
                </div>
            </div>
        </div>
    </div>
</div>
```

```javascript
document.getElementById('bubble').addEventListener('click', function (e) {
    console.log('Сработало событие на элементе' + e.target.id);
})
```

Событие `onclick` установлено для первого элемента `div`, но если кликнуть во вложенные элементы оно тоже сработает.
И оно будет срабатывать на кликнутом элементе.

Если установить обработчики на все 5 элементов, и кликнуть на какой-нибудь один, все сработают по всплытию вверх по цепочке предков

Этот процесс называется «всплытием»

- Большинство событий всплывают
- По умолчанию событие идет вверх вызывая все обработчики на своем пути

Прекратить всплытие события поможет свойство `event.stopPropagation()` и `stopImmediatePropagation()`

Например, если кликнем на 5 div, сработают только 2

```html
<div id="bubble" onclick="console.log('Сработало событие на элементе' + event.target.id)">
  div 1 уровень
  <div id="two" onclick="console.log('Сработало событие на элементе' + event.target.id)">
    div 2 уровень
    <div id="three" onclick="event.stopPropagation(); console.log('Сработало событие на элементе' + event.target.id)">
      div 3 уровень
      <div id="four" onclick="console.log('Сработало событие на элементе' + event.target.id)">
        div 4 уровень
        <div id="five" onclick="console.log('Сработало событие на элементе' + event.target.id)">
          div 5 уровень
        </div>
      </div>
    </div>
  </div>
</div>
```

- Но прекращать всплытие требуется довольно редко.

События можно делегировать, например в дата атрибуты сохранять действие `data-action="save"`, а потом обрабатывать

С помощью делегирования можно реализовать

- Счетчики
- Переключения

Пример вложенного списка [https://plnkr.co/edit/3ESpATnBgiw8yWtT?p=preview&preview](https://plnkr.co/edit/3ESpATnBgiw8yWtT?p=preview&preview)

## Действия браузера по умолчанию 


Отменяем переход по ссылкам

```html
<a href="/" onclick="event.preventDefault()">Ссылка по которой нельзя перейти</a>
<a href="/" onclick="return false">Ссылка по которой нельзя перейти</a>
```

Или еще пример. Запретим переход по ссылкам списка

```html
<ul class="list2">
  <li><a href="/">1</a></li>
  <li><a href="/">2</a></li>
  <li><a href="/">3</a></li>
  <li><a href="/">4</a></li>
  <li><a href="/">5</a></li>
</ul>
```

```javascript
document.querySelector('.list2').addEventListener('click', function (e) {
e.preventDefault();
})
```

## Типы событий

### mousedown

Кнопка нажата над элементом

```html
<button onmousedown="console.log(event.type)">Кнопка</button>
```

### onmouseup

Кнопка отпущена над элементом

```html
<button onmouseup="console.log(event.type)">Кнопка</button>
```

### mouseover

Курсор мыши появляется над элементом

```html
<button onmouseover="console.log(event.type)" onmouseout="console.log(event.type)">Кнопка</button>
```

### mouseout

Курсор мыши уходит с элемента

```html
<button onmouseover="console.log(event.type)" onmouseout="console.log(event.type)">Кнопка</button>
```

### mousemove

Перемещение курсора в пределах элемента генерирует событие

```html
<button onmousemove="console.log(event.type)">Кнопка</button>
```

### click

Выполнение сначала `mousedown` затем `mouseup`, при нажатии левой кнопкой мыши

```html
<button onclick="console.log(event.type)">Кнопка</button>
```

### dbclick

Двойной клик на элементе

```html
<button ondblclick="console.log(event.type)">Кнопка</button>
```

### contextmenu

Нажатие правой кнопкой мыши на элементе

```html
<button oncontextmenu="console.log(event.type)">Кнопка</button>
```


- Если вызываются несколько событий на элементе, порядок их фиксирован
- в свойстве `event.button` - находится цифра какая кнопка была нажата
- `oncopy="alert('Копирование запрещено!');return false` - запретить копирование