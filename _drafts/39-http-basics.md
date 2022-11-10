---
layout: default
nav_order: 39
permalink: 39-http-basics
title: Протокол HTTP
parent: Заметки
description: Что такое HTTP
date: 2022-11-08 17:00:00 +3
last_modified_date: 2022-11-08 17:00:00 +3
tags:
- http
---

# Протокол HTTP
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

HTTP - Протокол передачи гипертекста.

## Особенности:

- В HTTP/1.1 был введён механизм Connection: Keep-Alive, что позволяет использовать одно соединение для более чем одного запроса
- HTTP не зависит от типа контента
- HTTP не имеет никаких промежуточных состояний
- HTTP/1.1 позволяет клиентам отправлять несколько запросов одновременно, при этом не ждать каждого ответа

Сеанс HTTP - это последовательность запрос-ответ

## Клиент

HTTP Клиент - отправляет запрос на сервер одним из методов запроса, путь и версию протокола.

## Сервер

HTTP-сервер, прослушивающий порт на который пришел запрос

## Характеристики протокола

## Структура HTTP сообщения

Они должны быть в следующем порядке:

- Стартовая строка
- Заголовки
- Пустая строка
- Тело сообщения

### Стартовая строка

Первая строка запрос

```http request
GET / HTTP/1.1
```

Первая строка ответ

```http request
HTTP/1.1 200 Ok
```

### Заголовки

Заголовки бывают разных видов

- Общие заголовки - могут быть как в запросе, так и в ответе
- Заголовки запроса - могут быть только в сообщении запроса
- Заголовки ответа - могут быть только в ответе
- Заголовки сущности - содержат информацию об объекте

Пример заголовка:

```http request
Host: ya.ru
```

### Пустая строка

Пустая строка отделяет заголовки от тела сообщения.

### Тело сообщения

Это часть, которая содержит непосредственно данные запроса, что может быть:

- html код
- данные веб форм
- различные ресурсы (изображения, шрифты)

## Запрос

Состоит из следующих элементов

- Строка запроса (Метод URI Версия HTTP)
- Поля заголовков
- Пустая строка
- Необязательное тело сообщения

### Строка запроса

В общем виде строка запроса выглядит так `Метод URI Версия HTTP`

#### Метод запроса

По сути это то, что мы хотим сделать с ресурсом.

Название метода всегда указывается в верхнем регистре
Не существует обязательных методов, если сервер не понял метод, он вернет статус 501,
если метод не может быть использован на текущем ресурсе, то вернется статус 405

Так же сервер должен вернуть заголовок со списком поддерживаемых методов

##### GET

Нужен для запроса содержимого указанного ресурса

```http request
GET /education/group-uc/create/?group_id=5965 HTTP/1.1
```

Запрос типа GET считается идемпотентным, то есть при одинаковых параметрах
возвращает одинаковый результат.

- условный GET 
  - If-Modified-Since
  - If-Match
  - If-Range
- частичный GET
  - Range

##### HEAD

В ответе сервера отсутствует тело запроса

Обычно этот метод используется для получения мета данных, валидации ответа сервера
Заголовки ответа могут кешироваться.

##### POST

Передача пользовательских данных ресурсу и передача файлов.

Передачаемые данные включаются в тело запроса.

метод POST не считается идемпотентным

Если ресурс был создан то сервер должен вернуть ответ 201 (Created)

Сообщение не кешируется

##### PUT

Загрузить содержимого запроса на указанных URI, если ресурса не было, то он его создаст 201 (Created)
Если он был изменен то  200 (Ok) или 204 (No Content)

501 (Not Implemented).

Фундаментальное различие методов POST и PUT заключается в понимании предназначений URI ресурсов. Метод POST предполагает, что по указанному URI будет производиться обработка передаваемого клиентом содержимого. Используя PUT, клиент предполагает, что загружаемое содержимое соответствует находящемуся по данному URI ресурсу. 

##### DELETE

Удалить указанный ресурс

##### CONNECT
##### OPTIONS
##### TRACE
##### PATCH

#### URI

Уникальный идентификатор ресурса, к которому применить запрос.

- `*`
- `http://site/pub/WWW/TheProject.html`
- `/pub/WWW/TheProject.html`

### Поля заголовков

Сам клиент добавляет нужные ему заголовки

