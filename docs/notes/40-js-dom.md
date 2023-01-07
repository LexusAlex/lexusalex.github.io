---
layout: default
nav_order: 40
permalink: 40-js-dom
title: JS DOM
parent: Заметки
description: JS DOM. Необходимый минимум
date: 2022-12-22 22:30:00 +3
last_modified_date: 2022-01-07 17:00:00 +3
tags:
- javascript
---

# JS DOM
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

Стараемся пользоваться только актуальными вещами.

## Создание

### Создание элементов

```javascript
let element = document.createElement('div'); // div
```

### Создание текстового узла

```javascript
let text = document.createTextNode('Контент'); // #text
```

## Вставка

### Вставка элементов в конец родителя

Чаще всего используется именно эта вставка элементов

```javascript
ul = document.createElement('ul');
li = document.createElement('li');
li.textContent = '1 элемент списка';
ul.append(li);

li2 = document.createElement('li');
li2.textContent = '2 элемент списка';
ul.append(li2);

ul.append(li,li2, 'Какой-то текст'); // Можно вставлять сразу несколько элементов и тектовых узлов
document.querySelector('.test').append(ul);
```

Или так, как альтернативный вариант

```javascript
li6 = document.createElement('li');
li6.textContent = '55 элемент списка';
ul.insertAdjacentElement('beforeend',li6)
```

### Вставка элементов в начало родителя

```javascript

li3 = document.createElement('li');
li3.textContent = '0 элемент списка';

li4 = document.createElement('li');
li4.textContent = '-1 элемент списка';

ul.prepend(li4, li3);

document.querySelector('.test').append(ul);
```

Или так

```javascript
li5 = document.createElement('li');
li5.textContent = '-2 элемент списка';
ul.insertAdjacentElement('afterbegin',li5)
```

### Вставка элемента до элемента

```javascript
document.querySelector('.test').before(document.createElement('div'));
document.querySelector('.test').insertAdjacentElement('beforebegin',document.createElement('div'))
```

### Вставка элемента после элемента

```javascript
document.querySelector('.test').after(document.createElement('div'));
document.querySelector('.test').insertAdjacentElement('afterbegin',document.createElement('div'))
```

### Вставка текста внутрь, до и после элемента

```javascript
element.textContent = 'Текст для вставки'; // Вставка теста
element.append(text); // Вставка тестового узла внутрь, что дает тот же самый результат

document.querySelector('.my-ul').insertAdjacentText('afterbegin','текст afterbegin') // В начало элемента
document.querySelector('.my-ul').insertAdjacentText('beforeend','текст beforeend') // В конец элемента
document.querySelector('.my-ul').insertAdjacentText('beforebegin','текст beforebegin') // До элемента
document.querySelector('.my-ul').insertAdjacentText('afterend','текст afterend')  // После элемента
```

### Вставка html внутрь, до и после элемента

Наверное самый простой способ вставки html внутрь элемента

! Важно понимать что строка - это не html элемент

```javascript
element.innerHTML = '<div class="div"><ul><li>Элемент 1</li><li>Элемент 2</li></ul></div>';
```

Или использовать метод `insertAdjacentHTML`

```javascript
element.insertAdjacentHTML('afterbegin','<div class="afterbegin"><ul><li>Элемент 1</li><li>Элемент 2</li></ul></div>'); // В начало выбранного элемента
element.insertAdjacentHTML('beforeend','<div class="beforeend"><ul><li>Элемент 1</li><li>Элемент 2</li></ul></div>'); // В конец выбранного элемента
document.querySelector('.test').insertAdjacentHTML('beforebegin','<div class="beforebegin"><ul><li>Элемент 1</li><li>Элемент 2</li></ul></div>'); // Вставка выше указанного элемента
document.querySelector('.test').insertAdjacentHTML('afterend','<div class="afterend"><ul class="my-ul"><li>Элемент 1</li><li>Элемент 2</li></ul></div>'); // Вставка после указанного элемента
```

## Замена

### Замена одного узла на другой

