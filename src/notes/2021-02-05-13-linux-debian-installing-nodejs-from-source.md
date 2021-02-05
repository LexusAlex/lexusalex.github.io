---
layout: note.njk
tags: notes
number : 13
title: Сборка Node.js из исходников на Debian 10
description: Небольшая заметка о сборке Node.js
date: 2021-02-05 23:00:00 +3
main_image: /assets/images/notes/13/main.png
gradient_image: /assets/images/notes/13/gradient.png
themes: linux nodejs
---

## Загрузка и распаковка

Идем на [официальный сайт Nodejs](https://nodejs.org/en/) и скачиваем исходники последней версии.

В момент написания заметки — это версия 15.7.0. Ее и будем ставить.

```shell
wget https://nodejs.org/dist/v15.7.0/node-v15.7.0.tar.gz
```

Распаковываем и переходим в эту папку.

```shell
tar xvf node-v15.7.0.tar.gz
cd node-v15.7.0
```

Создаем папку куда, будем ставить Node.js.

```shell
mkdir node-15
```

## Сборка и запуск

При сборке может понадобиться библиотека `python3-distutils`, установим ее.

```shell
sudo apt install python3-distutils
```

Конфигурируем 

```shell
./configure --prefix=/home/alex/node-15

Node.js configure: Found Python 3.7.3...
INFO: configure completed successfully
```

Далее запускаем продолжительный процесс компиляции.

```shell
make
make install
```

По истечении которого, в директории `/home/alex/node-15`, появится такая структура.

```shell
bin
include
lib
share
```

Проверяем версию

```shell
./bin/node -v
v15.7.0
```
