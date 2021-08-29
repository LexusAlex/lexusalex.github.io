---
layout: default
nav_order: 12
permalink: 12-php-interfaces-abstract-classes
title: Интерфейсы и абстрактные классы в php
description: Интерфейсы и абстрактные классы в php. Что это, и как с ними работать.
date: 2021-01-30 22:00:00 +3
parent: Заметки
tags:
- php
---

# Интерфейсы и абстрактные классы в php
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

## Что такое интерфейс

Интерфейс — это конструкция языка содержащая сигнатуры публичных методов без их реализации.

Интерфейс, как и класс пишут в отдельном файле.

Для объявления интерфейса используется ключевое слово `interface`. Так же принято его указывать в названии интерфейса.

Примеры названий интерфейса:

- `ContainerApplicationInterface`
- `StatementInterface`
- `NodeTraverserInterface`
- `WrappableOutputFormatterInterface`

```php
<?php

// Пример 1

interface BuildNodeInterface
{
    public function getNode($id) : Node;
}
```

## Реализация интерфейса

Интерфейс может содержать только публичные методы и публичные константы.

```php
<?php

// Пример 2

interface TestInterface
{
    public const CONSTANT = 1; // использование снаружи BuildNodeInterface::CONSTANT
    public function __construct();
    public function getMethodOne(int $id);
    public function getMethodTwo(string $name);
}
```


С точки зрения прикладного кода недостаточно просто создать интерфейс.
Отдельно, в нем нет смысла. Интерфейс необходимо **реализовать** с помощью ключевого слова `implements`.

Для реализации, необходимо в классе, который реализует интерфейс переопределить все методы описанные в интерфейсе.
Необходимо учесть, что сигнатура функции при этом должна совпадать.

_Константу нельзя переопределить в реализующих классах._

В примере 3 мы реализуем интерфейс `TestInterface`

```php
<?php

// Пример 3 . Интерфейс TestInterface объявлен в примере 2

class RealizableClass implements TestInterface {

    public function __construct()
    {
    }

    public function getMethodOne(int $id)
    {
        // TODO: Implement getMethodOne() method.
    }

    public function getMethodTwo(string $name)
    {
        // TODO: Implement getMethodTwo() method.
    }
}
```

## Наследование интерфейсов

Интерфейс может наследоваться от нескольких других интерфейсов. В добавок к тому класс может реализовывать несколько интерфейсов.

Например объявим три интерфейса. Четвертый `FourInterface` будет наследовать три.

А класс `Realizable` будет реализовывать интерфейсы `FourInterface` и `\Countable`.


_Интерфейс \Countable встроенный интерфейс в сам язык и нужен для подсчета элементов._

```php

// Пример 4

interface OneInterface
{
    public function One(array $array = []) : array;
}

interface TwoInterface
{
    public function Two(int $integer) : int;
}

interface ThreeInterface
{
    public function Three(string $integer) : int;
}

interface FourInterface extends OneInterface,TwoInterface,ThreeInterface
{
    // Здесь мы дополняем сигнатуру метода One
    public function One(array $array = [], int $integer = 1) : array;
}

class Realizable implements FourInterface, \Countable
{

    public function Two(int $integer): int
    {
        // TODO: Implement Two() method.
    }

    public function Three(string $integer): int
    {
        // TODO: Implement Three() method.
    }

    public function One(array $array = [], int $integer = 1): array
    {
        // TODO: Implement One() method.
    }

    public function count(): int
    {
        // TODO: Implement count() method.
    }
}
```

Возможно так же использовать интерфейс в сигнатурах функций и методов, как показано в примере 5.

```php
<?php

// Пример 5

function test(FourInterface $four): string
{
    return 'test';
}

$obj = new Realizable(); // класс этого объекта должен реализовывать FourInterface

echo test($obj); // test
```

Запись интерфейса в параметрах функции, а не класса позволяет завязываться на интерфейс, что делает программу гибче.

С наследованием интерфейсов можно запутаться, главное придерживаться принципа интерфейс нужен для спецификации типа, то есть
для того, что он может, а не наоборот.

## Где нужны интерфейсы

