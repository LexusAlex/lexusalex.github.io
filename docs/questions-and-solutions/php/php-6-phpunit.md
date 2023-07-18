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
last_modified_date: 2023-07-18 15:00:00 +3
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

Вводная про unit тестирование [https://lexusalex.ru/5-php-phpunit](https://lexusalex.ru/5-php-phpunit)

Запускать phpunit можно с ключами, что менее удобно, гораздо удобнее создать конфигурационный файл `phpunit.xml` 

```shell
# Установка
composer require --dev phpunit/phpunit
# Проверка версии
./vendor/bin/phpunit --version # PHPUnit 10.2.6 by Sebastian Bergmann and contributors.
# Генерирование конфига
./vendor/bin/phpunit --generate-configuration
# Указание конфигурационного файла
./vendor/bin/phpunit --colors=always --configuration=etc/phpunit.xml
```

## XML Configuration

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

Тесты это что - это код, который проверяет другой код

````php
// Тест для проверок
<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

// Название класса совпадает с названием файла
// Фаил с приставкой *Test
class SolutionTest extends TestCase
{
    // Tестовый метод называется с приставкой test*
    // Обычно один метод проверяет один case
    public function testSolution1()
    {
        // Утверждение
        $this->assertSame('1234','1234');
        // Тестировать утверждения можно так
        $this->expectException(InvalidArgumentException::class);
        // Здесь код, который выбросит исключение
        throw new \InvalidArgumentException();
    }
    
    // Дата провайдеры - это такая штука, когда нужно прогнать несколько значений через один assert
    // Удобно тестировать например почтовые адреса 
    public static function Solution2(): array
    {
        return [
            [0, 0, 0],
            [0, 1, 1],
            [1, 0, 1],
            [1, 2, 3],
        ];
    }
    #[DataProvider('Solution2')]
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
    
    public function testSolution3()
    {
        // Можно проверить, то что в поток вывода печатается строка, следующим образом
        $this->expectOutputString('bar');
        echo 'bar';
    }
    
    // Если в тесте ничего нет, он считается незавершенным
    public function testSolution4()
    {

    }
    
    // Этим можно управлять указав, что тест незавершенный
    $this->markTestIncomplete('Завершу позже'); // I
    
    // Тест можно пропускать, при каких - то условиях
    public function testSolution5()
    {
        self::assertTrue(true);
        self::assertTrue(true);
        self::assertTrue(true);
        self::assertTrue(true);
        $this->markTestSkipped('Пропускаю'); // S
    }
    
    // Тесты могут быть зависимы друг от друга, хоть это не приветствуется
}
````

TODO