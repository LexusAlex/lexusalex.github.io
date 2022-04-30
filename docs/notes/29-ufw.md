---
layout: default
nav_order: 29
permalink: 29-ufw
title: Настройка ufw и fail2ban
parent: Заметки
description: Как обезопасить сервер от врагов
date: 2022-04-30 23:00:00 +3
tags:
- linux
- ufw
---

# Настройка ufw и fail2ban
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

Защитим сервер от злых хакеров.

Настроим минимальную конфигурацию брандмауэра ufw и сервиса fail2ban.

## ufw

Ставим ufw

```shell
sudo apt install ufw
```

Проверяем статус 

```shell
ufw status
#Status: inactive
```

Восстанавливаем правила UFW по умолчанию

```shell
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

Разрешаем входящие соединения ssh

```shell
sudo ufw allow ssh
```

Включаем брандмауэр

```shell
sudo ufw enable
```

В данный момент у нас открыт только 22 порт ssh.
Мы можем открыть любой порт,ip или диапазон портов который нам нужен, у стандартных портов имеются имена.

```shell
sudo ufw allow 22357
sudo ufw allow http
sudo ufw allow 6000:6007/tcp
```

Запрет соединений

```shell
sudo ufw deny http
```

Созданные правила с указанием номера

```shell
sudo ufw status numbered
```

Удаление правила

```shell
ufw delete 2
```

## fail2ban

Теперь поставим сервис fail2ban

```shell
sudo apt install fail2ban
```

Создадим файл `/etc/fail2ban/jail.local`
Со следующим содержимым

```text
[DEFAULT]
banaction = ufw

[sshd]
enabled = true

maxretry = 3
findtime = 3600
bantime = 24h
ignoreip = 127.0.0.1
```

Запускаем и проверяем

```shell
sudo systemctl restart fail2ban
sudo systemctl status fail2ban
```