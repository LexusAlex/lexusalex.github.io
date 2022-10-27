---
layout: default
nav_order: 6
permalink: js-dom-navigation
title: DOM навигация
parent: js
description: Получение списка элементов
date: 2022-10-27 12:00:00 +3
last_modified_date: 2022-10-27 12:00:00 +3
tags:
- js

---

# DOM навигация
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

## Иерархия элементов

1. document - объект страницы
2. document.documentElement - элемент html, то есть вся страница
3. document.head - тег head
4. document.body - тело документа тег body

- Нельзя получить доступ к элементу, которого не существует во время выполнения скрипта
- null значит нет такого узла

## Получение дочерних узлов

### document.childNodes

Метод возвращает коллекцию NodeList дочерних элементов узла (в данном случае самого документа), то есть непосредственных детей

> NodeList может хранить в себе любые типы узлов

> Метод childNodes возвращает всех детей

Например, в такой разметке, получаем коллекцию из 2 узлов doctype и html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>DOM tree</title>
    </head>
    <body>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
    <script>
      console.log(document.childNodes);
    </script>
    </body>
</html>
```

### document.documentElement.childNodes

При вызове на элементе html, здесь уже получим три элемента

- head
- #text '\n' - перенос строки 
- body

### document.body.childNodes

В основном мы работаем с телом документа. В разметке выше получим 4 узла

- #text
- ul
- #text
- script

Почему рекомендуют подключать скрипты перед закрывающим тегом body, чтобы получить все дерево, иначе все что будет после тега script
не будет видно из скрипта.

##### Свойства и методы

```javascript
document.body.firstChild //Получение первого элемента коллекции
document.body.lastChild //Получение последнего элемента коллекции
document.body.hasChildNodes() // Проверка на существование дочерних элементов
```

#### Перебор коллекции

Перебрать коллекцию можно с помощью классического цикла for или while

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

Получить элемент можно по индексу.

Либо использовать цикл `for of`, что является наиболее предположительным способом перебора

```javascript
for (let node of document.body.childNodes) {
    console.log(node);
  }
```

> Не перебирайте коллекции с помощью `for in`

> Важно понимать, что коллекции доступны только для чтения.

> Полученная один раз коллекция (например в переменную) навсегда остается актуальной

Но вот незадача, коллекция - это не массив, а использовать методы массивов очень хочется, например для дальнейшего преобразования

Возможно создать массив из коллекции с помощью `Array.from()`

```javascript
Array.from(document.body.childNodes)

Array.from(document.body.childNodes, function (node) {
    return node.nodeType;
})
```

Например, можно вывести все элементы массива в строку, с коллекцией такое сделать нельзя.

```javascript
Array.from(document.body.childNodes).join('-');
```

Или просто вывести типы элементов 

```javascript
Array.from(document.body.childNodes).forEach(element => console.log(element.nodeName));
```

## Родительский узел

У всех узлов есть родительский элемент, добраться до него можно с помощью свойства `parentNode`.

Пройдемся по узлам в разметке выше.

```javascript
document.parentNode // null - у корня нет родителей
document.doctype.parentNode // HTMLDocument - это и есть корень
document.documentElement.parentNode // HTMLDocument - это и есть корень
document.body.parentNode // html
document.body.childNodes[0].parentNode // это тектовый узел, его родитель это body
document.body.childNodes[1].childNodes[1].parentNode // это элемент li а его родитель ul
```

## Соседи

Обходить соседние элементы довольно просто

```javascript
document.body.childNodes[0].nextSibling // так как первый элемент в этой коллекции текстовый узел, следующий за ним снизу - это ul
document.body.childNodes[0].nextSibling.lastChild // а здесь последний элемент коллкции это тектовый узел
document.body.childNodes[0].nextSibling.previousSibling // а здесь снова вернулись к тектовому узлу
```
## Получение дочерних элементов

Для большинства задач, нам не нужны все узлы, нам нужны только элементы, для это специальные методы для манипулирования узлами-элементами

Пройдем снова с самого верха, только при этом будем получать только элементы

### document.children

Получение коллекции дочерних элементов

```javascript
document.children // Вернется HtmlCollection в нем один элемент это html
document.body.children // ul script
Array.from(document.body.children) // Создать массив из коллекции
```

### Перебор коллекции элементов

В простейшем случае воспользуемся уже знакомым `for of`

```javascript
for (let node of document.body.children) {
    console.log(node);
}
```

> HTMLCollection может хранить в себе только элементы узлы

### Соседи, дочерние и родительский элемент

```javascript
document.parentElement // У корня нет родителя, поэтому null
document.documentElement.parentElement // так как document это не узел элемент, поэтому null
document.body.parentElement // html
document.body.children[0].parentElement // body
document.body.children[0].lastElementChild // Здесь коллекция ul, последний элемент коллекции li
document.body.children[0].lastElementChild.previousElementSibling.parentElement.parentElement // можно строить такие цепочки, здесь дошли до body
```