```javascript
let element = document.createElement('div');
element.textContent = 'элемент 1';

let element2 = document.createElement('div');
element2.textContent = 'элемент 2';

document.querySelector('.test').append(element);
document.querySelector('.test').children[0].replaceWith(element2);
```

## Удалить

### Удаление узла

```javascript
document.querySelector('.test').remove();
```

### Удаление всех элементов в коллекции

```javascript
for (const el of [...document.querySelectorAll('li')]) {
  el.remove();
}
```

## Клонирование

```javascript
let list = document.getElementById('list');
let cloneNode = list.cloneNode(true); // Склонировать полностью все вложенные элементы
document.body.append(cloneNode);
```

## Получение элементов

```javascript
document.getElementById('list'); // По идентификатору
document.querySelector('#list'); // Тоже самое по идентификатору
document.querySelector('[user-id="4"]'); // Найдем элмент по атрибуту
document.querySelectorAll('.element')[1].innerText // Получить контент из коллекции элементов

```

## Навигация по DOM дереву

```javascript
document.body.childNodes // Коллекция NodeList всех дочерних элементов включая текстовые
document.body.children // Получить коллекцию HTML Collection только html элементы
document.body.firstChild // Получение первого элемента коллекции
document.body.lastChild // Получение последнего элемента коллекции
document.body.parentNode // Родительский узел
document.body.parentElement // Родительский html элемент
document.head.nextSibling // Следующий соседний узел
document.body.previousSibling // Предыдущий соседний узел
document.body.children[0].lastElementChild // Последний элемент коллекции
document.body.children[0].lastElementChild.previousElementSibling.parentElement.parentElement // Можно строить столь угодно длинные цепочки
```

## Поиск родителя

`closest` возвращает ближайший родительский элемент или сам элемент

```javascript
let li = event.target.closest('li'); // Найти ближайшего родителя включая текущий элемент, в данном случае нашили текущий - это li
```

## Перебор коллекции

Самый эффективный способ перебрать коллекцию - это цикл `for of`

```javascript
for (let node of lis) {
    console.log(node);
  }
```

Так же - это можно делать с помощью классических циклов `for` и `while`

```javascript
for (let i = 0; i < document.body.childNodes.length; i++) {
    console.log( document.body.childNodes[i] );
}

let j = 0;
while (j < document.body.childNodes.length) {
    console.log( document.body.childNodes[j] );
    j++;
}

```

## Перебор массива

```javascript
array.forEach((item, i) => {
    let li = document.createElement('li');
    li.textContent = item.title;
    ul.append(li);
    console.log(item)
})
```

## Атрибуты элемента

Коллекцию, атрибутов как и любую другую коллекцию можно перебирать

```javascript
document.querySelector('ul').attributes // Получим коллекцию атрибутов NamedNodeMap у элемента ul
```

### Установка атрибута

```javascript
document.querySelector('ul').setAttribute('id', 'ul') // Установили атрибут
document.querySelector('ul').setAttribute('title', 'Это элемент ul') // Установили еще атрибут
```

### Получить значение атрибута

```javascript
document.querySelector('ul').getAttribute('title') // "Это элемент ul"
```

### Удалить атрибут

```javascript
document.querySelector('ul').removeAttribute('title')
```

### Проверка на существование атрибутов

```javascript
document.querySelector('ul').hasAttribute('id') // true
document.querySelector('ul').hasAttributes() // Иммется ли у элемента один или более атрибутов
```

### Свойства атрибута

```javascript
document.querySelector('ul').attributes[0].nodeName // имя атрибута id
document.querySelector('ul').attributes[0].name // имя атрибута id
document.querySelector('ul').attributes[0].nodeType // 2 тип узла
document.querySelector('ul').attributes[0].nodeValue  // ul значение атрибута
document.querySelector('ul').attributes[0].value // ul значение атрибута
```

## Data атрибуты элемента

Используются для указания дополнительной информации в разметке

```javascript
document.querySelector('ul').children[1].dataset.user = 1 // Установить data атрибут
document.querySelector('ul').children[1].dataset.user = 5476567 // Отредактировать data атрибут
delete document.querySelector('ul').children[1].dataset.user // Правильно удалить data атрибут можно так
```

## Работа с классами

