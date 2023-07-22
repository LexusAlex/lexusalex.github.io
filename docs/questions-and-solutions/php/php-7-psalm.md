---
layout: default
nav_order: 7
permalink: php-7-psalm
title: Psalm
parent: php
grand_parent: Вопросы и решения
has_children: true
description: Исследование работы статических анализаторов кода на примере psalm
date: 2023-07-21 16:00:00 +3
last_modified_date: 2023-07-22 12:00:00 +3
tags:
- php
- questions-and-solutions
---

# Psalm
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

## Установка

````shell
# Стандартная через composer
composer require --dev vimeo/psalm
# Генерируем конфиг
./vendor/bin/psalm --init
````

## Конфигурация

Стандартный сгенерированный конфиг выглядит следующим образом:

````xml
<?xml version="1.0"?>
<psalm
    errorLevel="2"
    resolveFromConfigFile="true"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="https://getpsalm.org/schema/config"
    xsi:schemaLocation="https://getpsalm.org/schema/config vendor/vimeo/psalm/config.xsd"
    findUnusedBaselineEntry="true"
    findUnusedCode="true"
>
    <projectFiles>
        <directory name="src" />
        <ignoreFiles>
            <directory name="vendor" />
        </ignoreFiles>
    </projectFiles>
</psalm>
````

Основные опции:

### psalm

#### errorLevel

Уровень вывода ошибок псалма, по умолчанию 2, 1 - самый строгий, 8 - самый мягкий

На первом уровне psalm рассматривает все как ошибку.

На втором уровне psalm не рассматривает mixed проблемы.

На дальнейших уровнях идут нисхождения.

#### resolveFromConfigFile

Относительные каталоги будут включены относительно расположения конфигурационного файла

#### findUnusedCode

Если включено psalm ищет весь неиспользуемый код

#### cacheDirectory

Где хранить кеш

### projectFiles

Список директорий где psalm будет искать ошибки, каждая директория предоставлена отдельным тегом `directory`

Тег `ignoreFiles` выводит список игнорируемых psalm директорий

### plugins

Список плагинов подключенных к проекту

Под psalm существуют официальные плагины которые решают ряд проблем

Например, работают с phpunit или c контейнером внедрения зависимостей.

### issueHandlers

Список игнорируемых ошибок psalm

## Проблемы, которые могут возникнуть
                                     
Толком нигде не нашел примеры как решать проблемы, раздел буду дополнять.

### MixedAssignment

Неизвестный тип переменной. Нужно дать понять psalm какой тип у переменной

````php
// Вот здесь psalm не понял что такое $module
$modules = array_diff(scandir('../src'), ['..', '.']);
/** @var string $module */ // Дадим явно понять что $module это строка
foreach ($modules as $module) {
        
}
````

### UnusedVariable

Неиспользуемая переменная. Это простая ошибка когда переменная после объявления нигде не используется.

````php
$dependencies = [];
// Далее по коду эта переменная не используется
````








