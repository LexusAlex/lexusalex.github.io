---
layout: note.njk
tags: notes
number : 5
title: Тестирование кода с помощью Phpunit
description: Как начать тестировать код у себя в проекте
date: 2021-01-02 23:50:00 +3
main_image: /assets/images/notes/5/main.png
gradient_image: /assets/images/notes/5/gradient.png
color: 996666
color_rgba: rgba(153, 102, 102, 10)
themes: php testing phpunit
---

Все мы в разной степени начинаем с ручного тестирования своего кода — это не плохо, 
но возникают ряд проблем.

## Проблемы ручного тестирования кода

- Отсутствие повторяемости. Одни и те же действия по выявлению ошибок нужно делать многократно (писать `print_r`, `var_dump` снова и снова), при этом нельзя точно сказать, что было протестировано, а что нет;
- Ручные тесты "долгие" - это значит что можно часами сидеть и не видеть ошибку;
- Невнимательность, человеческий фактор, не все было проверенно. Что-то было упущено из вида;
- Бесконечные правки. В одном месте поправили, сломалось в другом;
- Приходится постоянно проверять, что результат выполняемой программы соответствует ожидаемому. 
- При ручных проверках и большом проекте проверить весь функционал просто невозможно.

Справится с этими проблемами помогают автоматические тесты или как еще их называют unit тесты.

Тестирование — это процесс проверки одного элемента кода (например, отдельная функция или класс), в изоляции от остальной
части программы.

## Преимущества автоматических (unit) тестов

- Отладку кода можно сразу вести из тестов, без надобности писать перенаправления, заглушки, `exit()`, `var_dump()` и пр.;
- По тесту можно сразу понять как работает метод, функция, без лишних конструкций. ("Живая документация по коду");
- Помогают не допускать регрессии готового кода, то есть "новый" код не ломает существующий;
- Приучают писать маленькие методы и чистые функции, а не пихать всю логику в один метод, который сложно тестировать и поддерживать;
- Помогают в ходе написания теста понять, как писать менее связанный код;
- Автоматическая проверка избавляет разработчика от монотонной ручной проверки всего кода приложения;
- Разработка без страха. Править код становится комфортнее, мы уверены, что конкретная функция работает, а следовательно уверены за весь код;
- При правильном написании тестов скорость разработки быстрее чем без них.
- Запуск тестов - быстрая процедура позволяющая запускать их хоть после каждого изменения в коде.

## Каким должен быть unit тест

- Маленьким. Тест должен проверять только одно требование.
- Легко читаемым. При взгляде на код теста должно быть понятно что происходит.
- Повторяемым. При каждом запуске тест выдает одинаковый результат.
- При написании теста, в тестируемую функции нужно подставлять результат.
- Тест должен выполнятся в специальном тестовом окружении.
- Проверять все возможные исходы.

## Зависимости кода

Часто результат работы метода зависит от внешних факторов и взаимодействует с другими классами и системами.

Например для выполнения своей задачи функции нужен доступ к базе данных или к файлу на диске. 

Чтобы заменить базу данных или файл нужна некая заглушка или фейковый класс, который будет всегда возвращать
предсказуемый результат. Такие классы называют **стабами** от англ. `stub`. При попытке прочитать данные из
базы данных тесту возвращается готовый массив с данными, тем самым заменяя базу данных.

Еще один вид заглушек **моки** от англ. `mock`. Эти классы нужны чтобы, проверить что функция была вызвана с определенными
параметрами. 

Стабы и моки вместе называют фейками (fakes).

Для создания классов-заглушек нужно создать интерфейс или абстрактный класс и наследовать его от заменяемого класса.

Написание тестов очень сильно зависит от вашей от архитектуры проекта и связанности кода. В проектах с легаси кодом
написание тестов может занять месяцы.

## Смысл тестирования. Пример 1

Протестируем функцию `sum` без использования дополнительных библиотек.

Функция `sum` возвращает сумму переданного массива.

```php
<?php
function sum (array $numbers) : int {
    if (empty($numbers)) {
        return 0;
    } else {
        return array_sum($numbers);
    }
}
?>
```

Проверим результат написав два теста `testSumFive` и `testSumZero`.

