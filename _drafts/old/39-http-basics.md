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

Протокол HTTP — это протокол запроса/ответа, основанный на архитектуре клиент/сервер.

Где клиентом выступает программа отправляющая запрос на сервер, а сервером - веб-сервер отвечающим на эти запросы в виде сообщений
Работа протокол идет в сеансе http запрос/ответ.

## Структура HTTP сообщения

Все общение клиента и сервера идет с помощью сообщений, они могут различаться для запроса и ответа, и должны передаваться в
указанной последовательности:


| Запрос            | Ответ            |
|-------------------|------------------|
| Строка запроса    | Строка состояния |
| Заголовки запроса | Заголовки ответа |
| Пустая строка     | Пустая строка    |
| Тело сообщения    | Тело сообщения   |

Пример запроса и ответа:

```http request
### Запрос
GET /index.html HTTP/1.1
Host: 127.0.0.1

### Ответ
HTTP/1.1 200 OK
Server: nginx/1.23.2
Date: Sat, 12 Nov 2022 07:17:37 GMT
Content-Type: text/html
Content-Length: 615
Last-Modified: Wed, 19 Oct 2022 07:56:21 GMT
Connection: keep-alive
ETag: "634fada5-267"
Accept-Ranges: bytes

<!DOCTYPE html>
<html>
<head>
    <title>Welcome to nginx!</title>
    <style>
        html {
            color-scheme: light dark;
        }

        body {
            width: 35em;
            margin: 0 auto;
            font-family: Tahoma, Verdana, Arial, sans-serif;
        }
    </style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
    working. Further configuration is required.</p>

<p>For online documentation and support please refer to
    <a href="http://nginx.org/">nginx.org</a>.<br/>
    Commercial support is available at
    <a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

Применимо к заголовкам, они бывают разных видов

- Общие заголовки - могут быть как в запросе, так и в ответе
- Заголовки запроса - могут быть только в сообщении запроса
- Заголовки ответа - могут быть только в ответе
- Заголовки сущности - содержат информацию об объекте, теле сущности

## Запрос

Запрос содержит как обязательные, так и не обязательные параметры.

### Строка запроса

В общем виде строка запроса выглядит так `МетодЗапроса URIПутьРесурса ВерсияHTTP`

#### Метод запроса

Метод определяет какое действие выполниться для данного ресурса.

HTTP методы могут быть безопасными, идемпотентными или кешируемыми

- Безопасный - не меняет состояние сервера
- Идемпотентный - при запросе с одними и теми же параметрами имеем один и тот же результат
- Кешируемый - Ответ может быть кешируемым

- Сервер может не распознать метод тогда он вернет статус 501 (Not Implemented).
- Если метод известен, но не применим к ресурсу 405 (Method Not Allowed)
- 408 если не должая ответа от клиента

##### GET (Получить)

Используется для запроса содержимого указанного ресурса. Нужен только для получения данных
Запрос методом GET не имеет тела запроса, является безопасным и кешируемым

```http request
GET /index.html HTTP/1.1
```

Также могут быть переданы параметры запроса (Query string):

```http request
GET /index.html?test=123&test2=456&test6=789 HTTP/1.1
```

```http request
GET /education/group-uc/create/?group_id=5965 HTTP/1.1
```

##### HEAD (Получить)

В ответе сервера отсутствует тело запроса

Обычно этот метод используется для получения мета данных, валидации ответа сервера.

Безопасный, идемпотентный и кешируемый

```http request
HEAD /index.html HTTP/1.1
```

##### PUT (Создать,заменить)

Создает новый ресурс на сервере. Запрос имеет тело которое, может быть помещено в новый ресурс. Не безопасный, меняет
состояние сервера, идемпотентный. Не кешируемый. 

```http request
PUT /text.txt HTTP/1.1
Host: 127.0.0.1
Content-Type: text/plain

