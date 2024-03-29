---
layout: default
nav_order: 57
permalink: 57-design-api
title: Проектирование api
parent: Заметки
description: С чего начать при проектировании api
date: 2023-05-07 18:00:00 +3
last_modified_date: 2023-05-07 18:00:00 +3
tags:
- architecture code
---

# Проектирование api

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

Например, очень часто программисты любят запихивать данные одного функционала в один монолитный класс.

| class Product |
|:--------------|
| id            |
| title         |
| size          |
| price         |
| amount        |
| order         |

| class User |
|:-----------|
| id         |
| name       |
| size       |
| desc       |
| active     |

Нужно уходить от этого, и дробить это на независимые контексты, независимые сервисы.

## Модульное разделение кода
 
Делим класс `Product` на подклассы. В них будет информация которая нужна только для этого сервиса

Каждый модуль это не одна таблица или один класс, это может целый набор таблиц и классов

| Склад                |
|:---------------------|
| id - id товара       |
| amount - стоимость   |
| size - размер склада |

| Бухгалтерия    |
|:---------------|
| id - id товара |
| price - цена   |

| Заказ                     |
|:--------------------------|
| id id товара              |
| amount - сколько заказали |

| Каталог                |
|:-----------------------|
| id - id товара         |
| title - название       |
| description - описание |
| photo - фото           |

| Доставка                     |
|:-----------------------------|
| id - id товара(артикул)      |
| size - размер                |
| weight - вес                 |
| delivery - отдельная таблица |
| user - phone, address, email |

| Authentication |
|:---------------|
| id -   id user |
| login -        |
| password -     |

| Comment                                                |
|:-------------------------------------------------------|
| commentator - отдельная сущность id user = комментатор |
| id - id комментария                                    |

Получается, что эти вещи лучше делать отдельными модулями и хранить только ту информацию которая нужна модулю.
Тогда мы не тащим всю таблицу User через весь проект, а выводим только ту инфу которая нужна.

Товар и пользователь при таком подходе хранится везде, а не в одной таблице.

## Как это выглядит в коде

Модули могут называться следующем образом

- Author
- Blog
- Comment
- Data
- Favorite
- OAuth
- Payment
- Product
- HTTP

В каждом модуле лежит набор директорий с классами, к примеру:

Модуль `words` работа со словами

```text
   Words
    Entity - сущности
        Word - название сущности
            Word.php - класс сущности
            WordRepository.php - репозиторий сущности
    Command - команды
        Word - название сущности
            CreateWord - название команды
                Command.php - класс команды
                Handler.php - обработчик команды        
```

Например, класс `Command.php`. Это просто DTO.

```php
<?php

declare(strict_types=1);

final class Command
{
    public function __construct(
        public string $name = '',
        public string $description = ''
    ) {
    }
}
```
 
Здесь самое важное, нужно строить структуру удобную в первую очередь нам!
