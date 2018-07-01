--- 
layout: post 
title: Composer - пакетный менеджер php
permalink: http-server
tags: php composer
--- 


Что требуется для установки и работы с composer

- curl
- php
- git
- unzip

Скачаем установочный фаил в любую директорию

~~~bash
curl -sS https://getcomposer.org/installer -o composer-setup.php
~~~
Установим composer глобально

~~~bash
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
~~~

[packagegist.org](https://packagist.org/)
----

