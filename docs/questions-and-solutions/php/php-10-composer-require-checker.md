---
layout: default
nav_order: 10
permalink: php-10-composer-require-checker
title: Composer Require Checker
parent: php
grand_parent: Вопросы и решения
has_children: true
description: Инструмент для выявления транзитивных зависимостей
date: 2023-10-13 12:00:00 +3
last_modified_date: 2023-10-13 12:00:00 +3
tags:
- php
- questions-and-solutions
---

# Composer Require Checker
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

Composer Require Checker нужен для выявления транзитивных зависимостей. Это такие зависимости которые явно не указаны в 
`composer.json`, но указаны в зависимых пакетах и поэтому ставятся к нам в проект.

Если в зависимом у нас пакете пропадет этот пакет, то у нас сломается так-как мы завязаны на ней.

Что может библиотека: 

- Выявлять транзитивные зависимости
- Выявлять необъявленные php расширения

Установка стандартная как и любой другой composer пакет

```shell
composer --dev require maglnet/composer-require-checker
```

Запустить можно как и другой любой исполняемый скрипт

 ```shell
php vendor/bin/composer-require-checker check
```

Так же есть возможность задать конфигурационный фаил, примерно такого вида:

````json
{
  "symbol-whitelist": [
    "PHPUnit\\Framework\\TestCase",
    "Psr\\Http\\Message\\ResponseInterface",
    "Psr\\Http\\Message\\ServerRequestInterface",
    "Psr\\Http\\Server\\RequestHandlerInterface"
  ],
  "php-core-extensions": [
    "Core",
    "json",
    "SPL",
    "standard"
  ],
  "scan-files": []
}
````

После этого вызвать, указав путь к файлу;

````shell
composer-require-checker check --config-file=etc/composer-require-checker.json
````

В результате будет выведена таблица, где показано, что нужно поправить.

[Страница библиотеки на github](https://github.com/maglnet/ComposerRequireChecker)




