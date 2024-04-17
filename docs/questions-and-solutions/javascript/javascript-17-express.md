---
layout: default
nav_order: 17
permalink: javascript-17-express
title: Express. Основы
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Разбираем что такое express и как он работает
date: 2024-04-17 15:00:00 +3
last_modified_date: 2024-04-17 15:00:00 +3
tags:
- javascript
- nodejs
- questions-and-solutions
---

# Express. Основы
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

Подготовительную часть опустим, сосредоточимся на базовых операциях.

## Базовое использование

```javascript
const express = require("express");
const app = express(); // Объект приоложения

// Базовый маршрут, таких может быть сколько угодно
app.get("/", function(request, response){
    response.send("<h2>Привет Express!</h2>");
});
// Запуск сервера
app.listen(3000);
```

Express опирается на систему маршрутов, поэтому все для чего нет маршрута будет выдавать `Cannot GET /gh`

## middleware

Запросы можно передавать по конвееру

````javascript
app.use(function (request, response, next){
    console.log("Middleware 1");
    next();
});
app.use(function (request, response, next){
    console.log("Middleware 2");
    next();
});
app.use(function (request, response, next){
    console.log("Middleware 3");
    next();
});

// Далее вызов маршрутов
````

Но их необязательно все вызывать, можно завершить выполнение, тогда выполнение на данном middleware закончится

````javascript
app.use(function (request, response, next){
    console.log("Middleware 2");
    response.send('<h2>Middleware 2</h2>');
});
````

Middleware также можно повесить на маршрут, например

````javascript
app.use('/test',function (request, response, next){
    console.log("Middleware 2");
    response.send('<h2>Middleware 2</h2>');
});
````

Например, можно сделать какую-то работу до запроса, логирование запроса

````javascript
app.use(function(request, response, next){
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);
    fs.appendFile("server.log", data + "\n", function(error){
        if(error) return console.log(error); // если возникла ошибка
        console.log("Запись файла завершена");
    });
    next();
});
````

Здесь мы логируем запросы пришедшие на сервер и записываем их в фаил.

## Response

Express может вернуть 

- `response.send("<h2>Hello</h2>")`
- `response.send({id:6, name: "Tom"})`
- `response.send(["Tom", "Bob", "Sam"])`
- `response.sendFile(__dirname + "/index.html")`
- `response.sendStatus(404)` - отправка статусных кодов
- `response.status(404).send(`Ресурс не найден`)`

## Маршруты

Express опирается на маршруты.

Поддерживающие методы
* use
* get
* post
* put
* delete

Если нужно получить параметры строки запроса, внутри экшена вызвать `request.query.id`

Можно также передавать массивы данных `const usernames = request.query.name;`

Либо метод может быть таким 

````javascript
app.get("/p/:productId", function (request, response) {
    response.send("productId: " + request.params["productId"])
}); // откывается по адресу /p/1

// Еще вариант более сложного маршрута
app.get("/categories/:categoryId/products/:productId", function (request, response) {
    const catId = request.params["categoryId"];
    const prodId = request.params["productId"];
    response.send(`Категория: ${catId}  Товар: ${prodId}`);
});
````