```php
<?php
function testSumFive (int $sum) : bool {
    if ($sum === 5) {
        return true;
    }
    return false;
}

function testSumZero (int $sum) : bool {
    if ($sum == 0) {
        return true;
    }
    return false;
}

testSumFive(sum([1,3,1])); // true
testSumFive(sum([1,3,1,7])); // false
testSumZero(sum([0])); // true
?>
```

Тесты можно писать и так, но запускать и поддерживать их неудобно. 

Для этих целей будем использовать специальный фреймворк для написания тестов [phpunit](https://phpunit.de).

## Версии phpunit

Phpunit развивается без обратной совместимости со старыми версиями.
Версия phpunit напрямую зависит от версии php, которая установлена у вас на сервере.

В момент написания этой статьи (декабрь 2020) актуальными и поддерживаемыми являются версии phpunit 8 и 9.

Например если вы используете php 7.0, то будет использоваться версия phpunit 6 или phpunit 5. 
Если ваша версия php 5.3, то phpunit 4. Composer автоматически установит одну из этих версий.

[Поддерживаемые версии phpunit](https://phpunit.de/supported-versions.html)

> Важно учесть, то что если тесты написаны под phpunit 7, в phpunit версии 8 они могут просто
не запустится. При написании тестов придерживайтесь одной мажорной версии, тогда в будущем не будет проблем.

Список текущих версий и их поддержку удобно смотреть на сайте [https://packagist.org/packages/phpunit/phpunit](https://packagist.org/packages/phpunit/phpunit)

## Установка composer

Де-факто стандартным и предпочитаемым способом установки библиотек в php, является
установка через менеджер зависимостей [composer](https://getcomposer.org/).

Установить `composer` можно командой

```shell script
curl -sS https://getcomposer.org/installer | php -- --install-dir=/bin --filename=composer --quiet
```

## Установка phpunit

Тесты нужно запускать локально в dev окружении разработчика поэтому ставим phpunit в секцию `require-dev`

```shell script
composer require --dev phpunit/phpunit
```

После установки фреймворк добавиться в файл `composer.json`

```json
{
"require-dev": {
    "phpunit/phpunit": "^9.4"
  }
}
```

И станет доступна команда `./vendor/bin/phpunit`.

Но так запускать не удобно, поэтому добавим команду в `composer.json`
в секцию `scripts`

```json
{
"scripts": {
    "test": "phpunit --colors=always"
  }
}
```

Запускаем так `composer test`.

> На боевом сервере для того убрать `phpunit` из автозагрузки
  необходимо выполнить `composer update --no-dev` для запрета установки пакетов из секции `require-dev`.

Я для большего удобства использую `Makefile` для запуска `phpunit`.

Об утилите `make` подробнее можно узнать из материалов:

- [Утилита make: полезный универсальный инструмент программиста](https://www.youtube.com/watch?v=pK9mF5aK05Q)
- [Что такое Makefile и как начать его использовать](https://guides.hexlet.io/makefile-as-task-runner/)
- [Руководство по современному Make](https://ru.makefile.site/)

Если в проекте не используется composer, есть также альтернативный способ установки phpunit.

Нужно скачать phar архив и запустить его из указанного места.

~~~shell script
# скачать phar архив
wget -O phpunit https://phar.phpunit.de/phpunit-9.phar
# сделать фаил исполняемым
chmod +x phpunit
# запустить из указанного места
./phpunit
~~~

Если phpunit необходим глобально для всей системы можно переместить файл в директорию со всеми скриптами
`sudo mv phpunit /usr/local/bin/phpunit`. После этого команда `phpunit` будет доступна глобально.

Проверка последней версии phpunit.

```shell script
phpunit --check-version
PHPUnit 9.4.3 by Sebastian Bergmann and contributors.
You are using the latest version of PHPUnit.
```

## Соглашения по написанию тестов

Не существует однозначных правил по написанию тестов, но есть общие рекомендации, которых желательно придерживаться

- Необязательно, но принято исходный код приложения размещать в каталоге `/src`, а тесты в каталоге `/tests`.
- Тестовые классы следует наследовать от класса `PHPUnit\Framework\TestCase`.
- Тестовый класс следует именовать с постфиксом `*Test` например `/tests/UserTest.php`.
- Один класс проекта соответствует одному тестовому классу, но не всегда. Это зависит от связей между классами и архитектуры проекта.
- Методы тестирования должны быть публичными и иметь префикс `test*` например `testLogin` или `testAdmin`.
- В док блоке теста можно использовать аннотацию `@test`.
- Каждый метод тестирования должен запускаться независимо от других, то есть должен быть изолирован.
- Для проверок соответствия реального и ожидаемого результата используются функции утверждения `assert*()` например `assertTrue()`.
- Лучше на начальном этапе ставить меньше проверок, только так можно понять какие проверки нужно добавить в будущем.
- Можно придерживаться общего принципа написания тестов такого как "Подготовка Действие Утверждение".

### Примеры именования тестовых методов

```text
testLogMessage
testLogMessageWithEmptyMessage
testLogMessageWithEmptyMessageAndEmtyContext
testLogMessageWithInvalidContext
```

## Как запускать

Итак `phpunit` установлен, настало время запустить наши тесты.

Для запуска тестов необходимо указать директорию или название файлов которые необходимо запустить, например:

```shell script
composer phpunit tests
composer phpunit tests/DummyTest
composer phpunit tests/DummyTest.php
```

Далее будет произведен поиск класса теста, затем будут выполнены тестовые методы этого класса.

Но по-файлово запускать неудобно, поэтому добавим конфигурацию.

## Конфигурация

Создадим файл конфигурации `phpunit.xml` в корне проекта c настройками по умолчанию.

Проще всего это сделать выполнив команду.

```shell script
composer phpunit --generate-configuration
```

Будет сгенерирован xml файл конфигурации:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="https://schema.phpunit.de/9.4/phpunit.xsd"
         bootstrap="vendor/autoload.php"
         cacheResultFile="var/cache/.phpunit.result.cache"
         executionOrder="depends,defects"
         forceCoversAnnotation="true"
         beStrictAboutCoversAnnotation="true"
         beStrictAboutOutputDuringTests="true"
         beStrictAboutTodoAnnotatedTests="true"
         failOnRisky="true"
         failOnWarning="true"
         verbose="true">
    <testsuites>
        <testsuite name="default">
            <directory suffix="Test.php">tests</directory>
        </testsuite>
    </testsuites>
    <coverage cacheDirectory="var/cache/.phpunit.code-coverage" processUncoveredFiles="true">
        <include>
            <directory suffix=".php">src</directory>
        </include>
    </coverage>
</phpunit>
```

Описание параметров можно найти в [документации](https://phpunit.readthedocs.io/en/9.3/configuration.html)

## Phpunit. Пример 2

Теперь перепишем пример 1 с использованием phpunit. Для этого создадим класс приложения `/src/Application.php` с единственным методом `sum`

```php
<?php

declare(strict_types=1);

namespace Application;

class Application
{
    public function sum (array $numbers) : int {
        if (empty($numbers)) {
            return 0;
        } else {
            return array_sum($numbers);
        }
    }
}
```
Для большего удобства в директории `/tests` создадим абстрактный класс `/tests/AbstractTestCase.php` который наследуем от класса фреймворка `PHPUnit\Framework\TestCase` и
определим метод `setUp`, в нем создадим объект нашего приложения.

> Метод setUp будет запускаться каждый раз при выполнении тестового метода

```php
<?php

declare(strict_types=1);

namespace Tests;

use Application\Application;
use PHPUnit\Framework\TestCase;

abstract class AbstractTestCase extends TestCase
{
    public Application $application;

    protected function setUp(): void
    {
        $this->application = new Application();
        parent::setUp();
    }
}
```

Теперь добавим непосредственного тестовый класс `/tests/ApplicationTest` который в свою очередь наследуем от `AbstractTestCase`,
где будут два тестовых метода с двумя утверждениями.

```php
<?php

declare(strict_types=1);

namespace Tests;

class ApplicationTest extends AbstractTestCase
{
    public function testSumFive ()
    {
        $this->assertEquals(5, $this->application->sum([1,3,1]), 'сумма элементов массива не соответствует 5');
    }

    public function testSumZero ()
    {
        $this->assertEquals(0, $this->application->sum([]));
    }
}
```

Запускаем тесты

```shell script
composer test

PHPUnit 9.4.3 by Sebastian Bergmann and contributors.

Runtime:       PHP 7.4.12
Configuration: /template/phpunit.xml

..                                                                  2 / 2 (100%)

Time: 00:00.002, Memory: 6.00 MB

OK (2 tests, 2 assertions)
```

Две точки в выводе означают что два наших теста успешно прошли.

Теперь представим что наша функция `sum` работает неправильно.

```shell script
$ composer test

PHPUnit 9.4.3 by Sebastian Bergmann and contributors.

Runtime:       PHP 7.4.12
Configuration: /template/phpunit.xml

.F                                                                  2 / 2 (100%)

Time: 00:00.003, Memory: 6.00 MB

There was 1 failure:

1) Tests\ApplicationTest::testSumFive
сумма элементов массива не соответствует 5
Failed asserting that 25 matches expected 5.

/template/tests/ApplicationTest.php:11

FAILURES!
Tests: 2, Assertions: 2, Failures: 1.
```

Получаем ошибку (буква `F`, значит второй тест), где прекрасно видно в каком файле и какой тест упал и что конкретно произошло. 

### Вывод тестов

Теперь разберем вывод тестов, какие обозначения могут быть.

- `W` - В классе не найдены тестовые методы.

```shell script
WW                                                                  2 / 2 (100%)
Warning
No tests found in class "Tests\Application2Test".
WARNINGS!
Tests: 2, Assertions: 0, Warnings: 2.
```

- `.` - Тест пройден успешно

```shell script
..                                                                  2 / 2 (100%)
OK (2 tests, 2 assertions)
```

- `F` - Тест не пройден, выводится информация почему тест не прошел.

```shell script
.F                                                                  2 / 2 (100%)
1) Tests\ApplicationTest::testSumFive
сумма элементов массива не соответствует 5
Failed asserting that 25 matches expected 5.

/template/tests/ApplicationTest.php:11

FAILURES!
Tests: 2, Assertions: 2, Failures: 1.
```

- `R` - Тест не содержит утверждений (функции asert...) и будет пропущен.

```shell script
RR                                                                  2 / 2 (100%)
1) Tests\ApplicationTest::testSumZero
This test did not perform any assertions

/template/tests/ApplicationTest.php:14

2) Tests\ApplicationTest::testSumFive
This test did not perform any assertions

/template/tests/ApplicationTest.php:9

OK, but incomplete, skipped, or risky tests!
Tests: 2, Assertions: 0, Risky: 2.
```

- `E` - Произошла синтаксическая ошибка во время запуска теста. При этом подробно указано в каком файле это произошло.

```shell script
EE                                                                  2 / 2 (100%)
1) Tests\ApplicationTest::testSumFive
ParseError: syntax error, unexpected '3232' (T_LNUMBER)

/template/src/Application.php:17
/template/tests/AbstractTestCase.php:16

2) Tests\ApplicationTest::testSumZero
ParseError: syntax error, unexpected '3232' (T_LNUMBER)

/template/src/Application.php:17
/template/tests/AbstractTestCase.php:16

ERRORS!
Tests: 2, Assertions: 0, Errors: 2.
```

- `I` - Не полный или незавершенный тест. Если тест не дописан необходимо вызвать метод `$this->markTestIncomplete('Этот тест ещё не реализован.');`
```shell script
.I                                                                  2 / 2 (100%)

1) Tests\ApplicationTest::testSumFive
Этот тест ещё не реализован.

