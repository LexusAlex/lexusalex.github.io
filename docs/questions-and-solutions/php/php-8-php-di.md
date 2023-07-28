---
layout: default
nav_order: 8
permalink: php-8-php-di
title: Php di
parent: php
grand_parent: Вопросы и решения
has_children: true
description: Исследование работы контейнеров для внедрения зависимостей на примере php-di
date: 2023-07-24 21:00:00 +3
last_modified_date: 2023-07-28 16:00:00 +3
tags:
- php
- questions-and-solutions
---

# Php di
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

Контейнер занимается инициализацией приложения, собирает объекты и прокидывает их друг в друга.
В идеальном контейнере прикладной код должен видеть объекты которые он ждет, а не видеть весь контейнер.

## Установка

````shell
# Стандартная через composer
composer require php-di/php-di
````

## Базовое использование

````php

// Допустим у нас в системе есть два класса Db и User
class Db
{
    public function createDbConnection(): int
    {
        return 123;
    }
}

class User
{
    public $db;
    public function __construct(Db $db)
    {
        $this->db = $db;
    }
}

// В конструкторе класса User у нас есть зависимость класс db
// Теперь создаем контейнер
$builder = new ContainerBuilder();
$builder->build();
// Так как у нас эти классы доступны прямо здесь
// Мы можем просто получить объект класса User и все его зависимости
$user = $container->get('User');
// Можем пользоваться объектом
$user->db->createDbConnection()
````

## Карта значений

Автоматическое разрешение зависимостей это хорошо, но как нам самим определить список классов.

PHP-di умеет загружать нашу "карту" классов и использовать ее как инструкцию по созданию объектов.

Важным плюсом использования является, то что объекты будут создаваться только тогда, когда они запрашиваются из контейнера.

Посмотрим в каком виде значения можно передавать

````php
<?php

$builder = new \DI\ContainerBuilder();
// Добавляем зависимости
// Но так делать неправильно, так как объявления в таком виде вызываются сразу
$builder->addDefinitions([
    'value' => 'item value',
    'value array' => [
        'one' => [],
        'two' => []
    ],
    'stdClass' => new StdClass(),
]);

$container = $builder->build();
// Использование
$container->get('stdClass')

// Как же все таки нужно определять зависимости
class Test
{
    public function testfunc()
    {
        return __CLASS__;
    }
}

$builder = new \DI\ContainerBuilder();
$builder->addDefinitions([
    // Просто объявляем зависимость, возвращать можем что угодно
    'Test1' => function (\Psr\Container\ContainerInterface $container) {
        return 123;
    },
    // Используем для этого фабрику из DI
    'Test2' => DI\Factory(function (\Psr\Container\ContainerInterface $container) {
        return 657;
    }),

    // Объявляем зависимость
    'TestClass' => function () {
        return new Test();
    },
    // Создаем класс с помощью create
    'Test' => DI\create('Test'),

    // Используем зависимость напрямую
    'Test4' => function(Test $test){
        return $test->testfunc();
    },
    // Используем зависимость через контейнер
    'Test3' => function (\Psr\Container\ContainerInterface $container){
        return $container->get('TestClass')->testfunc();
    },
    // Алиас для теста
    'Test5' => DI\get('Test'),
    // Получаем переменную окружения
    'Test6' => DI\env('APPLICATION_ENVIRONMENT'),
    // Можно вернуть массив объектов созданных из контейнера, например так
    'Test7' => [
        DI\get('Test'),
        DI\get('Test'),
    ]
]);

$container = $builder->build();
// Используем
$container->get('Test7');
````