--- 
layout: post 
title: Тестирование кода. Использвание phpunit
permalink: test-code-phpunit
tags: testCode php
comments: true

--- 

Предыдущие статьи:

1. [Тестирование кода. Идеология](http://lexusalex.ru/test-code-ideology)
2. Тестирование кода. Использвание phpunit

Phpunit можно установить использую phar архив или через composer [подробнее на оф. сайте](https://phpunit.de/getting-started/phpunit-7.html)

### Как тестировать

Допустим мы имеем класс `Calculator`, для написания тестов для него нужно создать тестовый класс в директории `/tests`,
к названию добавить постфикс `Test`, `CalculatorTest`, наследовать от класса фреймворка `PHPUnit\Framework\TestCase`
В класс нужно создать публичные методы с префиксом `test*`, например `testDevision`, `testSumm`, так же принеобходимости
в аннотацию можно добавить блок `@test`

Например напишем тест



[Страница с последними релизами phpunit](https://phar.phpunit.de/)




Удобно смотреть степень покрытия кода тестами