/template/tests/ApplicationTest.php:13

OK, but incomplete, skipped, or risky tests!
Tests: 2, Assertions: 1, Incomplete: 1.
```

- `S` - Тест был отмечен как пропущенный. Необходимо вызвать метод `$this->markTestSkipped('Этот тест пропущен');`

```shell script
.S                                                                  2 / 2 (100%)

1) Tests\ApplicationTest::testSumFive
Этот тест пропущен

/template/tests/ApplicationTest.php:13

OK, but incomplete, skipped, or risky tests!
Tests: 2, Assertions: 2, Skipped: 1.
```

## Утверждения

Для проверки значений как мы видели выше в phpunit используются [утверждения](https://phpunit.readthedocs.io/en/latest/assertions.html#)

Самые часто используемые из них:

```php
$this->assertContains(4, [1, 2, 3,]); // содержит массив указанное значение
$this->assertStringContainsString('тест', 'нетест'); // содержит строка подстроку
$this->assertCount(0, []); // количество элементов в массиве
$this->assertEmpty(['foo']); // является ли значение пустым
$this->assertEquals(1, 0); // эквивалентность значений
$this->assertFalse(true); // логическая операция
$this->assertGreaterThan(2, 1); // больше чем
$this->assertIsArray(null); // значение должно быть массивом
$this->assertObjectHasAttribute('foo', new stdClass); // содержит ли класс атрибут
```

> Практически все методы утверждения содержат противоположные методы
> Например assertContains() и assertNotContains()

## Провайдеры данных

Бывают ситуации, когда нужно проверить сразу несколько значений. Для этих целей существуют дата провайдеры.

Дата провайдер - это метод или методы, который возвращает набор данных для проверки в тесте.

Напишем тест, например для проверки по регулярному выражению.

## Провайдеры данных. Пример 3

Создадим метод `Values()`, который будет использоваться в качестве провайдера данных и тестовый метод `testValidValues()`, в котором укажем аннотацию `@dataProvider`.

Он будет принимать произвольное количество аргументов.

Для каждого элемента массива из метода `Values()` будет вызываться метод `testValidValues()`.

В массиве первый элемент проверяемое значение регулярного выражения, второй элемент результат который должна выдать функция 
`preg_match`.

```php
<?php

