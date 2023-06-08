---
layout: default
nav_order: 2
permalink: linux-cli-2-ssh-key
title: Создать и использовать ssh ключ
parent: linux-cli
grand_parent: Вопросы и решения
has_children: true
description: Как создать и использовать ssh ключ
date: 2023-06-07 23:58:00 +3
last_modified_date: 2023-06-07 23:58:00 +3
tags:
- linux
- ssh
- questions-and-solutions
---

# Создать и использовать ssh ключ
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

Первое, что нужно сделать - это сгенерировать пару ключей публичный и приватный на компьютере с которого мы будем
подключиться к серверу.

```shell
ssh-keygen -t ed25519 -C "alexsey_89@bk.ru"
```

В результате в каталоге `.ssh` появятся два файла

```text
~/.ssh/id_ed25519
~/.ssh/id_ed25519.pub
```

Более подробно про типы ключей я писал здесь [https://lexusalex.ru/31-linux-ssh-keys](https://lexusalex.ru/31-linux-ssh-keys)

Если ключи уже есть, то просто используем не генерируем, тогда пропускаем первый шаг.

Далее нужно передать ключ на сервер, например так:

````shell
ssh-copy-id -i ~/.ssh/id_ed25519.pub alex@192.168.1.35
````

Публичный ключ будет добавлен пользователю в его каталог `~/.ssh/authorized_keys`

Один и тот же ключ можно использовать для нескольких пользователей.

Пробуем заходить

```shell
ssh alex@192.168.1.35
```

В итоге в большинстве случаев достаточно выполнить команду добавления ключа на сервер.