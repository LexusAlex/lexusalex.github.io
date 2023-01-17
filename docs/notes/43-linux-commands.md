---
layout: default
nav_order: 43
permalink: 43-linux-commands
title: Часто используемые команды в linux
parent: Заметки
description: Просто список команд
date: 2023-01-15 01:00:00 +3
last_modified_date: 2023-01-17 17:00:00 +3
tags:
- linux
---

# Часто используемые команды в linux
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

Просто список команд, часто используемых команд в linux.
Собираем все в одном месте.

## Работа с пакетами

```shell
# Обновить кеш пакетов
sudo apt update
# Какие пакеты могут быть обновлены
sudo apt list --upgradable
# Обновление всех пакетов
sudo apt upgrade
# Обновить тоже все пакеты + удалить пакеты если это требуется
sudo apt full-upgrade
# Пакеты которые можно удалить
sudo apt autoremove
# Найти доступный пакет
sudo apt search php
# Установка пакета
sudo apt install php
# Удаление пакета
sudo apt remove php
# Удалить полностью вместе с конфигурацией
sudo apt purge php
```

## Поиск

### Поиск по содержимому файлов

```shell
# В самом простом виде, когда нужно просто найти что-то в файлах
grep -rnw /var/www -e "строка поиска"
```

### Поиск самых больших файлов и каталогов

```shell
# Поиск больших файлов и каталогов на сервере + сортировка 
du -sh /var/www/* | sort -hr
```