declare(strict_types=1);

namespace Tests;

class ApplicationTest extends AbstractTestCase
{
    /**
     * @param $value
     * @param $expected
     * @dataProvider Values
     */
    public function testValidValues($value, $expected){

        $pattern = '/^[a-f0-9_-]{2,6}$/i';

        $this->assertEquals($expected, preg_match($pattern,$value));
    }

    public function Values() {
        return [
            ['ab12',1],
            ['',0],
            ['--_09f',1],
            ['1',0],
            ['123456789',0],
            ['русские буквы',0],
            ['aBcDeF',1],
        ];
    }
}
```

Запускаем тесты

```shell script
 phpunit
PHPUnit 9.4.3 by Sebastian Bergmann and contributors.

Runtime:       PHP 7.4.12
Configuration: /template/phpunit.xml

.......                                                             7 / 7 (100%)

Time: 00:00.003, Memory: 6.00 MB

OK (7 tests, 7 assertions)
```

Как видим были выполнены 7 проверок, вместо того чтобы писать 7 тестовых методов.

## Зависимые тесты. Пример 4

PhpUnit позволяет писать зависимые тесты друг от друга. Посмотрим на пример.

```php
<?php

declare(strict_types=1);

namespace Tests;

class ArrayTest extends AbstractTestCase
{
    public function testOne() {
        $array = [];
        $this->assertCount(0, $array);
        return $array;
    }

