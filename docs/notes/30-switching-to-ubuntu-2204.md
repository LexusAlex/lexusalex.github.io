---
layout: default
nav_order: 30
permalink: 30-switching-to-ubuntu-2204
title: Переход на ubuntu 22.04
parent: Заметки
description: Пришло время переходить на новую версию ubuntu
date: 2022-07-24 20:00:00 +3
tags:
- linux
---

# Переход на ubuntu 22.04
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

## Сложность перехода

Возникла необходимость к переходу с xubuntu 21.04 на новую версию 22 года. 

Возникли некие сложности, но в целом все решаемо.

Итак, предыдущая версия ubuntu, а именно 21.10, закончила свое существование, удалив репозитории с официальных
источников, например здесь [http://ru.archive.ubuntu.com/ubuntu/dists/](http://ru.archive.ubuntu.com/ubuntu/dists/).

Встроенная утилита `do-release-upgrade` не может обновить систему до версии 22.04, хотя пишет что версия вышла и ее видит.

Мудрить ничего не стал, а просто снес 21.10 и накатил 22.04.

## Firefox как snap пакет

Первое с чем столкнулся браузер firefox по умолчанию установлен как snap пакет. Это меня не устраивает, так как версия
браузера там ниже, и работает медленнее. Штатным способом `apt install firefox` установить, тоже нельзя он ставит из snap
пакета. 

Решение нашел в сети [https://omgubuntu.ru/how-to-install-firefox-deb-apt-ubuntu-22-04/](https://omgubuntu.ru/how-to-install-firefox-deb-apt-ubuntu-22-04/).

Но, так как я удалил браузер перед командой `apt`, не имея никакого браузера забивал вручную эти команды, благо их немного.

## Docker compose

Менеджер управления контейнерами `docker-compose` сразу ставится второй версии и является как я понял частью docker.
Команды в первой версии такие `docker-compose up` во второй это `docker compose up`. Не критично, но в проектах нужно вносить
изменения в makefile.

Супер глобальных изменений, я не заметил, ставил облегченную версию xubuntu 22.04 LTS

## Пакеты, которые ставил

- архиватор `ark`
- плеер `vlc`
- офисный пакет `libreoffice`
- плагин для настройки клавиатуры `xfce4-xkb-plugin`
- система контроля версий `git`
- `docker` и `ansible`

VMware сразу не завелся, но потом нашел решение, которое подошло [https://www.how2shout.com/linux/install-vmware-workstation-player-on-ubuntu-22-04-lts/](https://www.how2shout.com/linux/install-vmware-workstation-player-on-ubuntu-22-04-lts/)


В общем полет пока нормальный.
