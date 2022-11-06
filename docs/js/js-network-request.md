---
layout: default
nav_order: 25
permalink: js-network-request
title: Сетевые запросы
parent: js
description: Разберемся в том, как js может отправлять сетевые запросы
date: 2022-11-06 20:00:00 +3
last_modified_date: 2022-11-06 20:00:00 +3
tags:
- js

---

# Сетевые запросы
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

Я не профессионал в этом, пишу как понимаю, могу ошибаться в каких-то вещах.

Современный способ отправить запрос на сервер является метод `fetch`, о нем пойдет речь.

```javascript
fetch('http://jsonplaceholder.typicode.com/posts') // Отправить get запрос на сервер
```

В итоге мы получим `promise`

Следующий код отправит get на список постов, если статус ответа от 200 до 299, то мы выведем результат в виде json,
иначе получим ошибку запроса.

```javascript
(async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (response.ok) {
      let result = await response.json();
      console.log(result);
    } else {
      console.log('Ошибка запроса' + response.status);
    }
})()
```

Самое интересное, то что ответ можно получить в различных форматах самые основные - это `json` и `text`, хотя исходный ответ в json

Тот же самый код можно переписать на использование промисов:

```javascript
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(result => console.log(result))
```



`response.body` это объект `ReadableStream`, где можно получать содержимое по частям.

-- не дописано