---
layout: default
nav_order: 1
permalink: php-1-library-php-cs-fixer
title: Что такое php-cs-fixer и как его использовать
parent: php
grand_parent: Вопросы и решения
has_children: true
description: Как проверять код с помощью php-cs-fixer
date: 2023-05-21 21:00:00 +3
last_modified_date: 2023-05-21 21:00:00 +3
tags:
- php
- php-library
- questions-and-solutions
---

# Что такое php-cs-fixer и как его использовать

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

php-cs-fixer это инструмент проверки стиля кодирования в php проектах.

Его удобно запускать в CI/CD pipeline для автоматической проверки кода на заданные правила.

## Установка

Стандартно ставим через composer, и конечно же в секцию dev

```shell
composer require --dev friendsofphp/php-cs-fixer
```

## Конфигурация

Теперь добавляем файл конфигурации с именем `.php-cs-fixer.php` в корень проекта.

В стандартном виде он выглядит следующим образом:

```php
    <?php

declare(strict_types=1);

return
    (new PhpCsFixer\Config())
        ->setCacheFile(__DIR__ . '/var/cache/.php_cs')
        ->setFinder(
            PhpCsFixer\Finder::create()
                ->in([
                    __DIR__ . '/src',
                ])
                ->append([
                    __FILE__,
                ])
        )
        ->setRules([

        ]);
```

Самое важное здесь - это правила по которым будем проверять код. Правила будем добавлять в массив `setRules`

## Возможности

Удобнее всего команды для запуска добавить в секцию `scripts` файла `composer.json`.

Исходя из настроек конфига что может нам понадобиться:

```shell
composer php-cs-fixer fix -- --dry-run # Просмотреть в каких файлах есть ошибки, но не исправлять их
composer php-cs-fixer fix --allow-risky=yes # Выполнять ли рискованные правила
composer php-cs-fixer fix --diff # Выводить diff файлов
composer php-cs-fixer fix --stop-on-violation # Остановить выполнение проверки при первой ошибке
```
Я все запускаю в docker, у меня команда проверки выглядит так `docker compose run --rm php-cli composer php-cs-fixer fix -- --diff --dry-run --allow-risky=yes`

## Правила

Правила могут входить в набор или использоваться по отдельности.
В документации есть их полный список:

- [Наборы правил](https://github.com/PHP-CS-Fixer/PHP-CS-Fixer/blob/master/doc/ruleSets/index.rst)
- [Правила](https://github.com/PHP-CS-Fixer/PHP-CS-Fixer/blob/master/doc/rules/index.rst)

Для каждого отдельно взятого проекта набор правил будет свой.

Разберем базовые наборы данных:

Плюс этих правил они могут наследовать другие пакеты правил

- @PER - [Последний стандарт кода принятый сообществом](https://www.php-fig.org/per/coding-style/)
- @PHP82Migration - Что было добавлено в версии php 8.2
- @PHPUnit100Migration:risky - Правила для phpunit

Общие правила:

- TODO

Грамотно составленный конфиг позволяет держать кодовую базу в едином стиле и в актуальном состоянии, что облегчает поддержку проекта в долгосрочной перспективе.



