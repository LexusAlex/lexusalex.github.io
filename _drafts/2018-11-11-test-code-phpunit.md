--- 
layout: post 
title: Тестирование кода. Использвание phpunit
permalink: test-code-phpunit
tags: testCode php
comments: true

--- 

Предыдущие статьи:

1. [Тестирование кода. Идеология](http://lexusalex.ru/test-code-ideology)
2. Тестирование кода. Использвание phpunit

Продолжаем тему тестирования. 
Посмотрим как базово использовать phpunit.

Phpunit можно установить используя phar архив или через composer но, на этом останавливаться не будем [подробнее на оф. сайте](https://phpunit.de/getting-started/phpunit-7.html)

Для иллюстрации примеров напишем класс `Calculator`

### Как тестировать

Для написания тестов к классу `Calculator` нужно создать тестовый класс в директории `/tests`,
к названию тестируемого класса добавить постфикс `Test` (`CalculatorTest`). 
Для того чтобы заработали "тестовые методы" нужно наследовать от класса фреймворка `PHPUnit\Framework\TestCase`
В классе нужно создать публичные методы с префиксом `test*`, например `testDevision()`, `testSumm()`,
так же при необходимости в аннотацию к методу можно добавить блок `@test`. 
Внутри тестовых методов для проверки фактических результатов с реальными используются утверждения например `assertEquals()`.
Запустить тест на выполнение можно командой `phpunit` (глобально) или `vendor/bin/phpunit` (локально для проекта) 

~~~php
class CalculatorTest extends TestCase
{}
~~~

Напишем простейший тест, где протестируем суммирование двух чисел

~~~php

public function testSumm()
{
    $object = new Calculator();
    $this->assertEquals($object->plus(1,2), 3, 'addition 1 + 2 is not true');
}
~~~

В большинстве утверждений можно указывать три параметра:
-   реальное значение
-   проверяемое значение
-   сообщение об ошибке, которое будет выведено в консоль при падении теста 

Результат будет примерно таким:

~~~bash
vendor/bin/phpunit CalculatorTest

PHPUnit 7.4.3 by Sebastian Bergmann and contributors.
.                                                                   1 / 1 (100%)
Time: 19 ms, Memory: 4.00MB
OK (1 test, 1 assertion)
~~~

Где отображаеться версия PHPUnit, статус теста, колличество выполненных тестов, время и память затраченная на выполнение тестов
В статусе теста могут быть следующие значения:

1. . тест пройден успешно
2. F тест сломался не прошло утверждение
3. E ошибка в коде при выполнении теста
4. R тест который без утверждения или с выводом из теста текста
5. S пропущенный тест
6. I не реализованный тест


Тесты могут быть зависимы друг от друга

~~~php
public function testOne()
{
    // какие-то вычисления
    $data = 7;
    $this->assertSame($data,7);
    return $data;
}

/**
 * @param $result
 * @depends testOne
 * @return int
 */
public function testTwo($result)
{
    $result2 = $result + 8;
    $this->assertEquals($result2, 15);
    return $result2;
}

/**
 * @param $result
 * @depends testTwo
 */
public function testThree($result)
{
    $result3 = $result - 10;
    $this->assertEquals($result3, 5);
}
~~~

С помощью аннотации `@depends`, phpUnit понимает очередность выполнения тестовых методов
Если зависимый тест провалился, то все последующие тесты будут пропущены



[Страница с последними релизами phpunit](https://phar.phpunit.de/)




Удобно смотреть степень покрытия кода тестами