Новый текст
```

По окончанию операции должен вернуть статус ответа 201 (created), если ресурс был изменен то вернется статус 204 (no content)

##### DELETE (удалить)

Удаляет указанный ресурс. 

```http request
DELETE /file.html HTTP/1.1
```

Если метод успешно выполнился, то вернется следующие состояния

- 202 Успешное удаление
- 204 Успешное удаление без тела ответа
- 200 Успешное удаление с контентом ответа

##### PATCH (частичная замена ресурса)

Обновляет содержимое ресурса. Запрос и ответ может иметь тело

```http request
PATCH /text.txt HTTP/1.1
Host: 127.0.0.1
Content-Type: application/example
If-Match: "e0023aa4e"
Content-Length: 100

описание изменений
```

##### OPTIONS (Возможные методы сервера)

##### POST (Отправка данных)

Передача пользовательских данных ресурсу и передача файлов.

Переда чаемые данные включаются в тело запроса.

метод POST не считается идемпотентным

Если ресурс был создан то сервер должен вернуть ответ 201 (Created)

Сообщение не кешируется


```http request
POST / HTTP/1.1
Host: 127.0.0.1
Content-Type: application/x-www-form-urlencoded
Content-Length: 13

test=123&test2=234
```

Пример отправки формы

```http request
POST /buy HTTP/1.1
Host: test.ru
Content-Type: application/x-www-form-urlencoded
Content-Length: 31

product=345&content=2


HTTP/1.1 302 Moved Temporarily
Location: /products
```

##### CONNECT (связь)

Запускает двухстороннюю связь с запрошенным ресурсом

##### TRACE

Информация о запросе

#### URI

Уникальный идентификатор ресурса, к которому применить запрос.

В каком виде может быть путь

- `*`
- `https://httpbin.org/ip`
- `/text.html`  g 

#### Версия http

- HTTP/1.0
- HTTP/1.1
- HTTP/2

### Заголовки запроса

Идут сразу же после стартовой строки

#### HOST

Содержит имя домена и номер порта для которого предназначен запрос.

Порт может быть не указан, тогда будет использоваться порт по умолчанию.

Запрос может иметь только один заголовок `HOST`, если их будет несколько вернется код ответа сервера 400

```http request
GET / HTTP/1.1
Host: 127.0.0.1
```

#### Accept

Тип контента который мы ожидаем от сервера

```http request
Accept: text/plain; q=0.5, text/html, text/x-dvi; q=0.8, text/x-c
Accept: application/xml, text/html;q=0.9
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8 - это отпрвляет браузер
```

Где q уровень качества, вес или приоритет для применяемых типов от 0 до 1
По умолчанию q = 1

Но сервер такое может не поддерживать. Это всего лишь предпочтения сервера.

#### Accept-Charset

Какие наборы символов приемлемы для ответа.

```http request
Accept-Charset: iso-8859-5, unicode-1-1; q=0.8
```

#### Accept-Encoding

Ограничивает допустимые кодировки

```http request
Accept-Encoding: compress, gzip
Accept-Encoding:
Accept-Encoding: *
Accept-Encoding: compress;q=0.5, gzip;q=1.0
Accept-Encoding: gzip;q=1.0, identity; q=0.5, *;q=0
Accept-Encoding: gzip, deflate, br
```

#### Accept-Language

Ограничивает набор естественных языков, 
которые предпочтительны в качестве ответа на запрос.

````http request
Accept-Language: da, en-gb;q=0.8, en;q=0.7
Accept-Language: ru
Accept-Language: en-US,en;q=0.5
````

Это нужно программировать

#### Content-Type

При передаче данных форм, браузер отправит форму именно таким образом

```http request
Content-Type: application/x-www-form-urlencoded
Content-Type: multipart/form-data; boundary="sd" // Отправка данных из формы на сервер
```

#### Content-Disposition

Используется для каждой отдельной части multipart тела сообщения.

```http request
POST /test.html HTTP/1.1
Host: example.org
Content-Type: multipart/form-data;boundary="boundary"

--boundary
Content-Disposition: form-data; name="field1"

value1
--boundary
Content-Disposition: form-data; name="field2"; filename="example.txt"

value2
--boundary--
```

````http request
200 OK
Content-Type: text/html; charset=utf-8
Content-Disposition: attachment; filename="cool.html"
Content-Length: 22

<HTML>Save me!</HTML>
````

Ответ вызовет диалог сохранить как

#### Range

Указывает серверу какую часть документа нужно вернуть

