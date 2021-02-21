---
layout: note.njk
tags: notes
number : 14
title: Создание composer пакета
description: Как с нуля создать composer пакет и опубликовать его на packagist.org
date: 2021-02-19 23:00:00 +3
main_image: /assets/images/notes/14/main.png
gradient_image: /assets/images/notes/14/gradient.png
themes: php composer
---

Типичное php приложение зависит от другого кода. 
Часто бывает, что код необходимо использовать сразу в нескольких проектах. 
В php такими зависимостями управляет пакетный менеджер [composer](https://getcomposer.org/).

Важно отличать пакет (библиотеку) от проекта (приложения). Пакет — это законченная программа которую мы используем в проекте как зависимость. 
А проект — это конечный продукт(сайт) который использует зависимости (пакеты).

Все пакеты хранятся в репозитории composer библиотек [packagist.org](packagist.org).

Небольшой мануал как создать composer пакет.

## Создание репозитория

Первое, что необходимо сделать — это создать на [гитхабе](https://github.com) git репозиторий с названием библиотеки.

Теперь создаем локальный проект, инициализируем пустой репозиторий и привязываем к нему репозиторий на гитхабе.
Так же переименуем ветку и свяжем две ветки удаленную и локальную.

```shell
git init
git remote add origin git@github.com:LexusAlex/composer-package.git
git checkout master
git checkout -b main
git pull origin main
git branch --set-upstream-to=origin/main main
```

## Создание инфраструктуры

Чтобы было удобно разрабатывать проект, настроем запуск php в докер контейнере.

Создадим `Dockerfile` по пути `docker/php-cli/Dockerfile` со следующим содержимым:

```dockerfile
FROM php:7.4-cli-alpine

RUN apk add --no-cache autoconf g++ make \
    && pecl install xdebug \
    && rm -rf /tmp/pear \
    && docker-php-ext-enable xdebug

RUN mv $PHP_INI_DIR/php.ini-development $PHP_INI_DIR/php.ini

RUN apk add unzip

ENV COMPOSER_ALLOW_SUPERUSER 1

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/bin --filename=composer --quiet \
    && rm -rf /root/.composer/cache

WORKDIR /composer-package
```
Из этой инструкции будет создан образ, и в последствии запущен контейнер.

С заделом на использование нескольких контейнеров добавим файл `docker-compose.yml` в корень пакета:

```yaml
version: "3.7"
services:
  php-cli:
    build:
      context: ./docker/php-cli
      dockerfile: Dockerfile
    volumes:
      - ./:/composer-package
```

Запускаем сборку `docker-compose build` или `docker-compose up`

После этого можно запускать команды внутри контейнера, таким образом

```shell
docker-compose run --rm php-cli composer --version
Composer version 2.0.9 2021-01-27 16:09:27
```

## Makefile

Чтобы вручную не забивать команды добавим в корень `Makefile`, в котором будем писать все выполняемые команды.

Например такие

```makefile
build:
	docker-compose build
up:
	docker-compose up
```

Впоследствии запуск сборки сводится к `make build`. В процессе работы мы будем добавлять сюда команды.

## composer.json

Теперь создадим пример файла `composer.json`. Это можно сделать и ручками, но мы запустим команду `composer init`

```shell
docker-compose run --rm php-cli composer init
```

В интерактивном режиме будут заданы ряд вопросов, можно заполнить или оставить по дефолту.

У меня создался такой файл:

```json
{
    "name": "lexusalex/composer-package",
    "description": "test project in composer",
    "type": "library",
    "authors": [
        {
            "name": "Alexsey Shmelev",
            "email": "alexsey_89@bk.ru"
        }
    ],
    "minimum-stability": "stable",
    "require": {}
}
```

Все параметры этого файла можно менять.

Так же я добавил `.gitignore` в который поместил папку `/vendor` и файл `composer.lock`.

Добавим две папки

- src - исходные коды нашей библиотеки
- test - phpunit тесты

## Автозагрузка классов

Пропишем автозагрузку для тестов и исходных кодов в `composer.json`

```json
{
  "autoload": {
    "psr-4": {
      "lexusalex\\composer-package\\": "src/"
    }
  },
  "autoload-dev": {
    "psr-4": {
      "lexusalex\\composer-package\\test\\": "tests/"
    }
  }
}
```
И выполним команду  `docker-compose run --rm php-cli composer dump-autoload`.

## Тесты

Создадим директорию `tests` и поставим phpunit.

```shell
docker-compose run --rm php-cli composer require --dev phpunit/phpunit
```

Добавим конфигурационный файл `phpunit.xml`

Сгенерируем его автоматически командой `docker-compose run --rm php-cli vendor/bin/phpunit --generate-configuration`.
Или скопируем и другого проекта.
У меня он выглядит следующим образом

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="https://schema.phpunit.de/9.5/phpunit.xsd"
         bootstrap="vendor/autoload.php"
         executionOrder="depends,defects"
         forceCoversAnnotation="false"
         cacheResult="false"
         colors="true"
         beStrictAboutCoversAnnotation="true"
         beStrictAboutOutputDuringTests="true"
         beStrictAboutTodoAnnotatedTests="true"
         failOnRisky="true"
         failOnWarning="true"
         verbose="true">
    <testsuites>
        <testsuite name="default">
            <directory suffix="Test.php">tests</directory>
        </testsuite>
    </testsuites>

    <coverage cacheDirectory=".phpunit.cache/code-coverage"
              processUncoveredFiles="true">
        <include>
            <directory suffix=".php">src</directory>
        </include>
    </coverage>
</phpunit>
```

## Публикация на packagist.org

Последнее, что осталось сделать — это опубликовать наш пакет на [packagist.org](http://packagist.org).
Там все интуитивно понятно.

Закоммитим и поставим тег версии `git tag -a 0.1 -m 0.1`

Теперь открываем проект куда мы ходим поставить данный тестовый пакет с именем `lexusalex/composer-package`.

```shell
docker-compose run --rm php-cli-alpine composer require lexusalex/composer-package 0.1
```

## Исходники

Предложения и pull requests приветствуются [https://github.com/LexusAlex/composer-package](https://github.com/LexusAlex/composer-package).