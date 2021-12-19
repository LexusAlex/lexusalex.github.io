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

Команды для ежедневного использования. Собираю все в одном месте.

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

## Git

### Системное

```shell
# Добавляем файлы и директории в глобальный gitignore
git config --global core.excludesfile ~/.gitignore
echo '.idea/' >> ~/.gitignore

# Учетные данные для коммитов
git config --global user.name "Alexey Shmelev"
git config --global user.email alexsey_89@bk.ru
```

### Ветки

```shell
git branch -M main # переименовать локальную текущую ветку в main
```

### Удаленные репозитории

```shell
git remote add origin git@github.com:LexusAlex/starter.git # добавить удаленный репозиторий в проект
```

### Отправка изменений

```shell
git push -u origin main # установить связь между локальной и удаленной веткой main и отправить туда все коммиты, команда выполняеся единожды
```