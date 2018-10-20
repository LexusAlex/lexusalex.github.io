--- 
layout: post 
title: Python.Основы
permalink: php-solid
tags: php dev
comments: true

Взгляд на основы языка python, что вообще есть и как с этим работать


Ключевые слова, зарезервированные в языке

`and, as, assert, break, class, continue, def, del, elif, else, except, False, finally, for, from, global, if, import, in, is, lambda, None, nonlocal, not, or, pass, raise, return, True, try, while, with, yield` 

### Типы данных

Какие вообще есть типы данных:

1. boolean - как и в других языках логические значения True или False, только почему первая большая пока не понял
2. int - целое число
3. float - число с плавающей точкой
4. complex - комплексные числа
5. str - строка в utf-8, например "hello".
6. bytes - последовательность чисел в диапазоне 0-255
7. byte array - массив байтов, аналогичен bytes с тем отличием, что может изменяться
8. list - список
9. tuple - кортеж
10. set - неупорядоченная коллекция уникальных объектов
11. frozen set - то же самое, что и set, только не может изменяться (immutable)
12. dict - словарь, где каждый элемент имеет ключ и значение
 
Распишем подробнее что есть что

~~~python
print(type(True)) # <class 'bool'>
print(type("str")) # <class 'str'>
print(type(123)) # <class 'int'>
print(type(123.6)) # <class 'float'>
print(type([1, 2, 3, 4, 5])) # <class 'list'>
print(type(("Tom", 23))) # <class 'tuple'>
print(type({1: "Tom", 2: "Bob", 3: "Bill"})) # <class 'dict'> , объект
print(type({"Tom","Bob","Alice", "Tom"})) # <class 'set'> , множество
~~~

### Условные конструкции

Конструкция `if`, здесь пишеться без привычных скобок `()` и `{}`. Конструкции можно вкладывать друг в друга

Например

~~~python
d = 20
if d >= 21:
    print("Число больше или равно 21")
elif d >= 36:
   print("Число больше или равно 36")
else:
    print("Число меньше 21")
~~~

### Циклы


Что важно в языке на мой взгляд

1. Язык регистрозависимый

