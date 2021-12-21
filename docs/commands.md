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

## Linux

### Объем

```shell
du -sh /var/www/* | sort -hr # отображение размеров
```

### Файловая система/монтирование

```shell
cat /proc/filesystems # поддержиеваемые файловые системы дистрибутива
ls -l /lib/modules/$(uname -r)/kernel/fs # поддержиеваемые файловые системы дистибутива
findmnt --real # отобразить точки монтирования или так mount | grep "^/dev"
findmnt # показать все точки монтирования или так просто команда mount
sudo mount.cifs -v //Server /mnt/  --verbose -o username="test",password="test",file_mode=0777,dir_mode=0777,iocharset=utf8 # монтирование диска на windows
sudo umount /mnt # размонтирование раздела
```

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

### Создание репозитория

```shell
git init demo # создать пустой репозиторий, по факту в текущей директории создается папка .git
```

### Индексирование/удаление/рабочий процесс

```shell
git add --all # добавить в индекс все неотслежиеваемые изменения
git add . # добавить в индекс все файлы в текущем каталоге
git add readme.md # добавить в индекс файл readme.md
git rm --cached readme.md # убрать файл из индекса, то есть на шаг назад, если файл еще не был закомичен
git restore readme.md # сбросить изменения, ОПАСНО при этом все изменения в файле будут удалены!!!
git restore --staged readme.md # убрать файл из индекса, если файл уже был закомичен
```

### Ветки

```shell
git branch -M main # переименовать локальную текущую ветку в main
git branch feature-001 # создать новую ветку feature-001
git checkout feature-001 # перейти в ветку feature-001
git branch # список веток
git merge feature-001 # находясь в текущей ветке main влить в нее ветку feature-001 Внимание возможен CONFLICT, сперва его нужно устранить
git merge --no-ff # не использовать режим fast-forvard, всегда создать merge commit
git merge --abort # выйти из режима слияния веток, если что-то накосячили и хотим все вернуть
```

### Удаленные репозитории

```shell
git remote add origin git@github.com:LexusAlex/starter.git # добавить удаленный репозиторий в проект
```

### Отправка изменений

```shell
git push -u origin main # установить связь между локальной и удаленной веткой main и отправить туда все коммиты, команда выполняеся единожды
```

### Работа с историей

```shell
git log --oneline --all --graph # удобный просмотр дерева коммитов во всех ветках
git show fc6a09817b8e17966fd0baa624fb4ea916c89c4e # просмотр информации о коммите
```

### Откаты и отмены

```shell
git reset --hard @~2 # Сброс изменения переместится на 2 коммита назад
```

## Composer

```shell
composer require tightenco/collect # установка пакета локально в проект, он добавляется в секцию require
composer require --dev phpunit/phpunit # установка пакета локально в проект в секцию require-dev
composer install # установить зависимости если это не первая установка, то будут установлены зависимости из файла composer.lock
composer update # обновляет версии пакетов, игнорируя composer.lock, такакое обновление делать осторожно
```