---
layout: post 
title: Composer - менеджер зависимостей php
permalink: php-composer
tags: php composer
comments: true
--- 
Composer занимает особое место в инфраструктуре php.
Менеджер пакетов - это программа , которая управляет зависимостями проекта.

-   [Composer](https://getcomposer.org/) - менеджер зависимостей php
-   [packagist.org](https://packagist.org/) - репозиторий пакетов



~~~bash
   ______
  / ____/___  ____ ___  ____  ____  ________  _____
 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                    /_/
~~~

## Установка composer

Перед началом установки в системе должны стоять следующие пакеты:

- curl
- php
- git
- unzip

Composer можно поставить локально в проект или глобально для всей системы.

Поставим локально в проект.

~~~bash
# скачаем установщик
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
# сравним хэш файла
php -r "if (hash_file('sha384', 'composer-setup.php') === '93b54496392c062774670ac18b134c3b3a95e5a5e5c8f1a9f115f203b75bf9a129d5daa8ba6a13e2cc8a1da0806388a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
# установка с опциями по умолчанию
php composer-setup.php

All settings correct for using Composer
Downloading...

Composer (version 1.8.0) successfully installed to: /var/www/html/composer.phar
Use it: php composer.phar
~~~

Скачался архив `composer.phar`, запустить composer можно, так как указано выше `php composer.phar`

Теперь поставим глобально для всей системы.

Запустим инсталятор `composer-setup.php` с дополнительными опциями
`php composer-setup.php --install-dir=/usr/local/bin --filename=composer`, где
- --version - версия composer которую нужно установить
- --filename - название исполняемого файла
- --install-dir - директория куда устанавливать

Еще вариант переместить файл `composer.phar` в директорию `/usr/local/bin/` ,командой `mv composer.phar /usr/local/bin/composer`

Теперь composer запускать просто как обычную unix утилиту.

Так же есть вариант установки composer через пакетный менеджер, например `apt-get install composer` или так `curl -sS https://getcomposer.org/installer -o composer-setup.php`
Способ установки зависит от ситуации.

[Мануал по установке composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos)


## Создание проекта

Создание проекта сводиться к созданию конфигурационного файла зависимостей `composer.json` в формате json.
Создать его можно вручную или через командную строку, выполнив `composer init`, во втором случае будут заданы вопросы и
сгенерирован фаил `composer.json` с базовой структурой.

Понятие корневого пакета. Корневой пакет - это корневая директория вашего приложения.Существуют свойства root-only, которые
учитываются только корневым пакетом.

Свойства `composer.json` :

1. `name` - имя пакета в формате vendor/name, где vendor глобальное уникальное имя пользователя (логин на [packagist.org](https://packagist.org/)), name - имя пакета в рамках имени пользователя. Пример: `"name" : "lexusalex/test-composer"`
2. `description` - описание пакета. Пример: `"description": "Yii PHP Framework Version 2 - Development Package"`
3. `keywords` - массив ключевых слов для поиска и фильтрации пакета. Пример:
    ~~~json
    {
    "keywords": [
        "test",
        "composer"
      ]
    }
    ~~~
4.  `homepage` - веб-сайт проекта. Например, `"homepage": "http://www.yiiframework.com/"`
5.  `type` - тип пакета. 
     Стандартные типы:
     -  library - библиотека
     -  project - что выходит за рамки простой библиотеки называеться проектом
     -  metapackage - пустой пакет
     -  composer-plugin - специальный плагин для composer
     
     Настраиваемый тип:
     
     -  yii2-extension - тип который нужно настраивать
6.  `license` - лицензия на код пакета. Может быть также массивом лицензий. [Cписок лицензий](https://spdx.org/licenses/). Пример: `"license": "BSD-3-Clause"`
7.  `authors` - массив обьектов авторов пакета. Например:
    ~~~json
    {
      "authors": [
         {
            "name": "Qiang Xue",
            "email": "qiang.xue@gmail.com",
              "homepage": "http://www.yiiframework.com/",
            "role": "Founder and project lead"
        },
        {
            "name": "Alexander Makarov",
            "email": "sam@rmcreative.ru",
            "homepage": "http://rmcreative.ru/",
            "role": "Core framework development"
        }
      ]
    }
    ~~~
8.  `support` - информация для получения поддержки проекта. Например:
    ~~~json
    {
        "support": {
            "issues": "https://github.com/yiisoft/yii2/issues?state=open",
            "forum": "http://www.yiiframework.com/forum/",
            "wiki": "http://www.yiiframework.com/wiki/",
            "irc": "irc://irc.freenode.net/yii",
            "source": "https://github.com/yiisoft/yii2"
        }
    }
    ~~~
9.  `version` - версия пакета. Не используется.    
10. `time` - дата выпуска версии в формате ГГГГ-ММ-ДД или ГГГГ-ММ-ДД ЧЧ:ММ:СС
11. `minimum-stability` (root-only) - указать желаемый уровень стабильности для корневого пакета. По умолчанию stable, это
    говорит о том, что зависимые пакеты могут использовать стабильную версию корневого пакета. Например: `"minimum-stability": "dev",`
    Доступные варианты:
    - dev
    - alpha
    - beta
    - RC
    - stable
    
    [подробнее](http://codinghamster.info/php/stability-paketov-v-composer-problemy-i-reshenia/)
12. `prefer-stable` (root-only) - Устанавливать самую стабильную версию пакета, если таковая имеется. Пример: `"prefer-stable": true,`
13. `replace` Список пакетов для замены. Пример: `"replace": {"yiisoft/yii2": "self.version"}`
14. `repositories` (root-only) Репозитории для загрузки пакетов. По умолчанию поиск и загрузка пакетов идет с packagist.org, но это поведение
    можно переопределить и добавить еще репозитории. Например:
    ~~~json
    {
        "repositories": [
                {
                    "type": "composer",
                    "url": "https://asset-packagist.org"
                }
        ]
    }
    ~~~
15. `suggest` - предложения пакетов которые могут улучшить работу корневого пакета. Пример:
    ~~~json
    {
        "suggest": {
                "yiisoft/yii2-coding-standards": "you can use this package to check for code style issues when contributing to yii"
        }
    }
    ~~~
16. `config` (root-only) - конфигурация для пакета типа "проект".
17. `bin` - Двоичные файлы для каталога `vendor/bin` Пример: `"bin": ["framework/yii"]`
18. `extra` - Дополнительные данные для скриптов . Пример:
    ~~~json
    {
        "extra": {
                "branch-alias": {
                    "dev-master": "2.0.x-dev"
                }
        }
    }
    ~~~
19. `scripts` (root-only)- позволяет запускать скрипты
20. `require` - список зависимостей проекта, подробнее в разделе "Обновление зависимостей"
21. `require-dev` (root-only) - список зависимостей для разработки или тестирования, подробнее в разделе "Обновление зависимостей"
22. `conflict` - список зависимостей которые конфликтуют с этим пакетом
23. `provide` - 
24. `autoload` - автозагрузка файлов
25. `autoload-dev` - автозагрузка файлов для разработки

## Управление зависимостями

Для указания пакетов от которых зависит наш проект используется секция `require` и `require-dev` (для разработки и тестирования) в `composer.json`

Найти нужный пакет можно следующими способами:
1. На сайте [packagist.org](https://packagist.org/?query=yii2)
2. С помощью команды `composer search yii2`

### Версионирование пакетов

Номер версии пакета состоит из трех составляющих и строиться по формату 0.0.0 (Мажорная версия.минорная версия.патч).

1. Мажорная версия увеличивается, когда изменения обратно несовместимы с предыдущими версиями
2. Минорная версия увеличивается, когда были добавлены новые функции не нарушая обратную совместимость с предыдущими версиями
3. Патч версия увеличивается когда были сделаны исправления, не нарушая обратную совместимость с предыдущими версиями, например баг-фиксы

Что тут важно:
-   любые новые изменения в коде должны быть представлены как новая версия
-   увеличение вышестоящего числа обнуляет нижестоящее

К версии перед релизом может быть добавлена метаинформация, например 1.0.0-x.7.z.92

[Спецификация](https://semver.org/lang/ru/)

### Типы версий

1.  `1.0.2` - будет установлена точная версия пакета
2.  `>=1.0`, `<=5.4.6`, `>3.0`, `<5.6` `!=3.8`, - будет установлена версия которая подходит под условие
3.  `>=1.0 <3.0` - диапазон версий, логическое И
4.  `>=1.0 <1.1 || >=1.2` - диапазон версий, логическое ИЛИ
5.  `1.0.0 - 2.1.0` - диапазон версий, любая версия из указанных
6.  `1.0.*` - любая версия выше минорной, то есть все баг фиксы
7.  `~1.2.0` - означает, что пакет может быть обновлен больше указанной версии, но меньше чем 1.2.9999, или `~2.0` означает что может быть обновлена до версии меньше 2.999
8.  `^1.2` - означает, что подойдет версия до 2.0 (не включая 2.0)
9.  `dev-master#2eb0c0978d290a1c45346a1955188929cb4e5db7` - указываем на ветку и коммит, удобно для разработки

Добавить зависимость к проекту можно вручную прописав в секции `require` или командой `composer require`

~~~bash
composer require cebe/markdown

Using version ^1.2 for cebe/markdown
./composer.json has been updated
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 1 install, 0 updates, 0 removals
  - Installing cebe/markdown (1.2.1): Downloading (100%)         
Writing lock file
Generating autoload files
~~~
Composer будет смотреть что указано в корневом пакете в секции `minimum-stability` и если не была указана точная версия,
будет качать версию в этом значении.

~~~bash
composer require cebe/markdown:1.2.* # добавить последнюю версию из диапазона
composer require --dev phpunit/phpunit # добавляет пакет в секцию require-dev для локальной разработки
composer require "squizlabs/php_codesniffer" --dev # еще вариант добавления пакета в кавычках
composer remove --dev phpunit/phpunit # удалить пакет из секции require-dev
composer global require phpunit/phpunit # установить глобально пакет ,по умолчению пакет поставиться в домашнюю директорию пользователя в папку `.composer`
composer global remove phploc/phploc # удалить глобальный пакет из системы
~~~

## Автозагрузка

Типичный composer пакет состоит из файлов и директорий:
- `src` - исходные файлы проекта
- `tests` - тесты для пакета
- `docs` - документация

но это структура может быть любой

Composer сам умеет загружать все необходимые файлы.

Так что же может загружать composer:

-   PSR-4. [Стандарт](https://www.php-fig.org/psr/psr-4/) загрузки классов
    ~~~json
    {
    "autoload": {
        "psr-4": {
            "yii\\": "src/",
            "yii\\tests\\": "tests/",
            "Slim\\": "Slim/",
            "LexusAlex\\": "src/",
            "Vendor\\Namespace\\": ["src/", "lib/"],
            "": "src/"
          }
        }
    }
    ~~~
    В примере выше классы с пространством имен`yii` будут грузиться из директории `src`. Таким образом, нет необходимости
    ручного подключения файлов, класс будет подгружен автоматически.Важно, чтобы между префиксами пространства имен стояли символы `\\`
-   Карта классов. Перечисляем список классов которые нужно загрузить, можно указать просто директорию или конкретный фаил класса, например
    ~~~json
    {
    "autoload": {
        "classmap": [
          "other/",
          "other/test/mytest.php"
        ]
      }
    }
    ~~~
-   Файлы. Для явного запроса определенных файлов.
    ~~~json
    {
    "autoload": {
        "files": [
          "file.php"
        ]
      }
    }    
    ~~~
Теперь нужно обновить файлы автозагрузчика командой `composer dump-autoload -o`, composer пропишет список файлов которые нужно
загружать при обращении к ним в файлах в каталоге `vendor/composer`

По умолчанию при выполнении команды `composer dump-autoload -o` грузяться файлы из секций `autoload` и `autoload-dev`, чтобы
изменить это поведение нужно добавить ключ `--no-dev`  `composer dump-autoload -o --no-dev`, теперь автозагрузка файлов для
разработки будет игнорироваться.

Чтобы все заработало нужно в файле, который является точкой входа в приложения прописать `require __DIR__ . '/vendor/autoload.php';`

## Обновление зависимостей

Чтобы установить зависимости из `composer.json` в только что склонированном проекте, существует команда

~~~bash
composer install
~~~
В результате:

-   Composer загрузит все зависимости из `composer.json` в директорию `vendor`
-   Будет создан фаил `composer.lock`, где перечислены точные версии пакетов проекта

Если фаил `composer.lock` уже был создан(была выполнена команда `composer install`), то повторное выполнение `composer install`
приведет к загрузке зависимостей из `composer.lock`, что гарантирует версии пакетов на момент фиксации

### composer.lock

Важно фиксировать `composer.lock` в системе контроля версий, чтобы другие разработчики пользовались теми же версиями
пакетов что и вы, даже если библиотки были обновлены.

Фаил `composer.lock`, запрещает получение новых версий пакетов, что дает уверенность, что код заработает сейчас у нас на
машине и через год на другой машине, так как версии пакетов остануться прежними

Теперь, чтобы обновить пакеты до последних версий, нужно выполнить команду
~~~bash
composer update
~~~
Что приводит к получению последних версий пакетов в соответствии с файлом `composer.json`, независимо от версий в `composer.lock`

~~~bash
composer install --no-dev # не устанавливать пакеты из секции `require-dev`
composer update --no-dev # не обновлять пакеты из секции `require-dev`
~~~

Полезные команды:

~~~bash
composer validate # проверка `composer.json` на валидность, желательно всегда запускать
composer validate --with-dependencies # проверка всех зависымых `composer.json` на валидность
composer status --verbose # проверить какие файлы в зависимостях были изменены с уточнением что именно было изменено
composer self-update # обновление composer до последней версии
composer create-project --prefer-dist yiisoft/yii2-app-basic basic # склонировать и устновить проект одной командой
composer run-script phpunit # запуск скриптов из секции scripts
composer outdated # показать список пакетов которые имеют обновления
~~~
 