Работать с классами можно, как с обычными атрибутами, но гораздо лучше работать с коллекцией `ClassList`

```javascript
document.querySelector('ul').classList // Коллекция классов элемента DOMTokenList []
```

### Добавить класс

```javascript
document.querySelector('ul').classList.add('one', 'two', 'three') // Добавить три класса к элементу
```

### Удалить класс

```javascript
document.querySelector('ul').classList.remove('one', 'two') // Удалить два класса
```

### Добавить/Убрать класс

```javascript
document.querySelector('ul').classList.toggle('test') // Если данного класса не было у элемента, он будет добавлен
document.querySelector('ul').classList.toggle('test') // Если класс есть у элемента, он будет удален
```

### Проверить наличие класса

```javascript
document.querySelector('ul').classList.contains('test') // Проверка на наличие класса у элемента
```

### Заменить класс

```javascript
document.querySelector('ul').classList.replace('test','test2') // Заменить test на test2
```

## События

Задание события. Простейшая демонстрация события, это добавление/удаление элемента по клику в списке:

```javascript
let ul = document.createElement('ul');
document.body.prepend(ul);

let buttonClose = document.createElement('button');
buttonClose.textContent = 'Удалить элемент';
document.body.prepend(buttonClose);

let buttonCreate = document.createElement('button');
buttonCreate.textContent = 'Добавить элемент';
document.body.prepend(buttonCreate);

// Привязка к событию
buttonCreate.addEventListener('click', (e) => {
   let li = document.createElement('li');
   li.textContent = 'Элемент';
   ul.append(li);
});

// Привязка к событию
buttonClose.addEventListener('click', (e) => {
   let lis = document.querySelectorAll('ul > li');
   let last = lis[lis.length - 1];
   if (lis.length !== 0) {
     last.remove();
   }
});
````

### Добавить обработчик на событие

```javascript
button.addEventListener('click', (e) => {
   
});
```

### Удалить обработчик

```javascript
ul.removeEventListener('click',colorStr) // Код должен быть таким же ка  и при здании слушателя
```

### Делегирование событий

Очень важный прием при однотипных объектах.
Событие необходимо вещать на родительский элемент.
При этом абсолютно не важно сколько элементов при этом будут обрабатываться 10,100 или 100000

```javascript
// Делегирование событий, вешаем на родительский элемент, в нем проверяем по чему кликнули
ul.addEventListener('click', (e) => {
    // Текущий кликнутый элемент
    let li = event.target.closest('li');

    if (!li) {
        return false;
    }
    
    // если ul не содержит li, то ничего не делаем
    if (!ul.contains(li)) {
        return false;
    }
    // Что-то делаем с элементом, в данном случае применяем стиль
    hover(li);
});
let selected;
function hover(li) {
    if (selected) {
        selected.style.backgroundColor = '';
    }
    selected = li;
    selected.style.backgroundColor = 'gray';
}
```

## Сетевые запросы

### Получение данных

```javascript
async function responseFunction() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (response.ok) {
    return response.json();
  } else {
    return 'Ошибка запроса' + response.status;
 }
}

//или так, что практически тоже самое, но кода меньше
async function response2Function() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        return response.json();
    } catch (e) {
        console.error('Произошла ошибка!', e);
    }
}

response2Function().then((result) => (
  console.log(result)
));
```

### Загрузка данных

```javascript
await fetch('/my/url', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```

## Local Storage

Храним данные в браузере

Преимущества

- Не отправляются на сервер при каждом запросе
- Объект `localStorage` один на все вкладки браузера
- Данные не удаляются из-за срока давности

### Добавление данных в хранилище

```javascript
localStorage.setItem('test1', 1);
localStorage.setItem('test2', 2);
```

### Изменить значение ключа

```javascript
localStorage.test1 = 12321321;
```

### Получить значение ключа

```javascript
localStorage.test1 // 12321321
localStorage.getItem('test1') // 12321321 - Именно этот способ предпочтительнее
```

### Удалить ключ

```javascript
delete localStorage.test1;
```

### Перебор ключей

```javascript
for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  console.log(`${key}: ${localStorage.getItem(key)}`);
}
```