    /**
     * @param array $array
     * @depends testTwo
     */
    public function testThree(array $array) {
        $array[] = 6;
        $this->assertCount(6, $array);
    }

    /**
     * @param array $array
     * @depends testOne
     * @return int[]
     */
    public function testTwo(array $array) {
        $array = [1,2,3,4,5];
        $this->assertCount(5, $array);
        return $array;
    }
}
```

Метод `testOne` возвращает фикстуру `array` в данном случае это пустой массив. 

Далее выполняется тест `testTwo` так как, он зависит от `testOne` с аннотацией `@depends testOne` и тоже возвращает фикстуру. 
Последним будет выполнен зависимый тест `testThree`, который работает с возвращенной ранее фикстурой.

## Фикстуры

Одной из наиболее трудозатратных частей при написании тестов является написание кода для настройки тестового окружения.

Для этого нужно создать некий объект эмулирующий объект проверки до выполнения теста, и возврат его в исходное состояние после выполнения теста.

Это состояние называется фикстурой теста.

В примере 4 мы посмотрели как запускать зависимые тесты путем возврата фикстуры `array`. 
В данном случае — это был пустой массив, но в реальности все может быть намного сложнее. Перепишем этот пример следующем образом.

## setUp и tearDown. Пример 5

> Встроенные методы setUp(): void и tearDown(): void вызываются по одному разу при каждом выполнении тестового метода

```php
<?php

