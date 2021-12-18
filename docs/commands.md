---
layout: default
title: Команды
comments: true
summary: Алексей Шмелев - команды
permalink: /commands
nav_order: 8
---

# Команды
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

Команды для ежедневного использования

## Docker

### Системное

```shell
docker system df # размеры компонентов докера
docker system prune -a # удалить все компоненты докера, рекомендуется переодически запускать
```

### Контейнер

```shell
docker run --name scratch-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=scratch -v /home/alex/docker/scratch/mysql-data:/var/lib/mysql -d bianjp/mariadb-alpine # запуск контейнера
```

### Образ

```shell
docker build --tag lexusalex/scratch . # сборка и пересборка образа
```