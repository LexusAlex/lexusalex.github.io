---
layout: default
nav_order: 9
permalink: js-dom-modification
title: Модификация документа
parent: js
description: Создание изменение и стилизация элементов
date: 2022-10-28 22:30:00 +3
last_modified_date: 2022-10-28 21:30:00 +3
tags:
- js

---

# Модификация документа
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

## Создание узлов

```javascript
let element = document.createElement('div'); // Элемент
let text = document.createTextNode('Контент для вставки в div'); // Текстовый узел
```

Пока эти элементы в памяти, теперь их нужно вставить в dom дерево

## Вставка элементов

### Вставка внутрь элемента, в конец

```javascript
element.append(text); // Здесь мы добавим текстовый узел в элемент
document.body.append(element); // Здесь мы добавим элемент в конец body
```

### Вставка внутрь элемента, в начало

Вставим элемент в начало разметки:

```html
<ul id="list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```

```javascript
let element = document.createElement('li');
let text = document.createTextNode('Новый элемент');

element.append(text);
document.getElementById('list').prepend(element);
```

### Вставка до и после элемента

Допустим нужно создать новый список и вставить его до списка выше в разметке.   

Создаем список и в цикле его заполняем.

```javascript
let list = document.getElementById('list');
  let ul = document.createElement('ul');
  ul.setAttribute('id', 'newlist');
  for (let i = 1; i < 50; i++) {
    let e = document.createElement('li');
    e.append(document.createTextNode(i));
    ul.append(e);
  }

list.before(ul); // до списка
list.after(ul); // после списка
```

### Замена узла

Еще пример полной замены узла списка на другой

```javascript
// Начало кода в примере выше
list.replaceWith(ul)
```

Так же можно вставлять несколько узлов следующим образом

```javascript
list.before(document.createElement('hr'), document.createElement('hr'))
```

### Универсальная вставка

Есть более коротка запись вставки элемента

```javascript
document.getElementById('list').insertAdjacentHTML('afterbegin','<li>0</li>') // В начало выбранного элемента
document.getElementById('list').insertAdjacentHTML('beforeend','<li>5</li>') // В конец выбранного элемента
document.getElementById('list').insertAdjacentHTML('beforebegin','<ul><li>1</li></ul>') // Вставить до элмента, в данном случае новый список
document.getElementById('list').insertAdjacentHTML('afterend','<ul><li>1</li></ul>') // Вставка после элемента

// Аналогичные методы есть для вставка текста
document.getElementById('list').insertAdjacentText('afterbegin','текст 1') // В начало элемента
document.getElementById('list').insertAdjacentText('beforeend','текст 1') // В конец элемента
document.getElementById('list').insertAdjacentText('beforebegin','текст 1') // До элемента
document.getElementById('list').insertAdjacentText('afterend','текст 1')  // После элемента

// Так же есть аналогичный метод для вставки элемента
document.getElementById('list').insertAdjacentElement('afterbegin',document.createElement('hr')) // В начало элемента
document.getElementById('list').insertAdjacentElement('beforeend',document.createElement('hr')) // В конец элемента
document.getElementById('list').insertAdjacentElement('beforebegin',document.createElement('hr')) // До элемента
document.getElementById('list').insertAdjacentElement('afterend',document.createElement('hr')) // После элемента
```

## Удаление узлов

```javascript
list.remove();
```

Также можно поменять элементы местами при необходимости, для этого необязательно их удалять, например

```javascript
document.getElementById('list').firstElementChild.before(document.getElementById('list').children[1])
```

## Клонирование узла

Например, склонируем список и вставим его в конец элемента

```javascript
document.getElementById('list').after(document.getElementById('list').cloneNode(true));
```

## Устаревшие методы

```javascript
parentElem.appendChild(node)
parentElem.insertBefore(node, nextSibling)
parentElem.replaceChild(node, oldChild)
parentElem.removeChild(node)
```

## Стилизация элементов

С помощью js можно добавлять классы и писать непосредственно в атрибут `style`

Самая частая операция - это изменение класса элемента

```javascript
document.body.setAttribute('class', 'body') // Добавим класс тем способом которым умеем
document.body.className // body
document.body.className = 'newbody' // меняем его на другой
```

Но существует и другой более предпочтительный способ работы с классами, так как это является распространенной задачей

```javascript
document.body.classList // DOMTokenList - Коллекция классов элемента
document.body.classList.add('one') // добавить класс
document.body.classList.remove('newbody') // удалить класс
document.body.classList.toggle('two') // Если класса нет, то добавить, иначе удалить
document.body.classList.contains("class") // Проверка на наличие класса у элемента
```

Так как `DOMTokenList` коллекция, то ее можно перебрать

Если у элемента есть атрибут `style`, то у него доступно соответсвующее свойство, даже если не доступно.

Таким образом можно устанавливать css свойства напрямую в элемент.

```javascript
document.body.style.backgroundColor = "red" // Задание стилей по одному
document.body.style.display = "none"
    
// Задание списка стилей
document.body.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
`;

// Но по сути тоже самое можно сдедать установим атрибут style, что мы делали выше

getDefaultComputedStyle(document.body) // Получить стили по умолчанию для элемента
```