```http request
Range: bytes=200-1000, 2000-6576, 19000-
```

Пример:

```http request
GET / HTTP/1.1
Host: 127.0.0.1
Range: bytes=0-3

HTTP/1.1 206 Partial Content
Server: nginx/1.23.2
Date: Sat, 12 Nov 2022 15:59:33 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 4
Content-Range: bytes 0-3/14

Ко

```

#### Cookie

Сказать серверу установить куки для данной страницы

```http request
Cookie: name1=value1;name2=value2;name3=value3
```

### Пустая строка

Перенос строки

### Тело сообщения

Мы можем посылать контент частями, пока не будет пустой строки

## Ответ

### Строка состояния

В общем виде строка состояния ответа выглядит так `HTTPПротокол КодСостояния ТекстКодаСостояния`

#### HTTP Протокол

- HTTP/1.0
- HTTP/1.1
- HTTP/2

#### Код и тест состояния

### Заголовки ответа

#### Content-Type

В большинстве случаев сервер сам пытается определить mime type ресурса исходя из соответствия.

````http request
HTTP/1.1 200 OK
Content-Type: image/png
Content-Type: image/jpeg
Content-Type: application/pdf
Content-Type: application/xml
Content-Type: text/html
Content-Type: application/octet-stream //Универсальный атрибут
````
Сервер автоматически может посмотреть кодировку файла и подставить ее в заголовок
 
`Content-Type: text/plain; charset=utf-8`
`Content-Type: text/html; charset=ISO-8859-4`

#### Content-Length

Длина переданного контента сервером в байтах

Заголовок Content-Length указывает размер отправленного получателю тела объекта в байтах.

```http request
Content-Length: 2
Content-Length: 23455
```

Русские буквы 1 символ 2 байта

#### Content-Range

Если клиент прислал размер частично переданного обьекта, сервер ему возвращает часть содержимого

```http request
Content-Range: bytes 0-499/1234
Content-Range: bytes 500-999/1234
```

При этом ответ сервера будет 206 Partial Content

#### Location

Используется для перенаправления получателя

```http request
Location: /test/product/23
```

#### Set-Cookie

В ответ клиента на Cookie сервер установит куку в браузер

```http request
Set-Cookie: имя1=значение1,имя2=значение2; Expires=Wed, 09 Jun 2021 10:18:14 GMT
```

Возможные параметры:

- Comment комментарий
- Domain - домен на котором действуют куки
- Expires - Дата истечения куки
- Path - Путь к которому применяется эта кука
- Secure - Разрешено работать с куки только по https, в обычном не посылать

Google Chrome не удаляет их после закрытия браузера

Чтобы запретить доступ к кукам через JS, нужно устанавливать их с флагом HttpOnly

### Пустая строка
### Тело сообщения

Если в запросе присутствует тело сообщения, то заголовки `Content-Type` и `Content-Length` определяют его тип и длину

## Состояние

Нужно четко разграничивать пользователей на сайте и не хранить глобальное состояния на сервере

Cookie прямо передаются в браузере, они сохраняются в браузере пользователя, на стороне посетителя.
Полная независимость клиент друг от друга.

## Типы серверов

Любой http сервер по умолчанию умеет раздавать статические файлы. 

Его нужно научить понимать 

CGI - Запускать разные программы на сервере












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
* 201 Created - Был создан новый ресурс (после POST)
* 202 Accepted
* 203 Non-Authoritative Information
* 204 No Content (после метода DELETE)
* 205 Reset Content
* 206 Partial Content
* 207 Multi-Status
* 208 Already Reported
* 226 IM Used
##### 3xx Перенаправления
* 300 Multiple Choices
* 301 Moved Permanently (Ресурс перемещен постоянно)
* 302 Moved Temporarily (Редирект на другой)
* 302 Found
* 303 See Other
* 304 Not Modified (Кеширование)
* 305 Use Proxy
* 306 зарезервировано;
* 307 Temporary Redirect
* 308 Permanent Redirect
##### 4xx Ошибка клиента
* 400 Bad Request
* 401 Unauthorized
* 402 Payment Required
* 403 Forbidden
* 404 Not Found (Несущесвуещие)
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
* 500 Internal Server Error (В програмном коде)
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
