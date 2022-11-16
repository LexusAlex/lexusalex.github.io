---
layout: default
nav_order: 39
permalink: 39-php-automation-tools
title: Инструменты автоматизации в php
parent: Заметки
description: Чем я пользуюсь для тестирования и проверки кода
date: 2022-11-14 16:30:00 +3
last_modified_date: 2022-11-14 16:30:00 +3
tags:
- php
- composer
---

# Инструменты автоматизации в php
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

Все эти инструменты используются для проверки и контроля написанного кода.

Это лично мои предпочтения и не претендуют на истину в последней инстанции.

## Psalm

Psalm статический анализатор кода, который проверяет код на наличие разного рода проблем.

### Установка

```shell
composer require --dev vimeo/psalm
```

### Конфигурация psalm.xml

```xml
<?xml version="1.0"?>
<psalm
        errorLevel="1"
        resolveFromConfigFile="true"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns="https://getpsalm.org/schema/config"
        xsi:schemaLocation="https://getpsalm.org/schema/config vendor/vimeo/psalm/config.xsd"
        cacheDirectory="var/cache/.psalm"
>
    <plugins>
        <pluginClass class="Psalm\PhpUnitPlugin\Plugin"/>
    </plugins>

    <projectFiles>
        <directory name="src" />
        <directory name="tests" />
        <ignoreFiles>
            <directory name="vendor" />
        </ignoreFiles>
    </projectFiles>
</psalm>
```

### Плагины

#### Psalm\PhpUnitPlugin\Plugin

Плагин для проверки тестов phpunit

Установить и включить в `psalm.xml`

```shell
composer require --dev psalm/plugin-phpunit
vendor/bin/psalm-plugin enable psalm/plugin-phpunit
```

### Запуск

При условии что команда будет добавлена в секцию `scripts` файла `composer.json`

```shell
composer psalm
```

## PHPUnit

Пакет для написания unit тестов

### Установка

```shell
composer require --dev phpunit/phpunit
```

### Конфигурация phpunit.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="vendor/phpunit/phpunit/phpunit.xsd"
         bootstrap="vendor/autoload.php"
         cacheResultFile="var/cache/.phpunit.result.cache"
         executionOrder="random"
         beStrictAboutOutputDuringTests="true"
         beStrictAboutTodoAnnotatedTests="true"
         convertDeprecationsToExceptions="true"
         failOnRisky="true"
         failOnWarning="true"
         colors="true"
         verbose="true">
    <testsuites>
        <testsuite name="default">
            <directory>./tests</directory>
        </testsuite>
    </testsuites>
    <php>
        <ini name="error_reporting" value="-1"/>
    </php>
    <coverage cacheDirectory="./var/cache/" processUncoveredFiles="true">
        <include>
            <directory suffix=".php">./src</directory>
        </include>
    </coverage>
</phpunit>

```

### Запуск

```shell
phpunit --colors=always
```