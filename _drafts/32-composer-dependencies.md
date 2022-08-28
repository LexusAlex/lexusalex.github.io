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

Пройдемся по базовым полям `composer.json`

- `name` - имя пакета например `yiisoft/db`.
- `description` - Краткое описание пакета


## Добавить/удалить пакет

Для добавления пакета к проекту используется команда `require` или просто `r`

```shell
composer r vimeo/psalm # будут скачены зависимости и добавлены в секцию require
composer r --dev vimeo/psalm # будут скачены зависимости и добавлены в секцию require-dev

```


composer show --tree

docker compose run --rm php-cli composer r --dry-run vimeo/psalm




