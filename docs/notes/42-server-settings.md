---
layout: default
nav_order: 42
permalink: 42-server-settings
title: Настройка сервера ubuntu
parent: Заметки
description: С чего начать базовую настойку ubuntu сервера
date: 2023-01-06 12:00:00 +3
last_modified_date: 2023-01-06 12:00:00 +3
tags:
- linux
---

# Настройка сервера ubuntu
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

Имеем свежий сервер ubuntu 22.04.

Первое, что я всегда делаю, импорт ключей с локальной машины.

## Передача ключа на сервер

Сперва нужно сгенерировать ключ, у себя на локальной машине. Об этом я [писал](https://lexusalex.ru/linux-ssh-keys#%D1%82%D0%B8%D0%BF%D1%8B-%D0%B8-%D0%B3%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D1%8F-%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B9)

У меня ключи уже сгенерированы, теперь один из них нужно безопасно передать на сервер, командой

```shell
ssh-copy-id -i ~/.ssh/my_key_1_ed25519.pub alex@192.168.88.136
```

Далее пробуем зайти, должно пускать без проблем

```shell
ssh alex@192.168.88.136
```

## Учетная запись root

По умолчанию учетка пользователя root отключена. Ее можно включить `sudo passwd root` , но не стоит это делать без необходимости.

## Часовой пояс

По умолчанию, что правильно, часы работают в формате utc. При необходимости часовой пояс можно настроить командой

`dpkg-reconfigure tzdata`

## Статический ip

Еще очень важно настроить статический ip. Сетевые настройки здесь хранится в файле `/etc/netplan/00-installer-config.yaml`

Задать можно следующей конфигурацией:

```yaml
network:
  version: 2
  ethernets: 
    ens33: 
      dhcp4: false 
      addresses: [192.168.233.148/24] 
      gateway4: 192.168.233.2 
      nameservers:
        addresses: [192.168.233.2,192.168.233.3]
```

Проверка и применение конфигурации

```shell
sudo netplan try
sudo netplan apply
```