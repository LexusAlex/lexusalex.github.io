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
6.  `license` - лицензия


/root/.composer/vendor/bin/phploc /var/www/html/
По умолчению пакет поставиться в домашнюю директорию пользователя в папку `.composer`






 

