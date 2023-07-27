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
last_modified_date: 2023-07-27 17:00:00 +3
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

TODO