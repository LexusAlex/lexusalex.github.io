---
layout: default
nav_order: 33
permalink: 33-composer-dependencies
title: Composer и его зависимости
parent: Заметки
description: Разбираемся с менеджером зависимостей composer
date: 2022-08-22 16:30:00 +3
last_modified_date: 2022-08-22 16:30:00 +3
tags:
- php
- composer
---

# Composer и его зависимости
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

В [статье](https://lexusalex.ru/14-create-composer-package) про создание composer пакета мы создали
[шаблон](https://github.com/LexusAlex/composer-package) для создания всех приложений и немного коснулись инфраструктуры. За это время уже вышла вторая версия пакетного
менеджера и вторая версия docker compose. Пришло время обновить зависимости и параллельно изучая возможности composer.


## Создание проекта

Если мы только хотим использовать composer у себя в проекте, стоит начать с создания `composer.json`. Для этих целей
есть специальный генератор `composer init`

Будет задан ряд вопросов, в результате чего будет сгенерирован файл примерно такой `composer.json` с минимальными опциями.
Так же будет создана папка `vendor`.

```json
{
    "name": "root/composer-package",
    "authors": [
        {
            "name": "Alexey Shmelev",
            "email": "alexsey_89@bk.ru"
        }
    ],
    "require": {}
}
```

Далее вся работа с composer пойдет вокруг этого файла и все можно править либо в нем, либо через cli.

Основные поля `composer.json`

- `name` - имя пакета например `yiisoft/db`.
- `description` - краткое описание пакета
- `type` - тип пакета
- `licence` - лицензия пакета
- `keywords` - ключевые слова связанные с пакетом
- `homepage` - домашняя страница проекта
- `readme` - путь до readme документа
- `time` - время создания пакета
- `authors` - авторы пакета
- `support` - поддержка
- `funding` - адреса для финансирования пакета


## Добавить/удалить пакет

Для добавления пакета к проекту используется команда `require` или просто `r`

```shell
composer r vimeo/psalm # будут скачены зависимости и добавлены в секцию require
composer r --dev vimeo/psalm # будут скачены зависимости и добавлены в секцию require-dev

```


## Версии в composer

## Команды



about                Shows a short information about Composer
archive              Creates an archive of this composer package
audit                Checks for security vulnerability advisories for installed packages
browse               [home] Opens the package's repository URL or homepage in your browser
bump                 Increases the lower limit of your composer.json requirements to the currently installed versions
check-platform-reqs  Check that platform requirements are satisfied
clear-cache          [clearcache|cc] Clears composer's internal package cache
completion           Dump the shell completion script
config               Sets config options
create-project       Creates new project from a package into given directory
depends              [why] Shows which packages cause the given package to be installed
diagnose             Diagnoses the system to identify common errors
dump-autoload        [dumpautoload] Dumps the autoloader
exec                 Executes a vendored binary/script
fund                 Discover how to help fund the maintenance of your dependencies
global               Allows running commands in the global composer dir ($COMPOSER_HOME)
help                 Display help for a command
init                 Creates a basic composer.json file in current directory
install              [i] Installs the project dependencies from the composer.lock file if present, or falls back on the composer.json
licenses             Shows information about licenses of dependencies
list                 List commands
outdated             Shows a list of installed packages that have updates available, including their latest version
prohibits            [why-not] Shows which packages prevent the given package from being installed
reinstall            Uninstalls and reinstalls the given package names
remove               Removes a package from the require or require-dev
require              [r] Adds required packages to your composer.json and installs them
run-script           [run] Runs the scripts defined in composer.json
search               Searches for packages
self-update          [selfupdate] Updates composer.phar to the latest version
show                 [info] Shows information about packages
status               Shows a list of locally modified packages
suggests             Shows package suggestions
update               [u|upgrade] Updates your dependencies to the latest version according to composer.json, and updates the composer.lock file
validate             Validates a composer.json and composer.lock

composer show --tree

docker compose run --rm php-cli composer r --dry-run vimeo/psalm