declare(strict_types=1);

namespace Tests;

class ArrayTest extends AbstractTestCase
{
    protected array $array;

    public function setUp(): void
    {
        $this->array = [];
        parent::setUp(); // TODO: Change the autogenerated stub
    }

    public function tearDown(): void
    {
        unset($this->array);
        parent::tearDown(); // TODO: Change the autogenerated stub
    }

    public function testOne() {
        $this->assertCount(0, $this->array);
    }

    public function testTwo() {
        $this->array = [1,2,3,4,5];
        $this->assertCount(5, $this->array);
    }

}

```

Помимо `setUp()` и `tearDown()` существуют так же и другие встроенные методы, которые можно использовать в зависимости от ситуации.

```text
setUpBeforeClass() // вызывается перед запуском первого теста текущего тестового класса
tearDownAfterClass() // вызывается после выполнения последнего теста текущего тестового класса
assertPreConditions() // перед выполнением тестового метода
assertPostConditions() // после выполнения тестового метода
onNotSuccessfulTest() // Будет выполнен если тест был провален
```

Например сли у нас в классе два тестовых метода `testOne()` и `testTwo()`, то при наличии всех выше написанных методов порядок выполнения будет таким:

- setUpBeforeClass()
- setUp()
- assertPreConditions()
- testOne()
- assertPostConditions()
- tearDown()
- setUp()
- assertPreConditions()
- testTwo()
- assertPostConditions()
- tearDown()
- tearDownAfterClass()

> Если тест не пройдет, то метод `assertPostConditions()` вызван не будет, впоследствии будет вызван метод `onNotSuccessfulTest`

## Классы-заглушки

При тестировании больших систем не всегда представляется возможным использовать реальный компонент приложения.

PhpUnit позволяет заменить зависимый компонент классом-заглушкой, который должен имитировать поведение реального
компонента приложения.

### Имитация реального приложения. Пример 6

```php

<?php
// tests/fakes/FakeClass.php

declare(strict_types=1);

namespace Tests\fakes;

class FakeClass
{
    public function fake()
    {
        return 'Это заглушка для реального метода';
    }
}

// tests/StubTest.php

namespace Tests;

use Tests\fakes\FakeClass;

class StubTest extends AbstractTestCase
{
    public function testStub()
    {
        $stub = $this->createMock(FakeClass::class);
        $stub->method('fake')->willReturn('test');
        $this->assertSame('test', $stub->fake());
    }
}
```

В реальности для написания класса-заглушки может понадобится не одна неделя, все зависит от архитектуры вашего приложения.

Подробнее об [моках и стабах](https://phpunit.readthedocs.io/en/9.5/test-doubles.html)

## Покрытие кода

Каждый метод (функция) должны быть покрыты тестами для всех возможных вариантов выполнения метода (функции).

PhpUnit позволяет формировать отчет о покрытии кода тестами в различных форматах.

>> Для формировании отчета о покрытии кода тестами на сервере должен быть установлен расширение XDEBUG

Для создания анализа покрытие нужно выполнить команду 

```shell
XDEBUG_MODE=coverage composer phpunit --coverage-html var/test/coverage
```

В данном случае в директории `var/test/coverage` будут созданы html файлы с отчетом, где отображено покрытие кода.

<figure>
  <img src="/assets/images/notes/5/phpunit-coverage.png" alt="Phpunit - покрытие кода"  data-action="zoom">
</figure>

## Полезные Ссылки

- [Официальный сайт](https://phpunit.de)
- [Документация](https://phpunit.readthedocs.io/en/9.5/)
- [Статья про тестирование](https://ru.hexlet.io/blog/posts/how-to-test-code)
- [Еще статья про тестирвоание](https://gist.github.com/codedokode/a455bde7d0748c0a351a)
