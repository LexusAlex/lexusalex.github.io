---
layout: default
nav_order: 23
permalink: 23-php-errors-and-exceptions
title: Ошибки и исключения в php
parent: Заметки
description: Упорядочивание информации об ошибках и исключениях в php
date: 2021-09-22 18:00:00 +3
tags:
- php
---

# Ошибки и исключения в php
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

Чтобы все ошибки отображались нужно включить их поддержку

```php
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

## Ошибки

### E_PARSE

Ошибка парсинга. Ошибка возникает на этапе компиляции, работа скрипта на этом прекращается.

Например случайно забыли что-то закрыть.

```php
<?php

//PHP Fatal error:  Uncaught ParseError: Unmatched '}'
{[}]}

//PHP Fatal error:  Uncaught ParseError: syntax error, unexpected token "("
class Test {
   public function () { 
}

parse_error 
//PHP Fatal error:  Uncaught ParseError: syntax error, unexpected end of file in

```
TODO закончить раздел с ошибками

## Исключения

Исключения в php - это некоторое событие при наступлении которого его нужно обработать.

```php
<?php

throw new Exception("Что-то произошло - выбросили исключение");

//PHP Fatal error:  Uncaught Exception: Что-то произошло - выбросили исключение
```

Исключения могут быть разных типов:

- ErrorException - Исключение в случае возникновения ошибки.
- ArgumentCountError - Выбрасывается, когда в пользовательский метод или функцию передано недостаточное количество аргументов. 
- ArithmeticError -  выбрасывается, когда возникает ошибка при выполнении математических операций
- AssertionError - AssertionError выбрасывается, когда утверждение, сделанное с помощью assert(), терпит неудачу.
- DivisionByZeroError - DivisionByZeroError выбрасывается при попытке поделить число на ноль
- CompileError - Исключение CompileError выбрасывается при некоторых ошибках компиляции, которые ранее выдавали фатальную ошибку.