*   Accept-Charset
*   Accept-Encoding
*   Accept-Language
*   Authorization
*   Expect
*   From
*   Host
*   If-Match
*   If-Modified-Since
*   If-None-Match
*   If-Range
*   If-Unmodified-Since
*   Max-Forwards
*   Proxy-Authorization
*   Range
*   Referer
*   TE
*   User-Agent


https://habr.com/ru/company/nix/blog/304518/


### Пустая строка

### Тело сообщения

## Ответ

Может состоять из следующих элементов

- Строка состояния
- Поля заголовков ответа
- Пустая строка
- Тело сообщения

### Строка состояния

Общий вид выглядит следующим образом 

`Версия http Код состояния Текст состояния`

#### Версия http

- HTTP/1.0
- HTTP/1.1
- HTTP/2

#### Код состояния и тест состояния

Клиент может не знать все коды состояния, но он обязан отреагировать в соответствии с классом кода.

Существует пять классов кодов состояния

Первая цифра определяет класс ответа

##### 1xx Информационные

Коды информируют о процессе передачи. Введены в версии HTTP 1.1.
Клиент должен быть готов принять такие коды от сервера как обычный ответ сервера
Сами сообщения содержат только стартовую строку ответа.

* 100 Continue - Клиент может продолжать пересылать заголовки
* 101 Switching Protocols - Сервер переключаем протоколы, заголовок Upgrade
* 102 Processing - Запрос принят
* 103 Early Hints - Используется если заголовки полного ответа не могут быть быстро сформированы
##### 2xx Успешно

Запрос клиента успешно пришел и обработан сервером

* 200 OK - Данные клиента успешно добавлены в заголовки либо в тело сообщения
* 201 Created - Был создан новый ресурс
* 202 Accepted
* 203 Non-Authoritative Information
* 204 No Content
* 205 Reset Content
* 206 Partial Content
* 207 Multi-Status
* 208 Already Reported
* 226 IM Used
##### 3xx Перенаправления
* 300 Multiple Choices
* 301 Moved Permanently
* 302 Moved Temporarily
* 302 Found
* 303 See Other
* 304 Not Modified
* 305 Use Proxy
* 306 зарезервировано;
* 307 Temporary Redirect
* 308 Permanent Redirect
##### 4xx Ошибка клиента
* 400 Bad Request
* 401 Unauthorized
* 402 Payment Required
* 403 Forbidden
* 404 Not Found
* 405 Method Not Allowed
* 406 Not Acceptable
* 407 Proxy Authentication Required
* 408 Request Timeout
* 409 Conflict
* 410 Gone
* 411 Length Required
* 412 Precondition Failed
* 413 Payload Too Large
* 414 URI Too Long
* 415 Unsupported Media Type
* 416 Range Not Satisfiable
* 417 Expectation Failed
* 418 I’m a teapot
* 419 Authentication Timeout (not in RFC 2616)
* 421 Misdirected Request;
* 422 Unprocessable Entity
* 423 Locked
* 424 Failed Dependency
* 425 Too Early
* 426 Upgrade Required
* 428 Precondition Required
* 429 Too Many Requests
* 431 Request Header Fields Too Large
* 449 Retry With
* 451 Unavailable For Legal Reasons
* 499 Client Closed Request
##### 5xx Ошибка сервера
* 500 Internal Server Error
* 501 Not Implemented
* 502 Bad Gateway
* 503 Service Unavailable
* 504 Gateway Timeout
* 505 HTTP Version Not Supported
* 506 Variant Also Negotiates
* 507 Insufficient Storage
* 508 Loop Detected
* 509 Bandwidth Limit Exceeded
* 510 Not Extended
* 511 Network Authentication Required
* 520 Unknown Error
* 521 Web Server Is Down
* 522 Connection Timed Out
* 523 Origin Is Unreachable
* 524 A Timeout Occurred
* 525 SSL Handshake Failed
* 526 Invalid SSL Certificate
### Поля заголовков ответа

Позволяют серверу передавать дополнительную информацию об ответе

*   Accept-Ranges
*   Age
*   ETag
*   Location
*   Proxy-Authenticate
*   Retry-After
*   Server
*   Vary
*   WWW-Authenticate

### Пустая строка
### Тело сообщения

https://http.dev/

## Заголовки

Помимо специальных заголовков ответа и запроса бывают

- Общие
- Заголовки сущности

### Общие заголовки

Cache-control
Connection
Date
Pragma
Trailer
Transfer-Encoding
Upgrade
Via
Warning
Accept
Accept-Charset
Accept-Encoding
Accept-Language
Authorization
Cookie
Expect
From