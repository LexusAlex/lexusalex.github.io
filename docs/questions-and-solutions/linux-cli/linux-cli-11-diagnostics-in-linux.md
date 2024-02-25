---
layout: default
nav_order: 11
permalink: linux-cli-11-diagnostics-in-linux
title: Диагностика в linux
parent: linux-cli
grand_parent: Вопросы и решения
has_children: true
description: Как искать проблемы на linux сервере
date: 2024-02-25 20:30:00 +3
last_modified_date: 2024-02-25 20:30:00 +3
tags:
- linux
- questions-and-solutions
---

# Диагностика в linux
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

Основные команды для диагностики linux сервера.
По каждому разделу можно писать отдельную заметку, пока соберу все вместе.

## Место
 
```shell
# Кол-во места на дисках
df -h
# Кол-во места на дисках + тип файловой системы
df -Th
# Кол-во места в определенной директории
du -sh /var/www/* | sort -hr
# Кол-во inod
df -i
```

## Диски

````shell
# Список дисков и разделов
lsblk
# Состояние диска - отчет
sudo smartctl -a /dev/sda
````

## Нагрузка/информация

```shell
# Диски - пишется, читается с диска
iostat
sudo iotop
# Процессор
top
htop
# Оперативная память
vmstat
free -m
cat /proc/meminfo
```

## Процессы

```shell
# Список процессов на сервере
ps aux
# Убить процесс
kill 12345
# Состояние сервиса
systemctl status cron.service
```

## Сеть

```shell
# Процессы и порты которые они слушают
netstat -tulpn
ss -lntu
# Информация о сетевых интерфейсах
ip a
Ifconfig
# Сетевые маршруты
netstat -rn
ip r
# Доступность удаленных хостов
ping ya.ru
# Путь пакетов от сервера от конечного сервера
traceroute ya.ru
# Трассировка в живом режиме
mtr ya.ru
# Днс
dig lexusalex.ru
# Универсальная программа проверки запросов и ответов сервера
curl -Lv ya.ru
```

## Логи

````shell
# Просмотр логов
tail -f -n50 /var/log/syslog
tail -f n50 /var/log/auth.log
# Сообщения ядра системы
sudo dmesg -T
# Логи определенной программы
journalctl -xeu cron
````