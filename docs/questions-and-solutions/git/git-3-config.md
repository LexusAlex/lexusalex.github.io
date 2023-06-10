---
layout: default
nav_order: 3
permalink: git-3-config
title: Команда git config, настройка конфигурации
parent: git
grand_parent: Вопросы и решения
has_children: true
description: Настройка конфигурации git, настройка конфигурации
date: 2023-06-10 12:40:00 +3
last_modified_date: 2023-06-10 12:40:00 +3
tags:
- git
- questions-and-solutions
---

# Команда git config, настройка конфигурации

`git config` используется для установки значений конфигурации.

Для нового пользователя я использую следующий набор команд:

````shell
git config --global core.excludesfile ~/.gitignore && echo '.idea/' >> ~/.gitignore # Глобальный gitignore
git config --global user.name "Alexey Shmelev" # Имя коммитера 
git config --global user.email alexsey_89@bk.ru # email
git config --global init.defaultBranch main # ветка по умолчанию
````

## Уровни конфигурации

- `--local`
Если не переданы никакие опции, то конфигурации будет в файле `.git/config` в папке репозитория
- `--global`
Конфигурация глобального уровня зависит от пользователя и хранится в файле `~/.gitconfig`
- `--system`
Конфигурация уровня системы применяется ко всей машине. 

Порядок применения конфигурации следующий:

- локальный
- глобальный
- системный