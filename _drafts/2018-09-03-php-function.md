--- 
layout: post 
title: Php.Про функции
permalink: php-functions
tags: php dev

--- 

Особенности функций в php.

**Вызов функции**

Функция может быть вызвана до ее определения

~~~php
echo showDate();
echo showDate();

function showDate()
{
    return time(). "\n";
}
~~~

**Именование**

В php в качестве имени функции можно использовать символы `A-Za-z0-9_`.
При реализации функции мы должны описать действие которое делает функция, для этого используем глагол (напиши, положи и тд.)

~~~php
showDate() // показать дату
removeDate() // удалить дату
print() // вывести
getTableSchema() // вернуть схему таблицы
symbolsCount() // количество символов
~~~

Если функция возвращает логическое значение то используется приставка `is`

~~~php
is_array() // это массив?
is_null() // это null?
isTransactional() // это транзакция?
~~~

Есть внегласное правила в именовании:

~~~php
setProperties() // установить свойства
getId() // вернуть id
hasPath() // проверить путь
hasChild() // проверить на дочерний элемент
canView// кто может просматривать
~~~

Функция должна быть глаголом, лучше всегда придерживаться этого правила



function setFunc (int $int, array $array, callable $func, bool $b, float $float, string $str, \Psr\Log\Test\DummyTest $dummyTest)
{

}

----

