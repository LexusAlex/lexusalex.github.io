---
layout: default
nav_order: 32
permalink: 32-composer-dependencies
title: Composer и его зависимости
parent: Заметки
description: Разбираемся с менеджером зависимостей composer
date: 2022-08-22 16:30:00 +3
last_modified_date: 2022-08-22 16:30:00 +3
tags:
- php
- composer
---

# Composer и его зависимости
{: .no_toc }

<details open markdown="block">
  <summary>
    Содержание
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>
---

В [статье](https://lexusalex.ru/14-create-composer-package) про создание composer пакета мы создали
шаблон для создания всех приложений и немного коснулись инфраструктуры.
Сегодня разберем возможности composer. 

## Установка

Про то как установить composer прекрасно написано на [официальном сайте](https://getcomposer.org/doc/00-intro.md) 

## Создание проекта

Если мы только хотим использовать composer у себя в проекте, стоит начать с создания `composer.json`

```shell
composer init
```
Будет задан ряд вопросов, в результате чего будет сгенерирован файл `composer.json`.

## Добавить/удалить пакет

Для добавления пакета к проекту используется команда


composer show --tree






