---
layout: default
nav_order: 6
permalink: php-6-phpunit
title: PHP Unit
parent: php
grand_parent: Вопросы и решения
has_children: true
description: Исследование unit тестирования на примере phpunit
date: 2023-07-18 15:00:00 +3
last_modified_date: 2023-07-22 21:30:00 +3
tags:
- php
- phpunit
- questions-and-solutions
---

# PHP Unit
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

Вводная статья про unit тестирование [https://lexusalex.ru/5-php-phpunit](https://lexusalex.ru/5-php-phpunit)

## Установка

````shell
# Установка стандартная через composer
composer require --dev phpunit/phpunit
# Проверка версии
./vendor/bin/phpunit --version # PHPUnit 10.2.6 by Sebastian Bergmann and contributors.
````

## Настройка

Запускать phpunit можно с ключами в cli, что менее удобно, гораздо удобнее создать конфигурационный файл `phpunit.xml` 

```shell

# Генерирование конфига в xml
./vendor/bin/phpunit --generate-configuration
# Указание конфигурационного файла
./vendor/bin/phpunit --colors=always --configuration=etc/phpunit.xml
```

Основные ключи конфигурационного файла

````text
phpunit
    bootstrap - Сценарий начальной загрузки, как правило это путь до autoload.php
    cacheDirectory - Каталог для кеша
    executionOrder - В каком порядке выполнять тесты, так как у нас независимость, ставлю random
    beStrictAboutOutputDuringTests - Помечать тест как рискованный когда он выводит что-то на печать
testsuites
    testsuite - Где искать тесты, список каталогов, так же можно указать имя    
````

Пример базовой конфигурации, переделанной под мои нужды:

````xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="../vendor/phpunit/phpunit/phpunit.xsd"
         bootstrap="../tests/bootstrap.php"
         cacheDirectory="../var/cache/.phpunit.result.cache"
         executionOrder="random"
         beStrictAboutOutputDuringTests="true"
         beStrictAboutTodoAnnotatedTests="true">
    <testsuites>
        <testsuite name="default">
            <directory>../tests</directory>
        </testsuite>
    </testsuites>
    <php>
        <ini name="error_reporting" value="-1"/>
        <env name="APPLICATION_ENVIRONMENT" value="test" force="true"/>
        <env name="APPLICATION_DEBUG" value="1" force="true"/>
    </php>
</phpunit>
````

## Написание тестов

````php
// Название файла должно совпадать с названием класса в таком виде [Название]Test
// Тогда phpunit распознает что это тест
<?php
declare(strict_types=1);

use PHPUnit\Framework\TestCase;

class SolutionTest extends TestCase
{
    
}

// Внутри добавляются тестовые методы
// Обычно один метод проверяет один case
public function testSolution1()
{

}

public function testSolution2()
{

}

public function testSolution3()
{

}
````

## Утверждения

Внутри методов пишут утверждения, некоторые примеры:

````php
public function testSolution1()
{
    // Наличие key в массиве
    self::assertArrayHasKey('key',['key' => 123]);
    // Указанного ключа нет в массиве
    self::assertArrayNotHasKey('key',['key2' => 123]);
    // Имеется ли значение в массиве
    self::assertContains(1, [1,2,3,4]);
    // Значения в массиве нет
    self::assertNotContains(1, [2,3,4]);
    // Количество элементов в массиве
    self::assertCount(1, [2]);
    // Сколько элементов нет в массиве
    self::assertNotCount(2, [2]);
    // Пустое значение
    self::assertEmpty('');
    // Эквивалентные значения
    self::assertEquals(1,1);
    // Не эквивалентные значения
    self::assertNotEquals(3,1);
    // true
    self::assertTrue(print_r(''));
    // false
    self::assertFalse(false);
    // тип и значение должны совпадать
    self::assertSame([1],[1]);
    // тип или значение не должны совпадать
    self::assertNotSame('1',1);
    // Сравнить две строки, без учета регистра
    self::assertStringContainsStringIgnoringCase('STR','str');
    // Сравнить размеры двух массивов
    self::assertSameSize([1],[1]);
    // Больше чем
    self::assertGreaterThan(1,2);
}
````
Документация с полным перечнем [https://docs.phpunit.de/en/10.2/assertions.html](https://docs.phpunit.de/en/10.2/assertions.html)

## Исключения

```php
// Если код выбрасывает исключения - это тоже можно тестировать
$this->expectException(DomainException::class); // Указываем класс которое исключение ожидается
throw new DomainException();

// Так же есть возможность проверить сообщение, возвращаемое исключением
$this->expectException(UnexpectedValueException::class);
$this->expectExceptionMessage('`stdClass` must implement Psr\Container\ContainerInterface');
```

## Печать строки в поток

Если код выдает побочный эффект как строка, это тоже можно отловить, таким образом

````php
$this->expectOutputString('String');
echo 'String';
````

## Незавершенные тесты

````php
// Этим можно управлять указав, что тест незавершенный
$this->markTestIncomplete('Завершу позже'); // I
````

## Пропущенные тесты

````php
// Тест можно пропускать, при каких - то условиях
$this->markTestSkipped('Пропускаю'); // S
// Тесты могут быть зависимы друг от друга, хоть это не приветствуется
````

## Stub

Объект, который заменяет реальный объект и создает его заглушку.

В стаб передаются название класса или название интерфейса.

Посмотрим на примере:

````php
<?php
// Класс который нужно заменить
namespace Test;

class Original
{
    public function send(string $y)
    {
       return false;
    }
}

// Тестовый класс
namespace Test;

use PHPUnit\Framework\TestCase;

class SolutionTest extends TestCase
{
    public function testSolution()
    {
        // Если это интерфейс он на лету создает реализацию этого интерфейса и объект этого класса
        // Если это класс создает объект этого класса примерно с таким названием Mock_Original_23a89a53. Переопределяет все его методы
       $stub = $this->createStub(Original::class);
       // Помимо всех оригинальных методов, phpunit добавляет свои
       // Например наш метод send должен вернуть true, делается это так
       $stub->method('send')->willReturn(true);
       // Теперь метод send возвращает true
       $stub->send(4));
       
       // Так же метод может бросить нужное нам исключение, но в исходно коде все останется так же
       $stub->method('send')->willThrowException(new \RuntimeException());
       
       // Еще имеем возможность вернуть аргумент по порядковому номеру
       $stub->method('send')->willReturnArgument(0);
       $stub->send(44) // Здесь вернется 44 как первый агрумент метода
       
       // Можно возарщать функцию
       $stub->method('send')->willReturnCallback(function (){return 55;});
       $stub->send() // 55
       
       // Можно вернуть сам объект стаба, если это необходимо
       $stub->method('send')->willReturnSelf();
       print_r($stub->send());
       
       // В итоге мы на лету генерируем то, что должен возвращать метод
       // При этом очень удобно работать с классами с небольшим набором методов
       // Стаб это просто заглушка которая возвращает результат
    }
}
````

## Mock

Мок в отличие от стаба проверяет как выполняется код, он должен выполнится определенным образом.
Здесь важное слово - это поведение метода, его можно настроить как требуется

````php
// Объект заменяемого класса, это и есть мок
// __construct() __clone() не выполняются
// Все методы исходного класса возвращают null, без его вызова
//методы с правом доступа final, private, protected и static не могут быть подменены
$mock = $this->createMock(\Test\Original::class);

$mock->expects($this->any())->method('send')->with($this->equalTo('4'))->will($this->returnValue(false));
$mock->method('send')->willReturn(false);
````

## Фикстуры

Обобщенно - это настройка окружения для теста. Нужно для подготовительной работы для начала выполнения теста и окончания.
 
Метод `tearDown` - запускается перед `setUp`

Метод `setUp` - запускается перед тестом.

````php
class SolutionTest extends TestCase
{
    protected function setUp(): void
    {
        echo 'setUp';
    }

    protected function tearDown(): void
    {
        echo 'tearDown';
    }


    public function testSolution0()
    {
        echo 'testSolution0';
    }

    public function testSolution1()
    {
        echo 'testSolution1';
    }

    public function testSolution2()
    {
        echo 'testSolution2';
    }
}

// Результат получается такой
//tearDownsetUptestSolution0RtearDownsetUptestSolution2RtearDownsetUptestSolution1R
````

## Data Providers

Дата провайдеры - это такая штука, когда нужно прогнать несколько значений через один assert

Удобно тестировать например почтовые адреса

````php

<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

class SolutionTest extends TestCase
{

    public static function Solution(): array
    {
        return [
            [0, 0, 0],
            [0, 1, 1],
            [1, 0, 1],
            [1, 2, 3],
        ];
    }
    #[DataProvider('Solution')]
    public function testAdd(int $a, int $b, int $expected): void
    {
        $this->assertSame($expected, $a + $b);
    }
    
    // Если провайдер слишком большой можно вынести его в отдельный класс
    // Для каждого сета можно указать пояснение, так будет яснее какой тест не пройдет
    //'one' => [0, 0, 0],
    //'two' => [0, 1, 1],
    //'three' => [1, 0, 1],
    //'four' => [1, 2, 3],
}
````
