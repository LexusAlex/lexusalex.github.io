---
layout: post
title: Команды и запросы
permalink: cqs-functions
tags: php functions
comments: true
summary:  Разделение функций на команды и запросы
is_navigate: false
---

Существует принцип [Command-query separation](https://ru.wikipedia.org/wiki/CQRS) по которому функция представляет из
себя либо команду либо запрос.

## Запрос

Функция - которая возвращает результат, который основывается на переданных параметрах, при этом функция должна быть 
[чистой](https://lexusalex.ru/pure-functions)

~~~php
is_array($array) // типичный предикат, можно вызывать сотни раз и ничего не сломается

is_max_didth($array) // функция вернет максимальное число в массиве
~~~

## Команда

Это функция которая выполняет какое-либо действие. Может менять состояние системы.

Например функция которая добавляет пользователя в БД;

~~~php
function create($user) {
    // INSERT INTO ....
    
    return $result ? true : false;
}
~~~

Если выполнить этот код повторно с теми же исходными данными, это приведет к ошибке. 

## Преимущества этого подхода

1. Без выполнения кода понятно, что делает функция


Кроме того, нам больше не требуется выполнять код, чтобы понять, что в нём происходит. Отсюда — меньше возможностей для появления ошибок.


https://bespoyasov.ru/blog/commands-and-queries/
https://ru.hexlet.io/courses/php-functions/lessons/command-query-separation/theory_unit#lesson
https://habr.com/ru/company/simbirsoft/blog/329970/
https://msdn.microsoft.com/ru-ru/magazine/mt147237.aspx