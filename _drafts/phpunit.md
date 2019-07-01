---
layout: post
title: Библиотеки php : phpunit
permalink: php-phpunit
tags: phpunit php
comments: true
subtitle: Как начать использовать phpunit у себя в проекте
summary:  Как начать использовать phpunit у себя в проекте
cover_url: "/images/jekyll/jekyll.jpg"
is_navigate: true
---

## Что это

[phpunit](https://phpunit.de) - это фреймворк для написания юнит тестов

Юнит тестирование позволяет проверить проект на работоспособность.

При этом тесты дают ряд преимуществ :
- При написании нового функционала тесты помогают сохранить в рабочем состоянии существующий код
- Проверить работоспособность проекта можно буквально запуском одной команды
- Автоматизированные тесты приучают к декомпозиции задачи

## Установка

В настоящее время (июнь 2019) поддерживаются две версии phpunit 7 и 8, 
но доступны и более [старые версии](https://phpunit.de/supported-versions.html).

Какую версию устанавливать зависит от используемой у вас на сервере версии php.

Важно учесть, то что к примеру если тесты написаны под phpunit 7, в 8 версии они могут
не запустится. Смотрите документацию.

В 2019 году де факто стандартным и предпочитаемым способом установки библиотек, является
установка через пакетный менеджер [composer](https://getcomposer.org/).

Добавляем phpunit в секцию `require-dev`

~~~bash
composer require --dev phpunit/phpunit ^8
~~~

Соответственно phpunit нужно запускать только в dev окружении проекта
На боевом сервере выполнить `composer update --no-dev` для запрета установки пакетов из секции `require-dev`

~~~bash
./vendor/bin/phpunit --version # проверим установленную версию phpunit
PHPUnit 8.2.3 by Sebastian Bergmann and contributors.

./vendor/bin/phpunit --check-version # проверка c предупреждением что установлена не последняя версия фреймворка
PHPUnit 8.2.2 by Sebastian Bergmann and contributors.

You are not using the latest version of PHPUnit.
The latest version is PHPUnit 8.2.3.
~~~

Существует еще также альтернативный способ установки phpunit, если не установлен менеджер пакетов composer

~~~bash
# скачать phar архив
wget -O phpunit https://phar.phpunit.de/phpunit-8.phar
# сделать фаил исполняемым
chmod +x phpunit
# запустить из указанного места
./phpunit
~~~

Можно установить глобально для всей системы переместив файл командой 
`sudo mv phpunit /usr/local/bin/phpunit` теперь команда phpunit будет доступна глобально

## Соглашения по написанию тестов

Не существует однозначных правил по написанию тестов, но есть общие рекомендации.

- Необязательно, но принято исходный код приложения размещать в каталоге `/src`, а тесты в каталоге `/tests`
- Тестовые классы следует наследовать от `PHPUnit\Framework\TestCase`
- Тестовый класс следует именовать с постфиксом `*Test` например `/tests/UserTest.php`
- Один класс проекта соответствует одному тестовому классу, но не всегда
- Методы тестирования должны быть публичными и иметь префикс `test*` например `testLogin` или `testAdmin`
- В док блоке теста можно использовать аннотацию `@test`
- Каждый метод тестирования должен запускаться независимо от других, то есть быть изолирован
- Для проверок соответсвия реального и ожидаемого результата используются функции утверждения `assert*()` например `assertTrue()`
- Тестировать нужно в сторону увеличения зависимостей кода
- Лучше на начальном этапе ставить меньше проверок, только так можно понять где нужно добавить еще проверок

## Как запускать

Утилита командной строки 

## Настройки

## Принципы тестирования


## Полезные Ссылки

https://phpunit.de/supported-versions.html
https://phpunit.de/getting-started/phpunit-8.html
https://www.alexeykopytko.com/2016/phpunit/
https://phpunit.readthedocs.io/ru/latest/index.html
http://volter9.github.io/blog/unit-testing/
https://russianpenguin.ru/%d1%82%d0%b5%d1%81%d1%82%d0%b8%d1%80%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b5-%d0%bf%d0%be/
https://gist.github.com/codedokode/a455bde7d0748c0a351a
https://waredom.ru/196#intro

https://medium.com/nuances-of-programming/%D0%B1%D0%B5%D1%80%D0%B5%D0%B6%D0%BB%D0%B8%D0%B2%D0%BE%D0%B5-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B8%D0%BB%D0%B8-%D0%BF%D0%BE%D1%87%D0%B5%D0%BC%D1%83-%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D1%82%D0%B5%D1%81%D1%82%D1%8B-%D1%85%D1%83%D0%B6%D0%B5-%D1%87%D0%B5%D0%BC-%D0%B2%D1%8B-%D0%B4%D1%83%D0%BC%D0%B0%D0%B5%D1%82%D0%B5-24670e16ab0
https://www.youtube.com/watch?v=zsz8kdi62mE
