---
layout: default
nav_order: 28
permalink: 28-linux-access-rights
title: Система прав доступа в linux
parent: Заметки
description: Разберем права доступа на файлы и папки в linux
date: 2021-12-05 12:00:00 +3
tags:
- linux
---

# Система прав доступа в linux
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

Субъект
- Владелец - owner
- Группа-владелец - group owner
- Все остальные - other

Базовые разрешения
R - read
W - write
X - execute

Дополнительные атрибуты

S - set exec()
T - sTicky write()

Объект

file1
file2
file3

Access Mode

SUID SGID T RWX RWX RWX

`--- rw- r-x r--`
`000 110 101 100`
` 0   6   5   4`


https://www.youtube.com/watch?v=zaeg0EtiPtw&ab_channel=DmitryKetov


Отставим с сторону теорию и перейдем сразу к практике. 

Создадим файл и каталог от имени своего пользователя.

Права по умолчанию, создаваемые на объекты такие:

- (0664/-rw-rw-r--) - файл
- (0775/drwxrwxr-x) - директория

Уберем все права у файла и каталога

```shell
chmod a-rwx file.txt dir/
```

## Права доступа по умолчанию

https://handynotes.ru/2010/02/umask.html

https://zinvapel.github.io/it/tools/2018/01/10/linux-users/