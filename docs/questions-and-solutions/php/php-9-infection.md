---
layout: default
nav_order: 9
permalink: php-9-infection
title: Infection
parent: php
grand_parent: Вопросы и решения
has_children: true
description: Библиотека для мутационного тестирования infection
date: 2023-08-07 17:00:00 +3
last_modified_date: 2023-08-08 15:00:00 +3
tags:
- php
- questions-and-solutions
---

# Infection
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

В общем виде заметку-введение про мутационное тестирование уже писал [https://lexusalex.ru/php-3-mutation-testing](https://lexusalex.ru/php-3-mutation-testing) 

Сегодня настроим фреймворк infection для использования. 

Установка стандартная через composer

````shell
# Установка
composer --dev require infection/infection
````

## Настройка 

При первом запуске infection если нет конфига он будет создан.

infection.json5

Примерно в таком виде

````json
{
    "$schema": "vendor/infection/infection/resources/schema.json",
    "source": {
        "directories": [
            "src"
        ]
    },
    "phpUnit": {
        "configDir": "etc"
    },
    "mutators": {
        "@default": true
    }
}
````

Полное описание опции конфигурации в документации [https://infection.github.io/guide/usage.html](https://infection.github.io/guide/usage.html)

Infection работает в паре с phpunit coverage (или это только у меня так), нужно указать путь до папки с покрытием кода.

````shell
# Команда phpunit может быть примерно такой
phpunit --colors=always --configuration=etc/phpunit.xml --coverage-html var/logs/coverage --coverage-xml=var/logs/coverage-xml --log-junit=var/logs/junit.xml
# Команда запуска infection
infection --show-mutations --log-verbosity=default --threads=4 --coverage=../var/logs --configuration=etc/infection.json5
````

Infection меняет исходный код, тем самым пытаясь сломать тесты

Базовый пример. У нас есть какой-то класс

````php
<?php

class C
{
    public function one($a, $b)
    {
        return $a + $b;
    }
}
````

Если прямо сейчас запустить infection, у нас будет 2 незадетекченных мутанта,

то есть Mutation Code Coverage: 100%

Пишем тест под это и покрываем все случаи

````php
$c = new C();
self::assertEquals(6, $c->one(2,4));
````

Вот теперь мы покрыли все случаи, и метрики будут 100%

Важно понимать, что мутационное тестирование это не хаотичное преобразование кода, 
а абсолютно предсказуемый и понятный процесс, который, при наличии одинаковых входных мутационных операторов, 
всегда выдает один и тот же список мутаций.

## Мутаторы

Мутаторов много, буду рассматривать здесь каждый отдельный случай.



