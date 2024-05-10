---
layout: default
nav_order: 19
permalink: javascript-19-fetch
title: Fetch в JavaScript
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Используем fetch запросы в javascript
date: 2024-04-20 17:00:00 +3
last_modified_date: 2024-05-10 13:00:00 +3
tags:
  - javascript
  - js
  - async
  - await
  - questions-and-solutions
---

# Fetch в JavaScript

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

## Базовый пример

````javascript
fetch('https://fakerapi.it/api/v1/addresses') // url адрез запроса
    .then((res) => {
        return res.json();
    }).then((res) => {
    console.log(res.data);
}) // Вернется promise
````

Этот пример можно изменить и переделать на async/await, тогда читаемость будет лучше

## async/await

Слово async перед функцией, делает функцию асинхронной и автоматически оборачивает ее в promise, и делает его разрешенным

````javascript
async function one(){
    return 1;
}

one().then((data) => {
    console.log(data);
})

console.log(one());
````

Ключевое слово await используется, чтобы дождаться выполнения асинхронной операции

async дает право использовать внутри функции ключевое слово await

````javascript
async function one(){
    const response = await fetch('https://fakerapi.it/api/v1/addresses');
    return await (response.json());
}

one().then((data) => {console.log(data.data)});
````

async/await упрощают работу с промисами.

Что это нам дает:

- Код легче читать, он линейный
- Легче отлаживать

Await нельзя использовать вне асинхронной функции