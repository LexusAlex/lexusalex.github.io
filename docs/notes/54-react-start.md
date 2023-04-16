---
layout: default
nav_order: 54
permalink: 54-react-start
title: Начать в react
parent: Заметки
description: Начинаем проект на реакте
date: 2023-04-16 16:00:00 +3
last_modified_date: 2023-04-16 16:00:00 +3
tags:
- js
- react
---

# Начать в react
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

Начинаем изучать react c установки окружения для его запуска, не будем ходить вокруг да около, лить воду.

Создал специально для этого репозиторий [https://github.com/LexusAlex/react-start](https://github.com/LexusAlex/react-start)

Конкретно в этом [коммите](https://github.com/LexusAlex/react-start/tree/4d8e2fc1693632061a7998dfcb92cc47ee748435) находится базовая версия.

## Окружение

Я работаю на linux, дабы не захламлять систему лишними зависимостями, используем docker, для поднятия всего, что только можно.

Первое, что нужно сделать поставить docker и docker-compose, [вот здесь](https://lexusalex.ru/43-linux-commands#docker-%D0%B8-docker-compose) мой набор инструкций для ubuntu.

Далее можно клонировать репозиторий

```shell
git clone https://github.com/LexusAlex/react-start.git
```

Теперь выполняем `make docker-build` в папке с проектом, подтягиваем образы.

После этого все готово, чтобы запустить приложение.

## Запуск приложения

Теперь подтягиваем зависимости nodejs `make npm-install`

Последнее, что осталось сделать поднять контейнеры `make docker-up`

Перейдя в браузере по адресу `127.0.0.1` мы должны увидеть чистое react приложение.

Вот так, быстро и просто можно начать в react. А вот продолжить в react это уже отдельный навык.