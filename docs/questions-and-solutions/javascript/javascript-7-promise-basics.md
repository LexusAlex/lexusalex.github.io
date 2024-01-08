---
layout: default
nav_order: 7
permalink: javascript-7-promise-basics
title: Основы Promise
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Как в javascript работает асинхронный код на примере promise
date: 2024-01-08 21:00:00 +3
last_modified_date: 2024-01-08 21:00:00 +3
tags:
- javascript
- js
- async
- questions-and-solutions
---

# Основы Promise
{: .no_toc }

<details open markdown="block">
  <summary>
    Содержание
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>
---

## Что это такое

Promise - объект c набором скрытых полей для обработки и более удобной работы с асинхронным кодом.

## Создание

````javascript
// Базовое создание promise, внутрь нужно обязательно передать самозапускающиеся функцию
let p = new Promise(() => {});
// Либо передать функцию из вне
function promiseExec() {
    console.log('exec');
}
let p2 = new Promise(promiseExec); // exec
````

Пока от этого мало пользы. Изучим его состояния

Как только мы создали promise создается со стартовым состоянием `pending` - это говорим о том, что мы начали операцию.

Чтобы сменить состояние на `fulfilled`, то есть успех, promise должен разрешить это. Для этого он предоставляет функцию `resolve`

## resolve

В функцию конструктор передается функция `resolve`, которую обязательно нужно вызвать в любом случае, если для нас важно,
чтобы промис завершился успешно.

````javascript
let p = new Promise((resolve) => {
    resolve(10 + 3); // Теперь состояние `fulfilled` то есть завершен
});
````

Ну а что делать с ошибками, для этого существует функция `reject`, которая передается вторым параметром в конструктор.

## reject

````javascript
let p = new Promise((resolve, reject) => {
    reject(Error(1+1)); // Теперь получили третье состояние rejected
});
````
 
Если не вызвать функцию `resolve` или `reject`, его нельзя будет обработать.

О там как обработать promise ниже.
 
## Обработка promise

Для успешной обработки результата нужно вызвать метод `then`, он принимает два коллбэка `result` - успешное выполнение и `error` - ошибка.

## then

````javascript
let p = new Promise((resolve,reject) => {
  //reject(new Error('error123'))
  resolve(33 + 4);
});

console.log(
   p.then(
          (result) =>{console.log(result)}, // Выводим успешный результат
          (error) => {console.log(error)} // Если произошла ошибка
   )
);
````
 
Практический пример на примере `fetch` 

````javascript
fetch('https://fakerapi.it/api/v1/books') // Возвращает promise
        .then(res => res.json()) // так же возвращает promise
        .then(json => console.log(json.data)); // а вот теперь вернем данные
````

## Примечания

- Три состояния `pending` - операция началась, `fulfilled` - операция завершилась успешно, `rejected` - произошла ошибка при выполнении промиса.
- Важно, что мы сами контролируем переходы между состояниями.
- Если не вызвать функцию `resolve` или `reject`, его нельзя будет обработать.
- Внутри promise менять состояние можно только один раз

Более глубокое погружение в промисы сделаю в будущих заметках, так как это очень большая тема.






