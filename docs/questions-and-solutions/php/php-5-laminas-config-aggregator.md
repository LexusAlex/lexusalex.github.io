---
layout: default
nav_order: 5
permalink: php-5-laminas-config-aggregator
title: Laminas config aggregator
parent: php
grand_parent: Вопросы и решения
has_children: true
description: Библиотка laminas-config-aggregator для объединения конфигураций приложения
date: 2023-07-17 14:00:00 +3
last_modified_date: 2023-07-22 18:56:00 +3
tags:
- php
- questions-and-solutions
---

# Laminas config aggregator
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

Библиотека [Laminas config aggregator](https://docs.laminas.dev/laminas-config-aggregator/) нужна для создания конфигурации приложения, например для
дальнейшего использования в контейнере внедрения зависимостей.

```php
//composer require laminas/laminas-config-aggregator

// Базовое использование
// Папка с конфигурационными файлами которые возвращают массив конфигурации, склеиваем их в один, возвращаем итоговый массив 
use Laminas\ConfigAggregator\ConfigAggregator;
use Laminas\ConfigAggregator\PhpFileProvider;

// В config aggregator передаются массивы, которые будут склеены правильным способом
$config = new ConfigAggregator([
    function () {
        return ['db3' => 678];
    },
    new PhpFileProvider('dir/*.php'),
    new PhpFileProvider('dir/*.php'),
]);
// Повторяющиеся ключи будут перезаписаны, что дает возможность удобно управлять конфигурацией например в зависимости от переменных окружения
$config->getMergedConfig(); // Итоговый массив

// Кеширование массива
// Так же есть возможность включить кеш конфигурации, имеет место если Конфиг очень большой, меняется нечасто 
// В массиве нужен ключ config_cache_enabled
// Можно сделать следующем образом
$config = new ConfigAggregator([
    new \Laminas\ConfigAggregator\ArrayProvider([ConfigAggregator::ENABLE_CACHE => true]),
], '/tmp/config-cache.php');

// Для того чтобы сбросить кеш просто удалите файл. Удобно если конфигурацию не нужно часто менять, еще и работает быстрее
```

Преимущество данной библиотеки состоит в корректном перезаписывании многомерных массивов, чего добиться встроенными функциями php сложно, например использованием `array_merge` или `array_replace_recursive`

Применений данной библиотеки можно найти массу.

