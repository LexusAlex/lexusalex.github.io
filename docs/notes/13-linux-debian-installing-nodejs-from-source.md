---
layout: default
nav_order: 13
permalink: 13-linux-debian-installing-nodejs-from-source
title: Сборка Node.js из исходников на Debian 10
description: Небольшая заметка о сборке Node.js
date: 2021-02-05 23:00:00 +3
parent: Заметки
tags:
- linux
- nodejs
---

# Сборка Node.js из исходников на Debian 10
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

Проверяем версию Node.js и npm

```shell
./bin/node -v
v15.7.0

./bin/node lib/node_modules/npm/bin/npm-cli.js -v
7.4.3
```

## Итог

Сборка Node.js, как и любой другой программы из исходников не составляет особого труда.
