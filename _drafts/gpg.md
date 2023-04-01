---
layout: default
nav_order: 51
permalink: 51-gpg
title: gpg шифрование файлов
parent: Заметки
description: Как шифровать файлы
date: 2023-04-01 12:00:00 +3
last_modified_date: 2023-04-01 12:00:00 +3
tags:
- gpg
---

```shell
sudo apt install gpg
gpg --version
gpg -k # просмотр публичных ключей
gpg -K # просмотр приватных ключей
gpg --full-generate-key # Создать ключи
```
  
gpg.conf

```text
keyid-format 0xlong
throw-keyids
no-emit-version
no-comments
```
 
Экспорт ключей

````shell
gpg --export -a alexsey_89@bk.ru > ~/file.gpg
gpg --export-secret-key -a alexsey_89@bk.ru > ~/file.gpg
````

Удаление ключей

```shell
gpg --delete-secret-keys alexsey_89@bk.ru
gpg --delete-keys alexsey_89@bk.ru
```

Импорт ключей

```shell
gpg --import ~/key.gpg
```

pass

```shell
sudo apt install pass
pass init alexsey_89@bk.ru
pass insert -m Test/test.com  cntl+D
pass rm Test/test.com
```


