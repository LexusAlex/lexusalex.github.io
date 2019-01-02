---
layout: post 
title: Composer - менеджер зависимостей php
permalink: php-composer
tags: php composer
--- 

~~~bash
   ______
  / ____/___  ____ ___  ____  ____  ________  _____
 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                    /_/

~~~
Менеджер зависимостей - это программа , которая управляет зависимостями от которых зависит проект.

-   [Composer](https://getcomposer.org/) - менеджер зависимостей php
-   [packagist.org](https://packagist.org/) - репозиторий пакетов

####Установка composer

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

Скачался архив `composer.phar`, запустить composer можно так как указано выше `php composer.phar`

Теперь поставим глобально для всей системы.

Запустим инсталятор `composer-setup.php` с дополнительными опциями
`php composer-setup.php --install-dir=/usr/local/bin --filename=composer`, где
- --version - версия composer которую нужно установить
- --filename - название исполняемого файла
- --install-dir - директория куда устанавливать

Еще вариант переместить файл `composer.phar` в директорию `/usr/local/bin/` ,командой `mv composer.phar /usr/local/bin/composer`

Теперь composer запускать просто как обычную unix утилиту.

Так же есть вариант установки composer через пакетный менеджер например `apt-get install composer` или так `curl -sS https://getcomposer.org/installer -o composer-setup.php`
Способ установки зависит от ситуации.

[Мануал по установке composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos)


####Создание проекта

Создание проекта сводиться к созданию конфигурационного файла зависимостей `composer.json` в формате json.
Создать его можно вручную или через командную строку выполнив `composer init`, во втором случае будут заданы вопросы и
сгенерирован фаил `composer.json` с базовой структурой.

Понятие корневого пакета. Корневой пакет это корневая директория вашего приложения.Существуют свойства root-only, которые
учитываются только корневым пакетом

Свойства `composer.json` :

1. `name` - имя пакета в формате vendor/name, где vendor глобальное уникальное имя пользователя (логин на [packagist.org](https://packagist.org/)), name - имя пакета в рамках имени пользователя. Пример `"name" : "lexusalex/test-composer"`
2. `description` - описание пакета. Пример `"description": "Yii PHP Framework Version 2 - Development Package"`
3. `keywords` - массив ключевых слов для поиска и фильтрации пакета. Пример
    ~~~json
    {
    "keywords": [
        "test",
        "composer"
      ]
    }
    ~~~
4.  `homepage` - веб-сайт проекта. Например `"homepage": "http://www.yiiframework.com/"`
5.  `type` - тип пакета. 
     Стандартные типы:
     -  library - библиотека
     -  project - что выходит за рамки простой библиотеки называеться проектом
     -  metapackage - пустой пакет
     -  composer-plugin - специальный плагин для composer
     
     Настраиваемый тип:
     
     -  yii2-extension - тип который нужно насраивать
6.  `license` - лицензия на код пакета.Может быть также массивом лицензий. [Cписок лицензий](https://spdx.org/licenses/). Пример `"license": "BSD-3-Clause"`
7.  `authors` - массив обьектов авторов пакета. Например
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
8.  `support` - информация для получения поддержки проекта. Например
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
9.  `version` - версия пакета. Не используеться    
10. `time` - дата выпуска версии в формате ГГГГ-ММ-ДД или ГГГГ-ММ-ДД ЧЧ:ММ:СС
11. `minimum-stability` (root-only) - указать желаемый уровень стабильности для корневого пакета. По умолчанию stable, это
    говорит о том, что зависымые пакеты могут использовать стабильную версию корневого. Например `"minimum-stability": "dev",`
    Доступные варианты:
    - dev
    - alpha
    - beta
    - RC
    - stable
    
    [подробнее](http://codinghamster.info/php/stability-paketov-v-composer-problemy-i-reshenia/)
12. `prefer-stable` (root-only) - Устанавливать самую стабильную версию пакета, если таковая имеется. Пример `"prefer-stable": true,`
13. `replace` Список пакетов для замены. Пример `"replace": {"yiisoft/yii2": "self.version"}`
14. `repositories` (root-only) Репозитории для загрузки пакетов. По умолчанию поиск и загрузка пакетов идет с packagist.org, но это поведение
    можно переопределить и добавить еще репозитории. Например
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
15. `suggest` - предложения пакетов которые могут улучшить работу корневого пакета. Пример
    ~~~json
    {
        "suggest": {
                "yiisoft/yii2-coding-standards": "you can use this package to check for code style issues when contributing to yii"
        }
    }
    ~~~
16. `config` (root-only) - конфигурация для пакета типа "проект" . О конфигурации пакета будет написано отдельно
17. `bin` - Двоичные файлы для каталога `vendor/bin` Пример `"bin": ["framework/yii"]`
18. `extra` - Дополнительные данные для скриптов . Пример
    ~~~json
    {
        "extra": {
                "branch-alias": {
                    "dev-master": "2.0.x-dev"
                }
        }
    }
    ~~~
19. `scripts` (root-only)- позволяет создавать скрипты для запуска
20. `require` - список зависимостей проекта, подробнее в разделе "Управление зависимостями"
21. `require-dev` (root-only) - список зависимостей для разработки или тестирования, подробнее в разделе "Управление зависимостями"
22. `conflict` - список зависимостей которые конфликтуют с этим пакетом
23. `provide` - 
24. `autoload` - автозагрузка
25. `autoload-dev` - автозагрузка для разработки

####Управление зависимостями

Для указания пакетов от которых зависит наш проект используется секция `requaire` и `require-dev`

Найти нужный пакет можно следующими способами:
1. На сайте [packagist.org](https://packagist.org/?query=yii2)
2. С помощью команды `composer search yii2`
3. На сайте или на гитхабе пакета

Версионирование пакетов.



/root/.composer/vendor/bin/phploc /var/www/html/
По умолчению пакет поставиться в домашнюю директорию пользователя в папку `.composer`






 