К примеру для реализации стандарта [PSR-7](https://www.php-fig.org/psr/psr-7/) нужно реализовать интерфейсы:

- `ServerRequestInterface`
- `ResponseInterface`

Реализацию данных интерфейсов можно увидеть во многих фреймворках, например в slim:

- [ServerRequestInterface](https://github.com/slimphp/Slim-Psr7/blob/master/src/Request.php)
- [ResponseInterface](https://github.com/slimphp/Slim-Psr7/blob/master/src/Response.php)

Мы можем без проблем менять одну библиотеку на другую совместимую с PSR-7.

Интерфейс лучше добавлять тогда, когда он нужен.

Задача. Нужно преобразовать строку к нужным переводам строк в разных операционных системах.

Здесь может помочь интерфейс.

```php
<?php

// Пример 6

interface LineInterface
{
    public function createWrite(string $line) : string;
}

class WinWrite implements LineInterface
{

    public function createWrite(string $line): string
    {
        return $line . "\r\n";
    }
}

class UnixWrite implements LineInterface
{

    public function createWrite(string $line): string
    {
        return $line . "\n";
    }
}
```

Теперь при добавлении другой операционной системой достаточно создать новый класс и реализовать там интерфейс `LineInterface`


_Для решения данной задачи лучше подойдет константа `PHP_EOL`._

_Когда нужно использовать интерфейс — это уже зависит от конкретной ситуации и понимание этого момента придёт с опытом и практикой._

## Что такое абстрактный класс

Теперь попытаемся понять для чего нужен абстрактный класс в php.

Напишем компонент логирования.

```php

// Пример 7

interface LogInterface
{
    public function __construct($options); // Настроить объект значениями
    public function get($key); // Получить значение лога
    public function set($key, $value); // Положить значение в лог
}

abstract class Log implements LogInterface
{
    protected array $options;

    public function __construct($options)
    {
        $this->options = $options;
        $this->write();
    }
    // Общая реализация для всех потомков
    abstract protected function write();
}

// Конкретные реализации

class FileLog extends Log
{

    public function get($key)
    {
        // TODO: Implement get() method.
    }

    public function set($key, $value)
    {
        // TODO: Implement set() method.
    }

    protected function write()
    {
        // TODO: Implement write() method.
    }
}

class DBLog extends Log
{

    public function get($key)
    {
        // TODO: Implement get() method.
    }

    public function set($key, $value)
    {
        // TODO: Implement set() method.
    }

    protected function write()
    {
        // TODO: Implement write() method.
    }
}
```

Имеем `LogInterface` в котором определен конструктор и методы `get` и `set`, которые работают с коллекцией логов.
Логи могут храниться в разных хранилищах, и их нужно куда-то записывать.
Создадим вспомогательный класс `Log` и сделаем его абстрактным.

Добавим конструктор, который будет наделять наш объект специфичными для класса потомка опциями, Так же вызовем метод `write`.

> От абстрактного класса нельзя создать объект, его методы нужно переопределить в классе наследнике

Метод `write` является общим, его и нужно переопределять в классе наследнике.

Теперь куда бы мы не писали логи, для этого достаточно создать класс и переопределить в нем методы `get`, `set`, `write`.

Итак, типичное использование абстрактных классов это уменьшение дублирования кода, при появлении общих методов.
Просто выносим общую логику в абстрактный метод.

> Абстрактный класс может полностью не реализовывать все методы интерфейса,
> тогда определения методов из интерфейса становятся абстрактными методами в этом классе, и должны быть переопределены в
> классе наследнике.

## Особенности абстрактного класса

- Технически абстрактный класс может не содержать абстрактных методов.
- В отличие от интерфейса в абстрактном классе для части методов можно написать реализацию.
- Никто не мешает использовать абстрактные классы вместо интерфейсов, все зависит от задачи.
- Абстрактный класс не имеет никакого отношения к ООП. Это способ распространения кода в вашей иерархии кода.

## Итог

Итак, интерфейс — это контракт, который содержит сигнатуры методов без их реализации.

Абстрактный класс содержит "очень" общую логику для всех классов потомков, что сокращает дублирование кода.