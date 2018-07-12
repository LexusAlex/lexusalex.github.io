---
layout: post 
title: Composer - пакетный менеджер php
permalink: php-composer
tags: php composer
--- 

Не буду долго расписывать для чего нужен composer, в сети достаточно информации, 
перейдем сразу к использованию.

Что требуется для установки и работы с composer

- curl
- php
- git
- unzip

~~~bash
sudo apt-get install curl php zip unzip
~~~
Скачаем установочный фаил composer в любую директорию, после установки его можно будет удалить

~~~bash
curl -sS https://getcomposer.org/installer -o composer-setup.php
~~~

Composer можно ставить локально в директорию с проектом, можно глобально для всей системы.

Установим composer глобально, при этом возможно указать следующие опции установки

- --version - версия composer
- --filename - название исполняемого файла
- --install-dir - директория куда устанавливать

~~~bash
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer

All settings correct for using Composer
Downloading...

Composer (version 1.6.5) successfully installed to: /usr/local/bin/composer
Use it: php /usr/local/bin/composer
~~~

Теперь composer будет доступен по команде `composer`

Репозиторий пакетов находиться здесь [packagegist.org](https://packagist.org/)

Создание проекта
----

В директории где вы планируете создать проект, нужно выполнить

~~~bash
composer init
~~~

Далее будут заданы несколько вопросов, относительно настроек проекта, после будет создан фаил `composer.json`, 
можно ничего не указывать впоследствии можно все исправить
 
 Composer.json
 ---
 composer.json - это фаил с настройками проекта, основные ключи:
 
 - name - имя пакета , "ваше имя на packagegist.org / название вашего проекта в рамках вашего имени пользователя", пример "monolog/monolog"
 - description - краткое описание пакета
 - type - тип пакета, возможные варианты:
    - library - дополнительная библиотека,
    - project - означает что это проект а не библиотека, то есть полные приложения распространяемые как пакет
    - metapackage - пустой пакет
    - composer-plugin - пакет типа composer-plugin
 - require - те пакеты от которых зависит проект
 
----

